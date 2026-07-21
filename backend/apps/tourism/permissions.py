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
        # Read operations
        if request.method in SAFE_METHODS:
            return True
        
        if not user.is_authenticated:
            return False

        if user.is_superuser:
            return True


        # Approval workflow for SUPER_ADMIN and MUNICIPALITY_ADMIN
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

        # CRUD operations for SUPER_ADMIN, MUNICIPALITY_ADMIN, and DATA_ENTRY_USER
        return (
            user.role in [
                "SUPER_ADMIN",
                "MUNICIPALITY_ADMIN",
                "DATA_ENTRY_USER",
            ]
        )

class ReviewPermission(BasePermission):

    def has_permission(self, request, view):

        if request.method in SAFE_METHODS:
            return True

        return (
            request.user.is_authenticated
            and request.user.role in [
                "SUPER_ADMIN",
                "MUNICIPALITY_ADMIN",
                "DATA_ENTRY_USER",
            ]
        )

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True

        return obj.user == request.user