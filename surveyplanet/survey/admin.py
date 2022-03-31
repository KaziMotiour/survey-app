from django.contrib import admin
from .models import Survey, Servay_Question, question_options

# Register your models here.
admin.site.register(Survey)
admin.site.register(Servay_Question)
admin.site.register(question_options)
