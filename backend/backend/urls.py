from django.contrib import admin
from django.urls import path, include
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
from todo.views import ProjectCustomViewSet, NotesCustomViewSet
from users.views import UserCustomViewSet
from rest_framework.authtoken import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


router = DefaultRouter()
router.register('users', UserCustomViewSet)
router.register('projects', ProjectCustomViewSet)
router.register('notes', NotesCustomViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title='Library',
        default_version='1.0',
        description='description',
        contact=openapi.Contact(email='test@mail.com'),
        license=openapi.License(name='MIT')
    ),
    public=True,
    permission_classes=(AllowAny, )
)

urlpatterns = [
   path('admin/', admin.site.urls),
   path('api-auth/', include('rest_framework.urls')),
   path('api/', include(router.urls)),
   path('api-token-auth/', views.obtain_auth_token),
   path('swagger/', schema_view.with_ui()),
]
