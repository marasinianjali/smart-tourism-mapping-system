from rest_framework.permissions import BasePermission


class IsMunicipalityAdminOrSuperAdmin(BasePermission):

    def has_permission(self, request, view):

        user = request.user

        return (
            user.is_authenticated and (
                user.is_superuser or
                user.role in ["SUPER_ADMIN", "MUNICIPALITY_ADMIN"]
            )
        )