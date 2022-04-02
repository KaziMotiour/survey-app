from rest_framework import serializers
from .models import Survey, Servay_Question, question_options
from django.contrib.auth import  get_user_model
User= get_user_model()
from survey_record.models import SurveyInfo, QuestionAnswer



class QuestionOptionsSerializer(serializers.ModelSerializer):
    voer_count = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = question_options
        fields=['id', 'option', 'voer_count']

    def get_voer_count(self, obj):
        
        count = QuestionAnswer.objects.filter(option_answer=obj).count()
        return count
       



class ServayQuestionSerializer(serializers.ModelSerializer):
    question = QuestionOptionsSerializer(many=True)
    text_answer = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Servay_Question
        fields=['id', 'question_title', 'question_type', 'question', 'text_answer']

    def get_text_answer(self, obj):
        if(obj.question_type=='text'):
            answer_count = QuestionAnswer.objects.filter(question_from=obj).count()
            return answer_count
        else:
            return 0



class SurveySerializer(serializers.ModelSerializer):
    survay_of_question = ServayQuestionSerializer(many=True)
    participants = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Survey
        fields=['id', 'title','timer', 'survay_of_question', 'participants']

    
    def get_participants(self, obj):
       
        participents = SurveyInfo.objects.filter(survey_info=obj).count()
        print(participents)
        return participents


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