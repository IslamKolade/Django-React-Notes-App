from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='getRoutes'),
    path('notes/', views.getorCreateNotes, name="getorCreateNotes"),
    #RESTFUL API URL
    path('note/<int:pk>/', views.note, name="note"),




    # API URLS
    # path('note/create', views.createNote, name="createNote"),
    # path('note/<int:pk>/update/', views.updateNote, name="updateNote"),
    # path('note/<int:pk>/delete/', views.deleteNote, name="deleteNote"),
    # path('note/<int:pk>/', views.getNote, name="getNote"),
]
