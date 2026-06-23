import { useState, useEffect } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

function CreatePlace() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        district: "",
        address: "",
        latitude: "",
        longitude: "",
        is_featured: false,
    });
    const [categories, setCategories] = useState([]);
    const [districts, setDistricts] = useState([]);
    useEffect(() => {
        fetchCategories();
        fetchDistricts();
    }, []);
    const fetchCategories = async () => {
        try {
            const response = await api.get(
                "tourism/categories/",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                }
            );

            setCategories(response.data.results);

        } catch (error) {
            console.error(error);
        }
    };
    const fetchDistricts = async () => {
        try {
            const response = await api.get(
                "tourism/districts/",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                }
            );

            setDistricts(response.data.results);

        } catch (error) {
            console.error(error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post(
                "tourism/places/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                }
            );

            alert("Place Created Successfully");

            setFormData({
                name: "",
                description: "",
                category: "",
                district: "",
                address: "",
                latitude: "",
                longitude: "",
                is_featured: false,
            });

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Layout>
            <form className="space-y-4 max-w-2xl" onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Place Name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value,
                        })
                    }
                    className="w-full border p-3 rounded"
                />

                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                    className="w-full border p-3 rounded"
                    rows="4"
                />

                <select
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            category: e.target.value,
                        })
                    }
                    className="w-full border p-3 rounded"
                >
                    <option value="">
                        Select Category
                    </option>

                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>

                <select
                    value={formData.district}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            district: e.target.value,
                        })
                    }
                    className="w-full border p-3 rounded"
                >
                    <option value="">
                        Select District
                    </option>

                    {districts.map((district) => (
                        <option
                            key={district.id}
                            value={district.id}
                        >
                            {district.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            address: e.target.value,
                        })
                    }
                    className="w-full border p-3 rounded"
                />

                <input
                    type="number"
                    step="0.000001"
                    placeholder="Latitude"
                    value={formData.latitude}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            latitude: e.target.value,
                        })
                    }
                    className="w-full border p-3 rounded"
                />

                <input
                    type="number"
                    step="0.000001"
                    placeholder="Longitude"
                    value={formData.longitude}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            longitude: e.target.value,
                        })
                    }
                    className="w-full border p-3 rounded"
                />

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                is_featured:
                                    e.target.checked,
                            })
                        }
                    />
                    Featured Place
                </label>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                >
                    Create Place
                </button>

            </form>
        </Layout>
    );
}

export default CreatePlace;