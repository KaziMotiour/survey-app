from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from .serializers import SurveySerializer, ServayQuestionSerializer, QuestionOptionsSerializer, CreateSurveySerializer, CreateServayQuestionSerializer, CreateQuestionOptionsSerializer
from .models import Survey, Servay_Question, question_options
from rest_framework import status
# Create your views here.


# @dec Get Survey List
# @route GET /survey/list
# @access IsAuthenticated
class SurveyListApiView(ListAPIView):
    serializer_class = SurveySerializer
    permission_classes = [IsAuthenticated]
    queryset = Survey.objects.all()



# @dec Retrive Survey Detail 
# @route GET /survey/detail/survey_id
# @access IsAuthenticated
class SurveyDetailApiView(RetrieveAPIView):
    serializer_class = SurveySerializer
    permission_classes = [IsAuthenticated]
    queryset = Survey.objects.all()



# @dec Create New Suervy
# @route POST /survey/create
# @access IsAdminUser
@api_view(['POST'])
@permission_classes([IsAdminUser])
def CreateSurvey(request):

    surveyInfo = request.data.get('surveyInfo')
    surveyQuestion = request.data.get('question')

    createSurveyInfo = CreateSurveySerializer(data=surveyInfo)
    if createSurveyInfo.is_valid():
        createSurveyInfo.save()

    else:
        Response(createSurveyInfo.errors, status=status.HTTP_400_BAD_REQUEST)

    survay_of_question = Survey.objects.get(pk=createSurveyInfo.data['id'])
    for question in surveyQuestion:
        if question['question_title']:
            createSurveyQuestion = CreateServayQuestionSerializer(
                data={'survay_of_question': createSurveyInfo.data['id'], 'question_title': question['question_title'], 'question_type': question['question_type']})
            if createSurveyQuestion.is_valid():
                createSurveyQuestion.save()
                
            else:
                print(createSurveyQuestion.errors)

            if question['question_type'] != 'text':
                empty=True
                for options in question['options']:
                    if options['qts']:
                        
                        empty=False
                        question_option = CreateQuestionOptionsSerializer(data={
                            'survey_question':createSurveyQuestion.data['id'], 'survay_of_option':createSurveyInfo.data['id'], 'option':options['qts']})
                        if question_option.is_valid():
                            print('options valid')
                            question_option.save()
                        else:
                            print(question_option.errors)
                if empty:
                    print(createSurveyQuestion.data['question_title'])
                    obj = Servay_Question.objects.filter(question_title__icontains=createSurveyQuestion.data['question_title'])[0]
                    obj.delete()
                    

    # print(surveyQuestion)
    if createSurveyInfo:

        return Response('success', status=status.HTTP_200_OK)
    else:
         return Response('fail', status=status.HTTP_400_BAD_REQUEST)
