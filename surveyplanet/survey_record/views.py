from cmath import log
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework import status
from .models import SurveyInfo, QuestionAnswer
from survey.models import question_options
from .serializers import surveyInfoSerialzers


# @dec Record New Survay form user
# @route POST user/survey/record/
# @access IsAuthenticated
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def recordNewSurvey(request):

    reacord_created = False

    data = request.data
    user = request.user

    survey_id = data['surveyQuestion']['id']
  
    surveyInfoObj, created = SurveyInfo.objects.get_or_create(user=user, survey_info_id=survey_id)
    questions = data['surveyQuestion']['survay_of_question']
    print(questions)
    for question in questions:
        if question['question_type']=='text' and question['answer']:
            QAobj, created = QuestionAnswer.objects.get_or_create(from_survey=surveyInfoObj, question_from_id=question['id'], text_answer=question['answer'], question_type=question['question_type'])
            reacord_created=True
        else:
            is_option = False
            QAobj, created = QuestionAnswer.objects.get_or_create(from_survey=surveyInfoObj, question_from_id=question['id'], question_type=question['question_type'])
            for options in question['question']:
                if options['is_checked']:
                    print(options['is_checked'])
                    is_option=True
                    qst = question_options.objects.get(pk=options['id'])
                    QAobj.option_answer.add(qst)
                    reacord_created=True
            if not is_option:
                option_obj = QuestionAnswer.objects.get(pk=QAobj.id)
                option_obj.delete()


    if reacord_created:
        print(reacord_created, 'success')

        return Response('success', status=status.HTTP_200_OK)
    else:
        print(reacord_created)
        survayInfo  = SurveyInfo.objects.get(pk=surveyInfoObj.id)
        survayInfo.delete()
        return Response('fail', status=status.HTTP_400_BAD_REQUEST)
    
    


# @dec Get Participated user and records
# @route GET user/survey/participated-user/survey_id
# @access IsAuthenticated
class SurveyParticipatedUser(ListAPIView):
    serializer_class = surveyInfoSerialzers
    permission_classes  = [IsAdminUser]

    def get_queryset(self):
        id = self.kwargs.get('pk')
        print(id)
        return SurveyInfo.objects.filter(survey_info_id=id)
    