from cmath import log
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework import status
from .models import SurveyInfo, QuestionAnswer
from survey.models import question_options



@api_view(['POST'])
def recordNewSurvey(request):

    reacord_created = False

    data = request.data
    user = request.user

    survey_id = data['surveyQuestion']['id']
    print(survey_id)
    surveyInfoObj, created = SurveyInfo.objects.get_or_create(user=user, survey_info_id=survey_id)
    questions = data['surveyQuestion']['survay_of_question']
    for question in questions:
        if question['question_type']=='text' and question['answer']:
            QAobj, created = QuestionAnswer.objects.get_or_create(survey_from=surveyInfoObj, question_from_id=question['id'], text_answer=question['answer'], question_type=question['question_type'])
            reacord_created=True
        else:
            QAobj, created = QuestionAnswer.objects.get_or_create(survey_from=surveyInfoObj, question_from_id=question['id'], question_type=question['question_type'])
            for options in question['question']:
                if options['is_checked']:
                    print(options)
                    qst = question_options.objects.get(pk=options['id'])
                    QAobj.option_answer.add(qst)
                    reacord_created=True
    print('comed')
    if reacord_created:
        return Response('success', status=status.HTTP_200_OK)
    else:
        
        survayInfo  = SurveyInfo.objects.get(pk=surveyInfoObj.id)
        survayInfo.delete()
        return Response('fail', status=status.HTTP_200_OK)
    
    