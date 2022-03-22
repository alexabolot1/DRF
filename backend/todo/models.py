from django.db import models
from users.models import CustomUser


class Project(models.Model):
    name = models.CharField(max_length=64)
    link = models.TextField()
    users = models.ManyToManyField(CustomUser)

    def __str__(self):
        return f'{self.name}'


class Notes(models.Model):
    project_name = models.OneToOneField(Project, on_delete=models.CASCADE)
    text_note = models.TextField()
    create_datatime = models.DateField(auto_now_add=True)
    update_datatime = models.DateField(auto_now=True)
    author_note = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.project_name}'
