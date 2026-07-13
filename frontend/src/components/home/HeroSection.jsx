import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function HeroSection() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const handleSearch = () => {
        const query = search.trim();

        if (query.length < 2) {
            return;
        }

        navigate(`/explore?search=${encodeURIComponent(query)}`);
    };
    return (
        <section
            className="relative min-h-screen bg-red-500"
            style={{
                backgroundImage:
                    "url('/images/boudha.webp')",

            }}
        >

            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">

                <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
                    Explore the Beauty of
                    <span className="block text-green-400">
                        Nepal
                    </span>
                </h1>

                <p className="mt-10 max-w-3xl text-lg md:text-xl text-gray-200 leading-8">
                    Journey through majestic Himalayas,
                    ancient temples, <br />
                    breathtaking lakes,
                    vibrant culture,<br />
                    and unforgettable adventures waiting in every corner of Nepal.
                </p>

                <div className="mt-10 w-full max-w-xl">
                    <input
                        type="text"
                        placeholder="🔍 Search destinations..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {
                                handleSearch();
                            }

                        }}
                        className=" w-full rounded-full px-6 py-4 bg-white/20 backdrop-blur-md
                            border-2 border-green-400 text-white placeholder:text-gray-200 shadow-xl
                            outline-none focus:border-green-500 focus:ring-4 focus:ring-green-300/50
                            transition duration-300 " />
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-6">

                    <Link
                        to="/places"
                        className="
                            bg-green-500
                            hover:bg-green-600
                            text-white
                            px-10
                            py-4
                            rounded-full
                            font-semibold
                            transition
                            shadow-lg
                        "
                    >
                        Explore Places
                    </Link>

                    <Link
                        to="/map"
                        className="
                            border-2
                            border-white
                            hover:bg-white
                            hover:text-black
                            text-white
                            px-10
                            py-4
                            rounded-full
                            font-semibold
                            transition
                        "
                    >
                        Interactive Map
                    </Link>

                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-7 h-12 border-2 border-white rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default HeroSection;