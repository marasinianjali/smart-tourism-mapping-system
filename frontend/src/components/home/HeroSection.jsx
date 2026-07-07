import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <section
            className="relative min-h-screen bg-red-500"
            style={{
                backgroundImage:
                    "url('/images/boudha.webp')",
                    
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">

                <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
                    Explore the Beauty of
                    <span className="block text-green-400">
                        Nepal
                    </span>
                </h1>

                <p className="mt-10 max-w-3xl text-lg md:text-xl text-black-200 leading-8">
                    Journey through majestic Himalayas,
                    ancient temples, <br/>
                    breathtaking lakes,
                    vibrant culture,<br/>
                    and unforgettable adventures waiting in every corner of Nepal.
                </p>

                {/* Search Bar (UI Only) */}
                <div className="mt-10 w-full max-w-xl">
                    <input
                        type="text"
                        placeholder="Search destinations..."
                        className="
                            w-full
                            rounded-full
                            px-6
                            py-4
                            text-gray-800
                            shadow-xl
                            outline-none
                            focus:ring-4
                            focus:ring-green-400
                        "
                    />
                </div>

                {/* Buttons */}
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
                <div className="absolute bottom-10 animate-bounce">

                    <p className="text-white text-4xl">
                        ↓
                    </p>

                </div>

            </div>
        </section>
    );
}

export default HeroSection;