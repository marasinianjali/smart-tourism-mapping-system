import { useState, useEffect } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

function EditPlace() {
    const { id } = useParams();
    const navigate = useNavigate();

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
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchCategories();
        fetchDistricts();
        fetchPlace();
    }, []);

    const fetchPlace = async () => {
        try {
            const res = await api.get(
                `tourism/places/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                }
            );

            setFormData(res.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        const res = await api.get(
            "tourism/categories/",
            {
                headers: {
                    Authorization:
                        `Bearer ${localStorage.getItem("access")}`,
                },
            }
        );

        setCategories(res.data.results);
    };
    const fetchDistricts = async () => {
        const res = await api.get(
            "tourism/districts/",
            {
                headers: {
                    Authorization:
                        `Bearer ${localStorage.getItem("access")}`,
                },
            }
        );
        setDistricts(res.data.results);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            toast.error("Place name is required");
            return;
        }

        if (!formData.category) {
            toast.error("Select category");
            return;
        }

        if (!formData.district) {
            toast.error("Select district");
            return;
        }

        const lat = Number(formData.latitude);
        const lng = Number(formData.longitude);

        if (lat < -90 || lat > 90) {
            toast.error("Invalid latitude");
            return;
        }

        if (lng < -180 || lng > 180) {
            toast.error("Invalid longitude");
            return;
        }

        try {
            await api.put(
                `tourism/places/${id}/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                }
            );

            toast.success("Place Updated Successfully");
            navigate("/places");

        } catch (error) {
            console.error(error);
            toast.error("Failed to update place");
        } finally {
            setSaving(false);
        }
    };
    if (loading) {
        return (
            <Layout>
                <p>Loading...</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">
                Edit Tourist Place
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 max-w-2xl"
            >

                <input
                    type="text"
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
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                    className="w-full border p-3 rounded"
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
                    disabled={saving}
                    className="bg-green-600 text-white px-6 py-3 rounded disabled:opacity-50"
                >
                    {saving ? "Updating..." : "Update Place"}
                </button>
                <button
                    type="button"
                    onClick={() => navigate("/places")}
                    className="bg-gray-500 text-white px-6 py-3 rounded ml-2"
                >
                    Cancel
                </button>
            </form>
        </Layout>
    );
}

export default EditPlace;