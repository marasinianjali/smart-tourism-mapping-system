from rest_framework.permissions import BasePermission, SAFE_METHODS


class TouristPlacePermission(BasePermission):

    def has_permission(self, request, view):

        if request.method in SAFE_METHODS:
            return True

        return request.user.role in [
            "SUPER_ADMIN",
            "MUNICIPALITY_ADMIN",
            "DATA_ENTRY_USER",
        ]