# RESTful Api Documentation
### Online Shop
---
## Authentication : Example
### Registrasi 
```http
POST http://localhost:3000/users/register
```
```json
{
    "name" : "example", // required | 
    "email" : "example@mail.com", // required
    "password" : "admin", // required
    "password_confirmation" : "admin", // required
    "phone_number" : "0835XXXXXXXX", // required
    "address" : "JL damai No 20 Block D, Yogyakarta", // required
    "role" : 1, // 1 -> customer , 2-> vendor || required
    "gender" : 2, // 1 -> male , 2 -> female || required
    "profile_picture" : "image.jpg" // required

}
```
***Response Seccess :***
```json
{
    "message" : "register success",
    "registered" : {
        "id" : "6791f71d5ac31ed90a4003c4",
        "name" : "example",
        "email" : "lisa@mail.com",
        "phone_number" : "0823XXXXXXXX",
        "role" : "customer",
        "gender" : "female",
        "address" : "JL damai No 20 Block D, Yogyakarta",
        "profile_picture" : "uploads/users/image.jpeg",
        "created" : "2025-01-23T08:00:29.157Z" // created automatic
    }
}
```
### Login
```http
POST http://localhost:3000/users/login
```
```json
{
    "email" : "example@mail.com",
    "password" : "admin"
}
```
***Response Seccess :***
```json
{
    "token" : "randomtoken" // token for authentication
}
```

