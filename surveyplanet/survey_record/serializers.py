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
    option_answer = QuestionOptionsSerializer(many=True)
    question_from = ServayQuestionSerializer()
    class Meta:
        model = QuestionAnswer
        fields = ['question_from', 'question_type', 'option_answer', 'text_answer']


class surveyInfoSerialzers(serializers.ModelSerializer):
    user = UserSerialzers()
    survey_from = QuestionAnswerSerialzers(many=True)
    survey_info = SurveySerializer()
    class Meta:
        model = SurveyInfo
        fields = ['id', 'user', 'survey_info', 'user',  'survey_from', 'timestamp',]