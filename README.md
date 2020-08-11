# QlikAPI

How to install this image
First you have to clone the repo into a desired directory
git clone https://github.com/ahmedGhub/QlikAPI.git

After that you would have to build the image by navigating to the desired directory and running 

docker build --tag qlikapi .

Start you image by running 

sudo docker run qlikapi -p 4444:4444


Make sure that your container is running 
docker ps


API Endpoints:

GET messages/get
POST messages/post
DELETE messages/delete
PATCH messages/patch

GET messages/get
 
The method is generally used (if no https body data attached) to list all message entries that exist in the storage file attached to the API, with all the accompanied data that is attached to each message.
 
The method is also enhanced to search in the storage by message author but also message id
 
Resource URL
localhost:4444/messages/get
 
 
Resource Information
Response formats                    JSON
Requires authentication?             NO




 
body Parameters

author      required      Ahmed Gawish     
id          required        12852345



Example request
Send the host an empty body get request at the path messages/get:
 
Example Response
[
   {
       "author": "Ahmed Gawish",
       "id": 1596980169466,
       "specialCase": "false",
       "message": "as,dfdsa",
       "palindrome": true
   },
   {
       "author": "Ahmed Gawish",
       "id": 1596980177722,
       "specialCase": false,
       "message": "im ok ehh",
       "palindrome": false
   },
   {
       "author": "Gawish",
       "id": 1596982407616,
       "specialCase": "false",
       "message": "hala wallah",
       "palindrome": false
   }
]
 
Example request with body parameters
Sending a get request to the host for example localhost:4444/messages/get

And adding the following body parameter in the body of the http request 
{ "author": "Ahmed Gawish"}

Example Response
[
   {
       "author": "Ahmed Gawish",
       "id": 1596980169466,
       "specialCase": "false",
       "message": "as,dfdsa",
       "palindrome": true
   },
   {
       "author": "Ahmed Gawish",
       "id": 1596980177722,
       "specialCase": false,
       "message": "im ok ehh",
       "palindrome": false
   }
]
And adding the following body parameter in the body of the http request 
{ "id": 1596980177722}
[
Example Response
 
   {
       "author": "Ahmed Gawish",
       "id": 1596980177722,
       "specialCase": false,
       "message": "im ok ehh",
       "palindrome": false
   }
]
 
 
 
 
 
 

POST messages/post
Allows users to post new messages as they request the classification of their messages, whether they are a palindrome or not. The request will not only respond with the classification of the sent message but also it will add it to storage for future retrieving.

Resource URL
localhost:4444/messages/post
 
 

Resource Information
Response formats                    JSON
Requires authentication?             NO


HTTP Body Parameters


Name            Required      Description                                  Example

author          required                                                “Ahmed Gawish”

message         required                                                  “I love you”

specialCase   required      This will allow the user                    
                            to specify whether he/she wants 
                            to ignore special characters in their 
                            message or not. 


For example:
If specialCase is set to true
Eva, Can I Stab Bats In A Cave?
Will be considered a palindrome since all the special characters such as the comma’s the spaces and the question mark will be ignored.
However if the special case is set to false. The previous sentence will not be considered a palindrome since it the algorithm will not ignore special characters 



Example request
POST 
localhost:4444/messages/post
 
Body parameters:
{
   "author": "sami Gawish",
   "specialCase": false,
   "message":"Eva, Can I Stab Bats In A Cave?"
}
 
Example response
{
   "author": "sami Gawish",
   "id": 1597141311891,
   "specialCase": false,
   "message": "Eva, Can I Stab Bats In A Cave?",
   "palindrome": false
}







DELETE messages/delete

Deletes a client previous posting that was created with POST 
DELETE localhost:4444/messages/delete
.
Resource URL
localhost:4444/messages/delete
 
 
Resource Information

Response formats                JSON
Requires authentication?          No 



Parameters in the http body 
id (required)       The numeric  ID of the custom message to destroy. This id is typically received when posting a message.
 
 
Example request 
DELETE 
localhost:4444/messages/delete
 
Body parameters:
{"id": 1596982407616}
 
 
Example Response
{
   "confirmation": "done"
}

This would mean that the id passed in the Delete http request body is either not existing in storage or have been deleted successfully.





PATCH messages/patch

Updates a previous  Message in storage  by the specifying the message ID. 
You can either update the message, the specialCase boolean or both.
 
Resource URL
localhost:4444/messages/patch
 
 
Resource Information
Response formats              JSON
Requires authentication?       No 




Parameters
id (required)       The id of the Message that should be updated.

message             This is usually the new message to update the old one, its set to null if not specified

specialCase         The new state of the specialCase boolean, set to null if not specified 



Example request 
 
PATCH 
localhost:4444/messages/patch
 
Body parameters:
{
"id": 1597141290022,
"message": "a different message"
}
 
Example Response
{
   "confirmation": "done"
}


