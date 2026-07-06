import PublicNavbar from "../components/PublicNavbar";

import HeroSection from "../components/home/HeroSection";
import FeaturedSection from "../components/home/FeaturedSection";
import CategorySection from "../components/home/CategorySection";
import StatsSection from "../components/home/StatsSection";
import ProvinceSection from "../components/home/ProvinceSection";
import WhyVisitSection from "../components/home/WhyVisitSection";
import FooterSection from "../components/home/FooterSection";

function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            <PublicNavbar />

            <HeroSection />

            <FeaturedSection />

            <CategorySection />

            <StatsSection />

            <ProvinceSection />

            <WhyVisitSection />

            <FooterSection />
        </div>
    );
}

export default Home;