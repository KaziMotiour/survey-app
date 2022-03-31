from random import choice
from re import M
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.
class Survey(models.Model):
    title = models.CharField(max_length=1000)
    timer = models.IntegerField(default=5)
    attendant_user = models.ManyToManyField(User, blank=True)
    timeStamp = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ('-timeStamp',)
        

class Servay_Question(models.Model):
    question_types =(
    ("text", "text"),
    ("radio", "radio"),
    ("multiple", "multiple"))

    survay_of_question = models.ForeignKey('survey.Survey', related_name="survay_of_question", on_delete=models.CASCADE)
    question_title = models.CharField(max_length=1000)
    question_type = models.CharField(max_length=250, choices=question_types, default="text")
    def __str__(self) -> str:
        return self.question_title

class question_options(models.Model):
    survey_question = models.ForeignKey('survey.Servay_Question', related_name="question", on_delete=models.CASCADE)
    survay_of_option = models.ForeignKey('survey.Survey', related_name="survay_of_option", on_delete=models.CASCADE)
    option = models.CharField(max_length=500)
    voter = models.ManyToManyField(User, blank=True)
    
    def __str__(self) -> str:
        return self.option
    

        


