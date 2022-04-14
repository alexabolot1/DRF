from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase, force_authenticate
from .views import ProjectCustomViewSet
from .models import Project, Notes
# from django.contrib.auth.models import User
from mixer.backend.django import mixer
from users.models import CustomUser


class TestProjectApi(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        user = CustomUser.objects.create_superuser('django', email='django@mail.com', password='geekbrains')
        request = factory.get('/api/projects')
        force_authenticate(request, user)
        view = ProjectCustomViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_get_list_1(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects')
        view = ProjectCustomViewSet.as_view({'get': 'list'})
        Project.objects.create(users='django', project_name='project_django', link='https://django.com')
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_list_2(self):
        client = APIClient()
        response = client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_get_list_3(self):
        client = APIClient()
        Project.objects.create(users='django', project_name='project_django', link='https://django.com')
        response = client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class TestProjectClientApi(APITestCase):
    def setUp(self) -> None:
        self.project = mixer.blend(Project, link='https://django.com')
        self.admin = User.objects.create_superuser('django', email='django@mail.com', password='geekbrains')

    def test_get_list(self):
        self.client.login(username='django', password='geekbrains')
        self.client.logout()
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_list_1(self):
        self.client.force_login(self.admin)
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
