import api from "../api/axios";

export const approvePlace = async (id) => {
    return await api.post(
        `tourism/places/${id}/approve/`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
        }
    );
};

export const rejectPlace = async (id) => {
    return await api.post(
        `tourism/places/${id}/reject/`,
        {
            reason: "Rejected from UI",
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
        }
    );
};