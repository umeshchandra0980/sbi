import Header from './components/Header';
import Hero from './components/Hero';
import HomeCards from './components/HomeCards';
import OtherServices from './components/OtherServices';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="site">
      <Header />
      <Hero />
      <HomeCards />
      <OtherServices />
      <Footer />
    </div>
  );
}
