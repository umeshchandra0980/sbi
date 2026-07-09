#!/bin/bash
# ============================================================
# SBI Banking Portal - One-Command Setup
# Usage: ./setup.sh
# ============================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}"
echo "  ____  ____ ___   ___  __ __   __    ____  __ _  __ _  __  __ _   ____"
echo " / ___)(  _ )   ) / __)(  )  ) / _\  (  _ )(  / )(  ( )(  )(  ( \ / ___)"
echo " \___ \ ) _ \) ( ( (_   )( )((/    \  ) _ < )  (  )  (  )( /    / \___ \\"
echo " (____/(____/___) \___)(__)(__\_/\_/(____/(__\_)(_)__)(_)(__\_)__) (____/"
echo -e "${NC}"
echo -e "${BLUE}SBI Online Banking Portal - Full Stack Setup${NC}"
echo "============================================="

# Check prerequisites
echo -e "\n${YELLOW}Checking prerequisites...${NC}"
command -v docker >/dev/null 2>&1 || { echo -e "${RED}Docker is required. Install from https://docker.com${NC}"; exit 1; }
command -v docker-compose >/dev/null 2>&1 || docker compose version >/dev/null 2>&1 || { echo -e "${RED}Docker Compose is required.${NC}"; exit 1; }
echo -e "${GREEN}✓ Docker available${NC}"

# Copy .env if not exists
if [ ! -f .env ]; then
  echo -e "\n${YELLOW}Creating .env from template...${NC}"
  cp .env.example .env
  echo -e "${GREEN}✓ .env created${NC}"
else
  echo -e "${GREEN}✓ .env already exists${NC}"
fi

# Build and start
echo -e "\n${YELLOW}Building and starting containers...${NC}"
docker compose down --remove-orphans 2>/dev/null || true
docker compose up --build -d

# Wait for backend
echo -e "\n${YELLOW}Waiting for services to be ready...${NC}"
sleep 5
for i in {1..30}; do
  if curl -s http://localhost:8000/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Backend is ready${NC}"
    break
  fi
  echo -n "."
  sleep 2
done

# Done
echo -e "\n${GREEN}============================================="
echo "  Setup Complete!"
echo "=============================================${NC}"
echo ""
echo -e "  ${BLUE}Frontend:${NC}  http://localhost:3000"
echo -e "  ${BLUE}Backend:${NC}   http://localhost:8000"
echo -e "  ${BLUE}API Docs:${NC}  http://localhost:8000/api/docs"
echo ""
echo -e "  ${YELLOW}Demo Credentials:${NC}"
echo "  Admin:    admin / Admin@SBI123"
echo "  Customer: rahul.sharma / Rahul@1234"
echo "  Customer: priya.singh / Priya@1234"
echo ""
echo -e "  ${YELLOW}To stop:${NC} docker compose down"
echo -e "  ${YELLOW}To view logs:${NC} docker compose logs -f"
echo ""
