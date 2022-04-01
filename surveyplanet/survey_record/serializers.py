from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import SurveyInfo, QuestionAnswer
from django.contrib.auth import  get_user_model
from survey.serializers import SurveySerializer, QuestionOptionsSerializer, ServayQuestionSerializer
User= get_user_model()

class UserSerialzers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username',]



class QuestionAnswerSerialzers(serializers.ModelSerializer):
    option_answer = ServayQuestionSerializer(many=True)
    class Meta:
        model = QuestionAnswer
        fields = ['survey_from', 'question_from', 'text_answer', 'question_type', 'option_answer']


class surveyInfoSerialzers(serializers.ModelSerializer):
    user = UserSerialzers()
    survey_info = SurveySerializer()
    survey_from = QuestionAnswerSerialzers()
    class Meta:
        model = SurveyInfo
        fields = ['user', 'survey_info', 'survey_from', 'timestamp',]