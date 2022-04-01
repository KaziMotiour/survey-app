from operator import mod
from django.db import models
from django.contrib.auth import get_user_model

import survey

User = get_user_model()

# Create your models here.

class SurveyInfo(models.Model):
    user = models.ForeignKey(User, related_name="surveyor_user", on_delete=models.CASCADE)
    survey_info=models.ForeignKey("survey.Survey", related_name="suervy_info", on_delete=models.CASCADE)
    timestamp = models.DateTimeField( auto_now_add=True)
    
    def __str__(self) -> str:
        return self.survey_info.title

class QuestionAnswer(models.Model):
    question_types =(
    ("text", "text"),
    ("radio", "radio"),
    ("multiple", "multiple"))

    survey_from = models.ForeignKey(SurveyInfo, related_name="survey_from", on_delete=models.CASCADE)
    question_from = models.ForeignKey("survey.Servay_Question", related_name="question_from", on_delete=models.CASCADE)
    text_answer = models.CharField( max_length=500)
    question_type=models.CharField(max_length=50, choices=question_types)
    option_answer = models.ManyToManyField("survey.question_options", related_name="option_from")

    def __str__(self) -> str:
        return self.question_from.question_title