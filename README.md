

# Friends backend w/ Express.js and Mysql

A backend application using Node.js with the Express framework, that implements a Shows friends details the Mysql.

              
- User Listing.
- User Friends Listing.
- User Friends of Friend Listing.
---

## Stack
    
| Lib | Version | Used For|
| ------ | ------ | ------ |
| express | ^4.17.1 | basic routing|
| cors | ^2.8.5 |for cors|
| hashids | ^2.0.1 |encode & decode ids|
| mysql | ^2.17.1 |to interact with Mysql |

---

## Running

**After clone **

```sh
$ db migrate
$ npm install
```

**Starting the application**

```sh
$ npm start
```

or

```sh
$ node server.js
```
```
Backend Folder Structure is simple
routes-contains routes and a middleware
controller- contains method for sign/sign in
model- db schema
helpers- contain helper function to deal with api error response and hashing ids
```
---

---
## Routes
### Postman Doc: [Link](https://documenter.getpostman.com/view/6553325/UVeGr6B7)
### All routes are using cursor based pagination 

* Users List 
```sh
method: "GET"
url: "/api/users"
```
#### Response
<details>
  <summary>Response Click to expand!</summary>
  
  ```json
  //http://localhost:8080/api/users?limit=4
{
    "status": "success",
    "msg": "Sucesfully user list fetched",
    "limit": "4",
    "length": 4,
    "data": [
        {
            "userid": 5,
            "name": "russia"
        },
        {
            "userid": 4,
            "name": "pakistan"
        },
        {
            "userid": 3,
            "name": "nepal"
        },
        {
            "userid": 2,
            "name": "bhutan"
        }
    ],
    "next_cursor": "4YGeYxMW6J",
    "next_cursor_url": "/api/users?limit=4&next_cursor=4YGeYxMW6J"
}
```
</details>


* Users Friend List 
```sh
method: "GET"
url: "/api/users/:id/friendlist"
```
#### Response
<details>
  <summary>Response Click to expand!</summary>
  
```json
//http://localhost:8080/api/users/1/friendlist?limit=50
{
    "status": "success",
    "msg": "Sucesfully user's friend list fetched",
    "limit": "50",
    "length": 2,
    "data": [
        {
            "userid": 3,
            "name": "nepal"
        },
        {
            "userid": 2,
            "name": "bhutan"
        }
    ],
    "next_cursor": "",
    "next_cursor_url": ""
}
```
</details>


* Users Friend of friend List 
```sh
method: "GET"
url: "/api/users/:id/friendoffriend"
```
#### Response
<details>
  <summary>Response Click to expand!</summary>
  
```json

{
    "status": "success",
    "msg": "Sucesfully user's friend of friend list fetched",
    "limit": "5",
    "length": 2,
    "data": [
        {
            "userid": 5,
            "name": "russia"
        },
        {
            "userid": 4,
            "name": "pakistan"
        }
    ],
    "next_cursor": "",
    "next_cursor_url": ""
}
```

</details>

