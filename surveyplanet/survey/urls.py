from django.urls import path, include
from .views import SurveyListApiView, SurveyDetailApiView, CreateSurvey


urlpatterns = [
    path('list/', SurveyListApiView.as_view(), name='survey_list'),
    path('detail/<int:pk>', SurveyDetailApiView.as_view(), name='survey_detail'),
    path('create/', CreateSurvey, name="create_new_survey")

]