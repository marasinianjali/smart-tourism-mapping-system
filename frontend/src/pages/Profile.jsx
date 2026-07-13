import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

function Profile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {

        try {

            const response = await api.get(
                "accounts/profile/",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                }
            );

            setProfile(response.data);

        } catch (error) {
            console.error(error);

        } finally {
            setLoading(false);
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

            <div className="max-w-4xl mx-auto py-8">

                <h1 className="text-4xl font-bold mb-2">
                    Profile
                </h1>

                <p className="text-gray-500 mb-8">
                    Manage your account information
                </p>

                <div className="bg-white rounded-2xl shadow-lg p-8">

                    <div className="flex flex-col items-center">

                        <div
                            className="
                                w-24
                                h-24
                                rounded-full
                                bg-green-100
                                flex
                                items-center
                                justify-center
                                text-4xl
                            "
                        >
                            👤
                        </div>

                        <h2 className="text-2xl font-bold mt-4">
                            {profile.full_name}
                        </h2>

                        <p className="text-gray-500">
                            {profile.role}
                        </p>

                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-10">

                        <div>

                            <label className="text-sm text-gray-500">
                                Full Name
                            </label>

                            <p className="font-semibold text-lg">
                                {profile.full_name}
                            </p>

                        </div>

                        <div>

                            <label className="text-sm text-gray-500">
                                Email
                            </label>

                            <p className="font-semibold text-lg">
                                {profile.email}
                            </p>

                        </div>

                        <div>

                            <label className="text-sm text-gray-500">
                                Phone Number
                            </label>

                            <p className="font-semibold text-lg">
                                {profile.phone_number || "Not Provided"}
                            </p>

                        </div>

                        <div>

                            <label className="text-sm text-gray-500">
                                Role
                            </label>

                            <p className="font-semibold text-lg">
                                {profile.role}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>
    );
}

export default Profile;