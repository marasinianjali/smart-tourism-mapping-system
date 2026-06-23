import { useState, useEffect } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

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
        }
    };

    const fetchCategories = async () => {
        const res = await api.get("tourism/categories/");
        setCategories(res.data.results);
    };

    const fetchDistricts = async () => {
        const res = await api.get("tourism/districts/");
        setDistricts(res.data.results);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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

            alert("Place Updated");
            navigate("/places");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">
                Edit Place
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 max-w-2xl"
            >
                {/* SAME FIELDS AS CREATE */}
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

                <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-3 rounded"
                >
                    Update Place
                </button>
            </form>
        </Layout>
    );
}

export default EditPlace;