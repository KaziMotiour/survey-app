# U-Profile--complete-social-site-with-django-react-and-redux ![Django](https://img.shields.io/badge/-Django-%23092E20?style=flat-square&logo=React&logoColor=white) 
![React](https://img.shields.io/badge/-React-%23092E20?style=flat-square&logo=React&logoColor=white) 
![Redux](https://img.shields.io/badge/-Redux-%23092E20?style=flat-square&logo=Redux&logoColor=white)

This a survey app. Where admin can create survey and can see the survey review and user survey records. User can attend the survey only.


## Live demo
https://survey--planet.herokuapp.com/

## Back-end
* Django
* Django Rest Framework
* Postgresql
## Front-end Part
* React
* Bootstrap

## To Run This Application yo need to follow those command bellow
### Backend/server Part
* cd surveyplanet  -> Change File directory to django project directory.
* Create a database from Postgresql.
* Setup database form setting.py in surveyplanet directory.
* create and activate virualenv to install pakedge / Or you can install it in you local machine.
* pip install -r requirements.txt  -> run this command to install pakedge.
* python manage.py makemigrations  -> run this comman it will generates the SQL commands for preinstalled apps.
* python manage.py migrate -> run this command it will executes those SQL commands in the database file.
* python manage.py runserver -> It will run the server/backend server

### Frontend/client Part
* cd surveyplanet-frontend  -> Change File directory to react project directory.
* npm install -> run this command it will install all the dependency for you project
* npm start -> It will run the client/frontend part

