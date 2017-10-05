# Resepku Web API

Just a pretty standard mock server. This app is used for progressive web app demo.

## Endpoints

### `GET /recipes`
This endpoint is used for getting collection of recipes.

#### Query Strings

| Name   | Value Type | Default Value | Description                                                                                                                   | Example         |
|--------|------------|---------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------|
| limit  | number     | 9             | The limit number of row                                                                                                       | limit=12        |
| page   | number     | 1             | The page                                                                                                                      | page=2          |
| fields | string     | -             | If you don't need all fields of row, you can specify it explicitly. Available fields: id, title, text, image, likes, comments | fields=id,title |

Request example:
`/recipes?limit=3&fields=id,text`

The given request example will return response like this:
```json
{
    "page": 1,
    "limit": 3,
    "total": 21,
    "result": [
        {
            "id": 1,
            "title": "Larissa Schaefer"
        },
        {
            "id": 2,
            "title": "Jazmyn Ward"
        },
        {
            "id": 3,
            "title": "Asia Jenkins"
        }
    ],
    "nextPage": 2,
    "prevPage": null
}
```

### `GET /recipes/:id`
This endpoint is used for getting data of specific recipe.

### Url Params

| Name | Value Type | Description               |
|------|------------|---------------------------|
| id   | number     | The id of specific recipe |

### Query strings
| Name   | Value Type | Default Vaue | Description                                                                                                                   | Example              |
|--------|------------|--------------|-------------------------------------------------------------------------------------------------------------------------------|----------------------|
| fields | string     | -            | If you don't need all fields of row, you can specify it explicitly. Available fields: id, title, text, image, likes, comments | fields=id,title,text |

Request example:
`GET /recipes/12?fields=id,title,text`

Will return response:

```json
{
    "id": 12,
    "title": "Bridgette Hayes II",
    "text": "Tenetur sequi doloribus provident non et dignissimos nihil cupiditate quis. Eius consequatur et deserunt aut sed voluptas delectus fuga non. Consequatur labore expedita nisi quia sit et. Ut quasi est laudantium aperiam qui quia est.\n \rMolestiae exercitationem praesentium eos mollitia eius ut nostrum doloremque iure. A ullam aut voluptas consequatur omnis est aut. Ipsa occaecati commodi. Aut molestiae sint voluptatem blanditiis voluptatibus animi ipsam nulla id.\n \rDistinctio impedit voluptas et aliquam natus. Nihil asperiores ut quae rerum nostrum non est. Ea molestiae excepturi id repellendus ea iure rem. Mollitia quod sint mollitia velit hic debitis recusandae quis doloremque. Omnis eos maiores eos consequuntur nulla iure qui. Officia illum maiores corporis dolores esse rerum velit accusamus."
}
```

### `POST /recipes/:id/likes`
When You want to bump the count of specific recipe's likes, use this endpoint to achieve that. The response will be the data of the recipe

### Url Params

| Name | Value Type | Description               |
|------|------------|---------------------------|
| id   | number     | The id of specific recipe |

Request example:

`POST /recipes/14/likes`

The response will be like:

```json
{
    "id": 12,
    "title": "Bridgette Hayes II",
    "text": "Tenetur sequi doloribus provident non et dignissimos nihil cupiditate quis. Eius consequatur et deserunt aut sed voluptas delectus fuga non. Consequatur labore expedita nisi quia sit et. Ut quasi est laudantium aperiam qui quia est.\n \rMolestiae exercitationem praesentium eos mollitia eius ut nostrum doloremque iure. A ullam aut voluptas consequatur omnis est aut. Ipsa occaecati commodi. Aut molestiae sint voluptatem blanditiis voluptatibus animi ipsam nulla id.\n \rDistinctio impedit voluptas et aliquam natus. Nihil asperiores ut quae rerum nostrum non est. Ea molestiae excepturi id repellendus ea iure rem. Mollitia quod sint mollitia velit hic debitis recusandae quis doloremque. Omnis eos maiores eos consequuntur nulla iure qui. Officia illum maiores corporis dolores esse rerum velit accusamus.",
    "image": "http://lorempixel.com/640/480/food",
    "likes": 1,
    "comments": []
}
```

### `POST /recipes/:id/comments`
Use this endpoint to give comment to specific recipe.

### Url Params

| Name | Value Type | Description               |
|------|------------|---------------------------|
| id   | number     | The id of specific recipe |

### Body
| Name    | Value Type | Description                                                      |
|---------|------------|------------------------------------------------------------------|
| message | string     | The length of the message string should be at least 4 characters |
