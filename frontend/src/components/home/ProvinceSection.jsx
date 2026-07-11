import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

function ProvinceSection() {

    const [provinces, setProvinces] = useState([]);

    useEffect(() => {
        fetchProvinces();
    }, []);

    const fetchProvinces = async () => {

        try {

            const response = await api.get("tourism/districts/");

            const provinceMap = {};

            response.data.results.forEach((district) => {

                if (!provinceMap[district.province]) {

                    provinceMap[district.province] = {
                        name: district.get_province_display || district.province,
                        province: district.province,
                        count: 0,
                    };

                }

                provinceMap[district.province].count++;

            });

            setProvinces(Object.values(provinceMap));

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <section className="py-24 bg-white">

            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-4xl font-bold text-center">
                    Popular Provinces
                </h2>

                <p className="text-gray-500 text-center mt-4 mb-12">
                    Discover destinations across Nepal.
                </p>

                <div className="grid md:grid-cols-3 gap-8">

                    {provinces.map((province) => (

                        <Link
                            key={province.province}
                            to={`/provinces/${province.province}`}
                            className="
                                bg-gray-50
                                rounded-2xl
                                shadow-md
                                p-8
                                hover:shadow-xl
                                transition
                            "
                        >

                            <div className="text-5xl mb-5">
                                🏔️
                            </div>

                            <h3 className="text-2xl font-bold">
                                {province.province}
                            </h3>

                            <p className="mt-3 text-gray-500">
                                {province.count} Districts
                            </p>

                            <p className="mt-6 text-green-600 font-semibold">
                                Explore →
                            </p>

                        </Link>

                    ))}

                </div>

            </div>

        </section>

    );

}

export default ProvinceSection;