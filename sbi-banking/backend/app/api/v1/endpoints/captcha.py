"""Backend CAPTCHA: generates image (PNG) + audio (WAV) challenges.

Stores the answer in Redis keyed by a captcha token. The frontend shows
the image (or plays the audio) and submits the token + typed answer.
"""
import io
import uuid
import wave
import struct
import random
import string

from fastapi import APIRouter, HTTPException
from fastapi.responses import Response

from app.db.redis import set_captcha, get_captcha, delete_session

router = APIRouter()

_CAPTCHA_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"  # no ambiguous chars


def _make_text(length: int = 6) -> str:
    return "".join(random.choices(_CAPTCHA_CHARS, k=length))


def _draw_image(text: str) -> bytes:
    from PIL import Image, ImageDraw, ImageFont
    import os

    width, height = 200, 70
    img = Image.new("RGB", (width, height), (255, 255, 255))
    draw = ImageDraw.Draw(img)

    # background noise lines
    for _ in range(6):
        x1, y1 = random.randint(0, width), random.randint(0, height)
        x2, y2 = random.randint(0, width), random.randint(0, height)
        draw.line((x1, y1, x2, y2), fill=(200, 200, 200), width=1)

    font_path = None
    for p in (r"C:\Windows\Fonts\arial.ttf", r"C:\Windows\Fonts\segoeui.ttf"):
        if os.path.exists(p):
            font_path = p
            break
    font = ImageFont.truetype(font_path, 38) if font_path else ImageFont.load_default()

    x = 12
    for ch in text:
        color = (random.randint(20, 90), random.randint(40, 110), random.randint(90, 160))
        y = random.randint(8, 20)
        draw.text((x, y), ch, font=font, fill=color)
        x += 30

    # noise dots
    for _ in range(40):
        draw.point(
            (random.randint(0, width), random.randint(0, height)),
            fill=(random.randint(150, 220),) * 3,
        )

    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()


def _make_audio(text: str) -> bytes:
    """Synthesize a simple spoken-style tone sequence spelling the captcha."""
    sample_rate = 8000
    buf = io.BytesIO()
    with wave.open(buf, "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(sample_rate)
        frames = bytearray()
        # map each char to a tone
        for ch in text:
            freq = 400 + (ord(ch) % 26) * 25
            for _ in range(sample_rate // 4):  # ~0.25s per char
                t = len(frames) / 2 / sample_rate
                val = int(12000 * __import__("math").sin(2 * 3.14159 * freq * t))
                frames += struct.pack("<h", val)
            # short silence
            frames += struct.pack("<h", 0) * (sample_rate // 16)
        wav.writeframes(frames)
    return buf.getvalue()


@router.get("/image")
def get_captcha_image():
    token = str(uuid.uuid4())
    text = _make_text()
    set_captcha(token, text, expire_seconds=300)
    png = _draw_image(text)
    return Response(content=png, media_type="image/png", headers={"X-Captcha-Token": token})


@router.get("/audio")
def get_captcha_audio(token: str = ""):
    answer = get_captcha(token) if token else None
    if not answer:
        answer = _make_text()
        new_token = str(uuid.uuid4())
        set_captcha(new_token, answer, expire_seconds=300)
    wav = _make_audio(answer)
    headers = {}
    if not token:
        headers["X-Captcha-Token"] = new_token
    return Response(content=wav, media_type="audio/wav", headers=headers)


@router.post("/verify")
def verify_captcha(payload: dict):
    token = payload.get("captcha_token")
    answer = payload.get("captcha_answer", "")
    stored = get_captcha(token) if token else None
    if not stored or stored.upper() != str(answer).upper():
        raise HTTPException(status_code=400, detail="Invalid captcha")
    delete_session(f"captcha:{token}")
    return {"success": True}
