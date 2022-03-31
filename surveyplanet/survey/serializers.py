from rest_framework import serializers
from .models import Survey, Servay_Question, question_options
from django.contrib.auth import  get_user_model
User= get_user_model()



class QuestionOptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = question_options
        fields=['id', 'option', 'voter']



class ServayQuestionSerializer(serializers.ModelSerializer):
    question = QuestionOptionsSerializer(many=True)
    class Meta:
        model = Servay_Question
        fields=['id', 'question_title', 'question_type', 'question']


class SurveySerializer(serializers.ModelSerializer):
    survay_of_question = ServayQuestionSerializer(many=True)
    class Meta:
        model = Survey
        fields=['id', 'title','timer', 'attendant_user', 'survay_of_question']


class CreateSurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields=['id', 'title','timer',]

    
class CreateServayQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servay_Question
        fields=['id', 'survay_of_question', 'question_title', 'question_type',]

class CreateQuestionOptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = question_options
        fields=['id','survey_question', 'survay_of_option', 'option',]