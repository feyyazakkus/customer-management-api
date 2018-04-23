# Customer Management APP
![Build Status](https://travis-ci.org/feyyazakkus/customer-management-api.svg?branch=master)
API Service for Customer Management App

API Url: https://customer-management-api.herokuapp.com/api

## API End Points

* Get all customers : `GET /api/customers/`

* Get one customer : `GET /api/customers/:id`

* Add new customer : `POST /api/customers/`

**POST Data example**
```json
{
    "name": {
        "first": "test",
        "last": "user"
    },
    "birthday": "1990-02-20",
    "gender": "m"
}
```

* Update customer : `PUT /api/customers/:id`
* Delete customer : `DELETE /api/customers/:id`