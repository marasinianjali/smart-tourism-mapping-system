from rest_framework.permissions import BasePermission


class IsMunicipalityAdminOrSuperAdmin(BasePermission):

    def has_permission(self, request, view):
        return request.user.role in [
            "SUPER_ADMIN",
            "MUNICIPALITY_ADMIN"
        ]