import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import MarketSection from '../components/home/MarketSection';
import CoursesSection from '../components/home/CoursesSection';
import PdfsSection from '../components/home/PdfsSection';
import VipSection from '../components/home/VipSection';
import SMCCarousel from '../components/SMCCarousel';
import FeaturesSection from '../components/home/FeaturesSection';
import VideoSection from '../components/home/VideoSection';
import NewsletterSection from '../components/home/NewsletterSection';

const Home = () => {
    return (
        <div className="bg-[#0a0e17] min-h-screen text-white">
            <HeroSection />
            <SMCCarousel />
            {/* <StatsSection /> */}
            <MarketSection />
            <PdfsSection />
            <VipSection />
            <FeaturesSection />
        </div>
    );
};

export default Home;
