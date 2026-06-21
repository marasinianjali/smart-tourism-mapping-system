from rest_framework.permissions import (
    BasePermission,
    SAFE_METHODS,
)


class TouristPlacePermission(BasePermission):

    def has_permission(
        self,
        request,
        view
    ):
        user = request.user

        if not user.is_authenticated:
            return False

        if user.is_superuser:
            return True

        # Read operations
        if request.method in SAFE_METHODS:
            return True

        # Approval workflow
        if view.action in [
            "approve",
            "reject",
        ]:
            return (
                user.role in [
                    "SUPER_ADMIN",
                    "MUNICIPALITY_ADMIN",
                ]
            )

        # CRUD
        return (
            user.role in [
                "SUPER_ADMIN",
                "MUNICIPALITY_ADMIN",
                "DATA_ENTRY_USER",
            ]
        )