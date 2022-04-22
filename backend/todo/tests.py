from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase, force_authenticate
from .views import ProjectCustomViewSet
from .models import Project, Notes
# from django.contrib.auth.models import User
from mixer.backend.django import mixer
from users.models import CustomUser


class TestProjectApi(TestCase):

    # падает с 401 ошибкой, так как premisson указан в настройках, на время комментил premission
    def test_get_projects(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects')
        view = ProjectCustomViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_get_projects_1(self):
        factory = APIRequestFactory()
        user = CustomUser.objects.create_superuser('django', email='django@mail.com', password='geekbrains')
        request = factory.get('/api/projects')
        force_authenticate(request, user)
        view = ProjectCustomViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    # падает с 401 ошибкой, так как premisson указан в настройках, на время комментил premission
    def test_get_projects_2(self):
        client = APIClient()
        response = client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    # падает с 401 ошибкой, так как premisson указан в настройках, на время комментил premission
    def test_get_projects_3(self):
        client = APIClient()
        Project.objects.create(name='project_django', link='https://django.com')
        response = client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class TestProjectClientApi(APITestCase):
    def setUp(self) -> None:
        self.project = mixer.blend(Project, link='https://django.com')
        self.admin = CustomUser.objects.create_superuser('django', email='django@mail.com', password='geekbrains')

    def test_get_projects(self):
        self.client.login(username='django', password='geekbrains')
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_projects_1(self):
        self.client.force_login(self.admin)
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
