from django.urls import path, include
from .views import recordNewSurvey


urlpatterns = [
    path('record/', recordNewSurvey, name='survey_record'),
    

]