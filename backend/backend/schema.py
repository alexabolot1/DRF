from graphene_django import DjangoObjectType
from todo.models import Project, Notes
from users.models import CustomUser
import graphene


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class NotesType(DjangoObjectType):
    class Meta:
        model = Notes
        fields = '__all__'


class Query(graphene.ObjectType):
    all_notes = graphene.List(NotesType)

    def resolve_all_todo(root, info):
        return Notes.objects.all()

    all_user = graphene.List(UserType)

    def resolve_all_user(root, info):
        return CustomUser.objects.all()

    user_by_id = graphene.Field(UserType, pk=graphene.Int(required=True))

    def resolve_user_by_id(self, info, pk):
        try:
            return CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return None


class ProjectCreateMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        link = graphene.String(required=True)

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, name, link):
        project = Project(name=name, link=link)
        project.save()
        return cls(project)


class ProjectUpdateMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String(required=False)
        link = graphene.String(required=False)

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, id, name=None, link=None):
        project = Project.objects.get(id=id)
        if name:
            project.name = name
        if link:
            project.link = link
        if name or link:
            project.save()
        return cls(project)


class Mutations(graphene.ObjectType):
    create_project = ProjectCreateMutation.Field()
    update_project = ProjectUpdateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
