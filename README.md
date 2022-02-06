

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
| knex | ^1.0.2 |DB migration and seed |

---

## Running

**After clone **
- update db configurations
```app/config/db.config.js```
```sh
$ npm install
$ npm run migrate   //users and friends migration
$ npm run seed-dev   //seed the dummy data eg country and allies
```
*optional*
```
$ npm run seed-prod   //seed the random data using faker
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



### For simplicity sake we are going to assume countries and their allies
### Dummy data 

*In db this is mapped differently*

|Id|Countries | Friends |
|--| --- | ----------- |
|1| India | Nepal,Bhutan |
|2| bhutan | Russia,India |
|3| nepal | Russia,Pakistan,India |
|4| pakistan | Nepal |
|5| russia | Nepal,Bhutan |

#### Get friend list

 - Hit **user id 1** and it should return this

|Id|Countries | Friends |
|--| --- | -----|
|1| India | Nepal,Bhutan |

#### Get Friends of friend

- Hit **user id 1** and it should return *Pakistan,Russia*
- Hit **user id 2** and it should return *Nepal*
- Hit **user id 3** and it should return empty 
- Hit **user id 4** and it should return empty 
- Hit **user id 5** and it should return *India,Pakistan*

|Id|Countries | Friends |Friends of friend|
|--| --- | -----|----|
|1| India | Nepal,Bhutan |Pakistan,Russia|
|2| Bhutan | Russia,India |Nepal|
|3| Nepal | Russia,Pakistan,India ||
|4| Pakistan | Nepal ||
|5| Russia | Nepal,Bhutan |India,Pakistan|
