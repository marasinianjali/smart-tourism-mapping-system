from rest_framework.permissions import BasePermission, SAFE_METHODS


class TouristPlacePermission(BasePermission):

    def has_permission(self, request, view):

        user = request.user

        if not user or not user.is_authenticated:
            return False

        # Read-only access for everyone authenticated (or you can allow public)
        if request.method in SAFE_METHODS:
            return True

        # IMPORTANT: superuser bypass
        if user.is_superuser:
            return True

        # role-based access
        return user.role in [
            "SUPER_ADMIN",
            "MUNICIPALITY_ADMIN",
            "DATA_ENTRY_USER",
        ]