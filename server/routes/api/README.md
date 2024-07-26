# API documentation

`GET /api/categories`
Description
Fetch all categories from the database.

Request
Method: GET
URL: /api/categories

Response
Status: 200 OK
Body:

```json
[
  {
    "category": "string",
    "image": "string"
  }
]
```

Example

```shell
curl -X GET http://yourserver/api/categories
```

Sample Response

```json
[
  {
    "category": "ร่างกายภายนอก",
    "image": "https://res.cloudinary.com/dein37xju/image/upload/v1721748099/b99ulafyqmoyvx1ppiya.jpg",
    "vocabularies": [
      {
        "_id": "669e90aaf463707dd671dfb0",
        "name": "มือ",
        "description": "อวัยวะส่วนหนึ่งของร่างกายคนที่อยู่ต่อจากปลายแขน สำหรับจับ เป็นต้น ประกอบด้วยฝ่ามือ และนิ้ว 5 นิ้ว",
        "parts_of_speech": "คำนาม",
        "image": "https://res.cloudinary.com/dein37xju/image/upload/v1721736805/pvosiof5bi4vn9iav0n1.jpg",
        "created_at": "2024-07-22T00:02:34.181Z",
        "updated_at": "2024-07-22T00:02:34.181Z"
      }
    ],
    "created_at": "2024-07-22T00:00:24.855Z",
    "updated_at": "2024-07-23T00:00:09.869Z"
  }
]
```

`POST /api/categories`
Description
Add a new category to the database

Request
Method: POST
URL: /api/categories
Body:

```json
{
  "category": "string",
  "image": "string",
  "vocabularies": [
    {
      "name": "string",
      "description": "string",
      "parts_of_speech": "string",
      "image": "string",
      "created_at": "string",
      "updated_at": "string"
    }
  ]
}
```

Response
Status: 201 Created
Body:

```json
{
  "_id": "string",
  "category": "string",
  "image": "string",
  "vocabularies": [
    {
      "_id": "string",
      "name": "string",
      "description": "string",
      "parts_of_speech": "string",
      "image": "string",
      "created_at": "string",
      "updated_at": "string"
    }
  ],
  "created_at": "string",
  "updated_at": "string"
}
```

Example

```shell
curl -X POST http://yourserver/api/categories \
  -H "Content-Type: application/json" \
  -d '{
        "category": "ร่างกายภายนอก",
        "image": "https://res.cloudinary.com/dein37xju/image/upload/v1721748099/b99ulafyqmoyvx1ppiya.jpg",
        "vocabularies": [
          {
            "name": "มือ",
            "description": "อวัยวะส่วนหนึ่งของร่างกายคนที่อยู่ต่อจากปลายแขน สำหรับจับ เป็นต้น ประกอบด้วยฝ่ามือ และนิ้ว 5 นิ้ว",
            "parts_of_speech": "คำนาม",
            "image": "https://res.cloudinary.com/dein37xju/image/upload/v1721736805/pvosiof5bi4vn9iav0n1.jpg",
            "created_at": "2024-07-22T00:02:34.181Z",
            "updated_at": "2024-07-22T00:02:34.181Z"
          }
        ]
      }'

```

Sample Response

```json
{
  "_id": "669df3e8d717d3791ce19b35",
  "category": "ร่างกายภายนอก",
  "image": "https://res.cloudinary.com/dein37xju/image/upload/v1721748099/b99ulafyqmoyvx1ppiya.jpg",
  "vocabularies": [
    {
      "_id": "669e90aaf463707dd671dfb0",
      "name": "มือ",
      "description": "อวัยวะส่วนหนึ่งของร่างกายคนที่อยู่ต่อจากปลายแขน สำหรับจับ เป็นต้น ประกอบด้วยฝ่ามือ และนิ้ว 5 นิ้ว",
      "parts_of_speech": "คำนาม",
      "image": "https://res.cloudinary.com/dein37xju/image/upload/v1721736805/pvosiof5bi4vn9iav0n1.jpg",
      "created_at": "2024-07-22T00:02:34.181Z",
      "updated_at": "2024-07-22T00:02:34.181Z"
    }
  ],
  "created_at": "2024-07-22T00:00:24.855Z",
  "updated_at": "2024-07-23T00:00:09.869Z"
}
```

`PUT /api/categories/:id`
Description
Update an existing category in the database.
Request
Method: PUT
URL: /api/categories/:id
Body:

```json
{
  "category": "string",
  "description": "string",
  "image": "string"
}
```

Response
Status: 200 OK
Body:

```json
{
  "_id": "string",
  "category": "string",
  "image": "string",
  "vocabularies": [
    {
      "_id": "string",
      "name": "string",
      "description": "string",
      "parts_of_speech": "string",
      "image": "string",
      "created_at": "string",
      "updated_at": "string"
    }
  ],
  "created_at": "string",
  "updated_at": "string"
}
```

Example

```shell
curl -X PUT http://yourserver/api/categories/669df3e8d717d3791ce19b35 \
  -H "Content-Type: application/json" \
  -d '{
        "category": "ร่างกายภายนอก",
        "description": "Description updated",
        "image": "https://res.cloudinary.com/dein37xju/image/upload/v1721748099/b99ulafyqmoyvx1ppiya.jpg"
      }'

```

Sample Response

```json
{
  "_id": "669df3e8d717d3791ce19b35",
  "category": "ร่างกายภายนอก",
  "image": "https://res.cloudinary.com/dein37xju/image/upload/v1721748099/b99ulafyqmoyvx1ppiya.jpg",
  "vocabularies": [
    {
      "_id": "669e90aaf463707dd671dfb0",
      "name": "มือ",
      "description": "อวัยวะส่วนหนึ่งของร่างกายคนที่อยู่ต่อจากปลายแขน สำหรับจับ เป็นต้น ประกอบด้วยฝ่ามือ และนิ้ว 5 นิ้ว",
      "parts_of_speech": "คำนาม",
      "image": "https://res.cloudinary.com/dein37xju/image/upload/v1721736805/pvosiof5bi4vn9iav0n1.jpg",
      "created_at": "2024-07-22T00:02:34.181Z",
      "updated_at": "2024-07-22T00:02:34.181Z"
    }
  ],
  "created_at": "2024-07-22T00:00:24.855Z",
  "updated_at": "2024-07-23T00:00:09.869Z"
}
```
