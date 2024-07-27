# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)

This project was bootstrapped with Fastify-CLI.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://fastify.dev/docs/latest/).

# API documentation

## Category

`GET /api/categories`
Fetch all categories from the database.

Request

- Method: GET
- URL: /api/categories

Response

- Status: 200 OK
- Body:

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

---

\
`POST /api/categories`
Add a new category to the database

Request

- Method: POST
- URL: /api/categories
- Body:

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

- Status: 201 Created
- Body:

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

---

\
`PUT /api/categories/:id`
Update an existing category in the database.

Request

- Method: PUT
- URL: /api/categories/:id
- Body:

```json
{
  "category": "string",
  "description": "string",
  "image": "string"
}
```

Response

- Status: 200 OK
- Body:

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

## Vocabulary

`GET /api/vocabularies`
Fetch all vocabularies for a given category from the database.

Request

- Method: GET
- URL: /api/vocabularies
- Query Parameters:
  - category (string, required): The category name to fetch vocabularies for.

Response

- Status: 200 OK
- Body

```json
[
  {
    "name": "string",
    "image": "string"
  }
]
```

Example

```shell
curl -X GET "http://yourserver/api/vocabularies?category=ร่างกายภายนอก"
```

Sample Response

```json
[
  {
    "name": "มือ",
    "image": "https://res.cloudinary.com/dein37xju/image/upload/v1721736805/pvosiof5bi4vn9iav0n1.jpg"
  }
]
```

---

`POST /api/vocabularies`
Add a new vocabulary to a specific category.

Request

- Method: POST
- URL: /api/vocabularies
- Body

```json
{
  "category_id": "string",
  "name": "string",
  "description": "string",
  "parts_of_speech": "string",
  "image": "string"
}
```

Response

- Status: 201 Created
- Body:

```json
{
  "_id": "string",
  "name": "string",
  "description": "string",
  "parts_of_speech": "string",
  "image": "string",
  "created_at": "string",
  "updated_at": "string"
}
```

Example

```shell
curl -X POST http://yourserver/api/vocabularies \
  -H "Content-Type: application/json" \
  -d '{
        "category_id": "669df3e8d717d3791ce19b35",
        "name": "มือ",
        "description": "อวัยวะส่วนหนึ่งของร่างกายคนที่อยู่ต่อจากปลายแขน สำหรับจับ เป็นต้น ประกอบด้วยฝ่ามือ และนิ้ว 5 นิ้ว",
        "parts_of_speech": "คำนาม",
        "image": "https://res.cloudinary.com/dein37xju/image/upload/v1721736805/pvosiof5bi4vn9iav0n1.jpg"
      }'
```

Sample Response

```json
{
  "_id": "669e90aaf463707dd671dfb0",
  "name": "มือ",
  "description": "อวัยวะส่วนหนึ่งของร่างกายคนที่อยู่ต่อจากปลายแขน สำหรับจับ เป็นต้น ประกอบด้วยฝ่ามือ และนิ้ว 5 นิ้ว",
  "parts_of_speech": "คำนาม",
  "image": "https://res.cloudinary.com/dein37xju/image/upload/v1721736805/pvosiof5bi4vn9iav0n1.jpg",
  "created_at": "2024-07-22T00:02:34.181Z",
  "updated_at": "2024-07-22T00:02:34.181Z"
}
```

---

`GET /api/vocabularies/:vocabulary_name`
Fetch a specific vocabulary by name.

Request

- Method: GET
- URL: /api/vocabularies/:vocabulary_name
- URL Parameters:
  - vocabulary_name (string, required): The name of the vocabulary to fetch.

Response

- Status: 200 OK
- Body:

```json
{
  "_id": "string",
  "name": "string",
  "description": "string",
  "parts_of_speech": "string",
  "image": "string",
  "created_at": "string",
  "updated_at": "string"
}
```

Example

````shell
curl -X PUT http://yourserver/api/vocabularies/669e90aaf463707dd671dfb0 \
  -H "Content-Type: application/json" \
  -d '{
        "name": "มือ",
        "description": "Updated description",
        "parts_of_speech": "คำนาม",
        "image": "https://res.cloudinary.com/dein37xju/image/upload/v1721736805/pvosiof5bi4vn9iav0n1.jpg"
      }'
      ```
````

Sample Response

```json
{
  "_id": "669e90aaf463707dd671dfb0",
  "name": "มือ",
  "description": "Updated description",
  "parts_of_speech": "คำนาม",
  "image": "https://res.cloudinary.com/dein37xju/image/upload/v1721736805/pvosiof5bi4vn9iav0n1.jpg",
  "created_at": "2024-07-22T00:02:34.181Z",
  "updated_at": "2024-07-22T00:02:34.181Z"
}
```

---

`GET /api/vocabularies/3d`
Fetch all 3D data for a specific vocabulary ID.

Request

- Method: GET
- URL: /api/vocabularies/3d
- Query Parameters:
  - vocabulary_id (string, required): The ID of the vocabulary to fetch 3D data for.

Response

- Status: 200 OK
- Body

```json
[
  {
    "_id": "string",
    "vocabulary_id": "string",
    "three_dim_data": "string",
    "created_at": "string",
    "updated_at": "string"
  }
]
```

Example

```shell
curl -X GET "http://yourserver/api/vocabularies/3d?vocabulary_id=669e90aaf463707dd671dfb0"
```

Sample Response

```json
[
  {
    "_id": "66a35c59b4cf7e58caad94ed",
    "vocabulary_id": "669e90aaf463707dd671dfb0",
    "three_dim_data": "base64encoded3Ddata",
    "created_at": "2024-07-22T00:02:34.181Z",
    "updated_at": "2024-07-22T00:02:34.181Z"
  }
]
```

---

`POST /api/vocabularies/3d`
Add new 3D data for a specific vocabulary ID.

Request

- Method: POST
- URL: /api/vocabularies/3d
- Body:

```json
{
  "vocabulary_id": "string",
  "three_dim_data": "string"
}
```

Response

- Status: 201 Created
- Body:

```json
{
  "_id": "string",
  "vocabulary_id": "string",
  "three_dim_data": "string",
  "created_at": "string",
  "updated_at": "string"
}
```

Example

```shell
curl -X POST http://yourserver/api/vocabularies/3d \
  -H "Content-Type: application/json" \
  -d '{
        "vocabulary_id": "669e90aaf463707dd671dfb0",
        "three_dim_data": "base64encoded3Ddata"
      }'
```

Sample Response

```json
{
  "_id": "66a35c59b4cf7e58caad94ed",
  "vocabulary_id": "669e90aaf463707dd671dfb0",
  "three_dim_data": "base64encoded3Ddata",
  "created_at": "2024-07-22T00:02:34.181Z",
  "updated_at": "2024-07-22T00:02:34.181Z"
}
```
