

# Friends backend w/ Express.js and Mysql

A backend application using Node.js with the Express framework, that implements a Shows friends details the Mysql.

              
●User Listing.
● User Friends Listing.
● User Friends of Friend Listing.
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

### All routes are using cursor based pagination 

* Users List 
```sh
method: "GET"
url: "/api/users"
```

* Users Friend List 
```sh
method: "GET"
url: "/api/users/:id/friendlist"
```

* Users Friend of friend List 
```sh
method: "GET"
url: "/api/users/:id/friendoffriend"
```

