# composedb-playground

This is a simple playground for experimenting with Ceramic and and ComposeDB.
It can be especially useful for building models with relations.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the Ceramic daemon:

```bash
pnpm dev
```

Build the composite (in a separate terminal)

```bash
pnpm build
```

Start the GraphQL server:

```bash
pnpm start:graphql
```

## Write models with relations

Take as example the following models:

```graphql
type Comment @loadModel(id: "[modelName:comment]") {
  id: ID!
}

type Post @loadModel(id: "[modelName:post]") {
  comments: [Comment] @relationFrom(model: "Comment", property: "postID")
}
```

When running

```bash
pnpm build
```

The relation will be fixed automatically by replacing [modelName:comment] with the actual model id of the Comment model, if there is relation that can't be resolved on the first pass, the build script will resolve each relations until all relations are resolved.

## Documentation

[ComposeDB](https://composedb.js.org/docs/0.4.x/getting-started)
