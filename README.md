# lafhane
A Word Finding Game
![image](https://user-images.githubusercontent.com/31761983/123533689-6a0ca300-d6e5-11eb-8f95-f191966ef40a.png)
![image](https://user-images.githubusercontent.com/31761983/123533730-cf609400-d6e5-11eb-98f6-2811181d9d5a.png)



TODO 
move environment variables to application.yml
maybe implement public private rsa to encode and decode jwt'
(done)frontend set inlobby ingame properly
(done)frontend develop user input
(done)frontend update score of user on correct answer
(done)backend save/update score of user to db
(done)frontend register page
(done)register, handle if username already exist
(done)onlogout remove livedata of the player
backend save gamedata to db
backend livedata should not accept duplicate answers on db level
front end show duplicate answer message to user
front end game total scores, lobby view, mobile focused
backend game total score
frontend limit username max length to 10
backend  limit username max length to 10
if gameState IN_LOBBY dont accept answers in server side. return from handleAnswer function