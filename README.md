# jochens-next.js-dinner

Website testing out next.js 13 newest features
It details jochens dinner requirements (own recipes, preferences, cant eats...)

## Tech Stack

- Next.js13 (app directory) ts
- Prisma
- NextAuth with custom providers
- TailwindCSS

## Getting Started

Add a `.env.local` file similar to the following:

```properties
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=

DATABASE_URL=
SHADOW_DATABASE_URL=

INVITED_USER_SECRET=
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[![wakatime](https://wakatime.com/badge/user/05f04551-feb7-4cf4-ba9b-92a5de5ad5a4/project/a417912f-6dab-4a9e-9d81-6dfe41cf5c2f.svg)](https://wakatime.com/badge/user/05f04551-feb7-4cf4-ba9b-92a5de5ad5a4/project/a417912f-6dab-4a9e-9d81-6dfe41cf5c2f)

## JSON Data Formats

Due to the private nature of the data, the data is not included in this repository.
The project makes use of several JSON data files when seeding the database, each of which needs to be formatted in a specific way. The expected format for each file is detailed below:

### canteats.json

Each object in the `canteats.json` array should have a `name` and an `authorId` field. The `name` represents the food item that can't be eaten, and the `authorId` is the identifier for the user associated with that preference.

```json
[
    { "name": "<food name>", "authorId": "<user id>" },
    
]
```

### likes.json

Each object in the likes.json array should have a `name`, `category`, and an `authorId` field. The name represents the food item that is liked, the category represents the category of the food, and the authorId is the identifier for the user associated with that preference.

```json

[
    {
        "name": "<food name>",
        "category": "<food category>",
        "authorId": "<user id>"
    },

]
```

### recipes.json

Each object in the recipes.json array should have the following fields: `title`, `slug`, `ingredients`, `herbs`, `image`, `steps`, and `authorId`.

```json

[
    {
        "title": "<recipe title>",
        "slug": "<recipe slug>",
        "ingredients": ["<ingredient 1>", "<ingredient 2>", ...],
        "herbs": ["<herb 1>", "<herb 2>", ...],
        "image": "<image path>",
        "steps": ["<step 1>", "<step 2>", ...],
        "authorId": "<user id>"
    },
]
```

Optional fields may include optionalIngredients.

### users.json

Each object in the users.json array should have an `id`, `name`, and `role`.

```json

[
    { "id": "<user id>", "name": "<user name>", "role": "<user role>" },
]
```

Remember to replace the data in the seed folder with your actual data.