---
## Vendor Service : Example
### Create Product
```http
POST http://localhost:3000/products
```
```json
{
    "product" : "PC AMD Ryzen 5, HDD 5TB",
    "price" : 350000000,
    "stock" : 3,
    "category" : "elektronika",
    "desc" : "OS Ubuntu 24.04, RAM 16GB, GPU NVIDIA GeForce GTX 1660",
    "pictures" : "image.jpg", // max 5 files
}
```
***Response Success :***
```json
{
    "message" : "OK",
    "product" : {
        "id" : "6793a7b2cd8c74f6286aabba",
        "user" : "6793a7b2cd8c74f6286aacsd", // id verdor account
        "product" : "PC AMD Ryzen 5, HDD 5TB",
        "price" : 350000000,
        "stock" : 3,
        "category" : "elektronika",
        "desc" : "OS Ubuntu 24.04, RAM 16GB, GPU NVIDIA GeForce GTX 1660",
        "path" : "uploads/products/2025-01-24T14:46:10.676Z.png uploads/products/2025-01-24T14:46:10.703Z.jpeg",
        "created" : "2025-01-24T14:46:10.708Z"
    }
}
```
### Edit Product
```http
PATCH http://localhost:3000/products/6793a7b2cd8c74f6286aabba
```
```json
{
    "product" : "PC AMD Ryzen 7, HDD 8TB", // optional
    "price" : 350000000, // optional
    "stock" : 3, // optional
    "category" : "elektronika", // optional
    "desc" : "OS Ubuntu 24.04, RAM 16GB, GPU NVIDIA GeForce GTX 1660", // optional
    "pictures" : "image.png", // max 5 files | optional
}
```
***Response Success***
```json
{
    "message" : "succeed",
    "product" : {
        "id" : "6793a7b2cd8c74f6286aabba",
        "user" : "6793a7b2cd8c74f6286aacsd", // id seller account
        "product" : "PC AMD Ryzen 7, HDD 8TB",
        "price" : 350000000,
        "stock" : 3,
        "category" : "elektronika",
        "desc" : "OS Ubuntu 24.04, RAM 16GB, GPU NVIDIA GeForce GTX 1660",
        "path" : "uploads/products/2025-01-24T14:46:10.676Z.png uploads/products/2025-01-24T14:46:10.703Z.jpeg",
        "created": "2025-01-24T14:46:10.708Z"
    }
}
```
### Delete Product
```http
DELETE http://localhost:3000/products/6793a7b2cd8c74f6286aabba
```
***Response Success***
```json
{
    "message" : "succeed",
    "deleted" : 1 
}
```
### Get Product By Id
```http
GET http://localhost:3000/products/6793a7b2cd8c74f6286aabba
```
***Response Success***
```json
{
    "message" : "succeed",
    "product" : {
        "id" : "6793a7b2cd8c74f6286aabba",
        "user" : {
            "_id" : "679ad3b6a7d11f3ba301a777",
            "name" : "example",
            "phone_number" : 0823XXXXXXXX,
            "address" : "JL damai No 20 Block D, Yogyakarta"
        }, // id vendor account
        "product" : "PC AMD Ryzen 7, HDD 8TB",
        "price" : 350000000,
        "stock" : 3,
        "category" : "elektronika",
        "desc" : "OS Ubuntu 24.04, RAM 16GB, GPU NVIDIA GeForce GTX 1660",
        "path" : "uploads/products/2025-01-24T14:46:10.676Z.png uploads/products/2025-01-24T14:46:10.703Z.jpeg",
        "created" : "2025-01-24T14:46:10.708Z"
    }
}
```
### Get All Product
```http
GET http://localhost:3000/products/
```
***Response Success***
```json
{
    "message" : "succeed",
    "count" : 1,
    "products" : [
        {
            "id" : "6793a7b2cd8c74f6286aabba",
            "user" : {
                "_id" : "679ad3b6a7d11f3ba301a777",
                "name" : "example",
                "phone_number" : 0823XXXXXXXX,
                "address" : "JL damai No 20 Block D, Yogyakarta"
                }, // id vendor account
            "product" : "PC AMD Ryzen 7, HDD 8TB",
            "price" : 350000000,
            "stock" : 3,
            "category" : "elektronika",
            "desc" : "OS Ubuntu 24.04, RAM 16GB, GPU NVIDIA GeForce GTX 1660",
            "path" : "uploads/products/2025-01-24T14:46:10.676Z.png uploads/products/2025-01-24T14:46:10.703Z.jpeg",
            "created" : "2025-01-24T14:46:10.708Z"
        }
    ]
}
```
### Get Product By Keywords
```http
POST http://localhost:3000/products/query
```
```json
{
    "keywords": "PC AMD Ryzen 7"
}
```
***Response Success***
```json
{
    "message" : "succeed",
    "count" : 1,
    "products" : [
        {
            "id" : "6793a7b2cd8c74f6286aabba",
            "user" : {
                "_id" : "679ad3b6a7d11f3ba301a777",
                "name" : "example",
                "phone_number" : 0823XXXXXXXX,
                "address" : "JL damai No 20 Block D, Yogyakarta"
            }, // id vendor account
            "product" : "PC AMD Ryzen 7, HDD 8TB",
            "price" : 350000000,
            "stock" : 3,
            "category" : "elektronika",
            "desc" : "OS Ubuntu 24.04, RAM 16GB, GPU NVIDIA GeForce GTX 1660",
            "path" : "uploads/products/2025-01-24T14:46:10.676Z.png uploads/products/2025-01-24T14:46:10.703Z.jpeg",
            "created" : "2025-01-24T14:46:10.708Z"
        }
    ]
}
```
### Get All User Products
```http
GET http://localhost:3000/products/user
```
***Response Success***
```json
{
    "message" : "succeed",
    "count" : 1,
    "products" : [
        {
            "_id" : "679ad4aba7d11f3ba301a783",
            "user" : "679ad3b6a7d11f3ba301a777",
            "product" : "PC AMD Ryzen 7, HDD 8TB",
            "price" : 350000000,
            "stock" : 3,
            "category" : "elektronika",
            "desc" : "OS Ubuntu 24.04, RAM 16GB, GPU NVIDIA GeForce GTX 1660",
            "path" : "uploads/products/2025-01-24T14:46:10.676Z.png uploads/products/2025-01-24T14:46:10.703Z.jpeg",
            "created" : "2025-01-24T14:46:10.708Z"
        }
    ]
}
```
---
## Customer Service : Example
### Create Order
```http
POST http://localhost:3000/orders
```
```json
{
    "productID" : "679ad4aba7d11f3ba301a783",
    "quantity" : 2,
}
```
***Response Success***
```json
{
    "message": "succeed",
    "ordered": {
        "_id": "679adf4b43158777e736433a",
        "product": "679ad4aba7d11f3ba301a783",
        "user": "679ad5a0f3130e639e27baa7",
        "quantity": 2,
        "created": "2025-01-30T02:09:15.432Z"
    }
}
```
### Get All Orders
```http
GET http://localhost:3000/orders/
```
***Response Success***
```json
{
    "message": "succeed",
    "count": 1,
    "orders": [
        {
            "_id": "679adf4b43158777e736433a",
            "quantity": 1,
            "order": {
                "_id": "679ad4aba7d11f3ba301a783",
                "user": "679ad3b6a7d11f3ba301a777",
                "product" : "PC AMD Ryzen 7, HDD 8TB",
                "price" : 350000000,
                "stock" : 3,
                "category" : "elektronika",
                "desc" : "OS Ubuntu 24.04, RAM 16GB, GPU NVIDIA GeForce GTX 1660",
                "path" : "uploads/products/2025-01-24T14:46:10.676Z.png uploads/products/2025-01-24T14:46:10.703Z.jpeg",
                "created" : "2025-01-24T14:46:10.708Z"
            }
        }
    ]
}
```
### Get Order by ID
```http
GET http://localhost:3000/orders/679adf4b43158777e736433a
```
***Response Success***
```json
{
    "message": "succeed",
    "order": {
        "_id": "679adf4b43158777e736433a",
        "product": {
            "_id": "679ad4aba7d11f3ba301a783",
            "product" : "PC AMD Ryzen 7, HDD 8TB",
            "price" : 350000000,
            "stock" : 3,
            "category" : "elektronika",
            "desc" : "OS Ubuntu 24.04, RAM 16GB, GPU NVIDIA GeForce GTX 1660",
            "path" : "uploads/products/2025-01-24T14:46:10.676Z.png uploads/products/2025-01-24T14:46:10.703Z.jpeg",
            "created" : "2025-01-24T14:46:10.708Z"
        },
        "quantity": 1
    }
}
```
### Delete Order By ID
```http
DELETE http://localhost:3000/orders/679adf4b43158777e736433a
```
***Response Success***
```json
{
    "message": "succeed",
    "deleted": 1
}
```
---
## Administration Service : Example
### Get All users
```http
GET http://localhost:3000/administration/users/
``` 
***Response Success***
```json
{
    "message": "succeed",
    "members": 3,
    "users": [
        {
            "_id": "67998cca991335858d31d81a",
            "email": "example1@mail.com",
            "phone_number": 0823XXXXXXXX,
            "address": "Jogjakarta",
            "role": "administration",
            "gender": "none",
            "profile_picture": "uploads/users/2025-01-29T02:04:58.616Z.png",
            "created": "2025-01-29T02:04:58.693Z"
        },
        {
            "_id": "679ad3b6a7d11f3ba301a777",
            "email": "example2@mail.com",
            "phone_number": 0823XXXXXXXX,
            "address": "Bandung",
            "role": "vendor",
            "gender": "none",
            "profile_picture": "uploads/users/2025-01-30T01:19:49.221Z.png",
            "created": "2025-01-30T01:19:50.328Z"
        },
        {
            "_id": "679ad5a0f3130e639e27baa7",
            "email": "example3@mail.com",
            "phone_number": 0823XXXXXXXX,
            "address": "Yogyakarta",
            "role": "customer",
            "gender": "none",
            "profile_picture": "uploads/users/2025-01-30T01:27:59.972Z.png",
            "created": "2025-01-30T01:28:00.307Z"
        }
    ]
}
```
### Get By ID User
```http
GET http://localhost:3000/administration/users/67998cca991335858d31d81a
```
```json
{
    "message": "succeed",
    "user": {
        "_id": "67998cca991335858d31d81a",
        "email": "example@mail.com",
        "phone_number": 0823XXXXXXXX,
        "address": "Yogyakarta",
        "role": "administration",
        "gender": "none",
        "profile_picture": "uploads/users/2025-01-29T02:04:58.616Z.png",
        "created": "2025-01-29T02:04:58.693Z"
    }
}
```
### Delete By ID User
```http
DELETE http://localhost:3000/administration/users/679ad3b6a7d11f3ba301a777
```
***Response Seccess***
```json
{
    "message": "succeed",
    "deleted": 1
}
```