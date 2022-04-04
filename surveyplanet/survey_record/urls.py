from django.urls import path, include
from .views import recordNewSurvey, SurveyParticipatedUser


urlpatterns = [
    path('record/', recordNewSurvey, name='survey_record'),
    path('participated-user/<int:pk>', SurveyParticipatedUser.as_view(), name='survey_record'),
    

]