### Random User API Server

## Use Technology

- Node.js (express.js), Raw JSON DB, render.com (for deployment)

## API END POINTS

- Host: https://random-user-api-r5vz.onrender.com/

- GET | "{host}/user/random" => get random user

- GET | "{host}/user/all" => get all users with payload=>query:{skip:10, limit:10}

- POST | "{host}/user/all/save" => add user payload=> body {gender, male,name,contact,address,photoUrl}. We generate \_id, createAt, updatedAt properties by default.

- PATCH | "{host}/user/update", Update single user. payload=> body {\_id:for find user, necessary update property}.

- PATCH | "{host}/user/bulk-update", Update multiple user with array of object of user updating data. payload=> body [{_id:for find user, necessary update property}].

- DELETE | "{host}/user/delete", Delete single user. payload=> body {\_id:for find user}.
