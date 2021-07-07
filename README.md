# Todo List Api 

## Coding challenge

The goal of this challenge is to build a simple To-Do api in NodeJS.

I'm using a stack consisting of **ExpressJs** and **MongoDB** to reach this goal.

As for tools, I'm using **Passport** for authentication, **Mongoose** as ODM

## How to run it:

This repo is dockerized, so you can just:


`docker-compose build`

`docker-compose up`

## The user system:

### Sign Up: /api/accounts/signup

`curl --location --request POST 'localhost:3000/api/accounts/signup' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'username=<username>' --data-urlencode 'password=<password>'`

### Log In: /api/accounts/login

`curl --location --request POST 'localhost:3000/api/accounts/login' --header 'Content-Type: application/x-www-form-urlencoded'  --data-urlencode 'username=<username>'  --data-urlencode 'password=<password>'`

### Log Out: /api/accounts/logout

`curl --location --request POST 'localhost:3000/api/accounts/logout'`

### Profile: /api/accounts/profile (just to check)

`curl --location --request GET 'localhost:3000/api/accounts/profile' --header 'Authorization: Bearer <your-token>'` 



## The Todo List:

### Get your Todos:

`curl --location --request GET 'localhost:3000/api/todos?sort=date' --header 'Authorization: Bearer <your-token>'` 

 ### Add Todos:

`curl --location --request POST 'localhost:3000/api/todos' --header 'Authorization: Bearer <your-token>' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'done=false' --data-urlencode 'description=Descripcion' --data-urlencode 'date=2020-02-03'`

### Update Todos:

`curl --location --request PUT 'localhost:3000/api/todos' --header 'Authorization: Bearer <your-token>' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'done=true' --data-urlencode 'description=New Description' --data-urlencode 'date=2020-02-03' --data-urlencode '_id=<todo-id>'`

### Delete Todos:

`curl --location --request DELETE 'localhost:3000/api/todos' --header 'Authorization: Bearer <your-token>' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode '_id=<todo-id>'`

