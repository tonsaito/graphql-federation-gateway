# graphql-federation-gateway
Simple Application to test Apollo Federation

### How to run book service

```sh
$ node ./book-service/server.js
```

### Open the playground on browser

http://localhost:9001

### Use the following Query

```typescript
query{
  library{
    id
    title
    author
  }
}
```

### How to run stock service

```sh
$ node ./stock-service/server.js
```

### Open the playground on browser

http://localhost:9002

### Use the following Query


```typescript
query{
  stock{
    bookId
    price
    inStock
  }
}
```

### How to run gateway (book and stock services must be up and running)

```sh
$ node gateway.js
```

### Open the playground on browser

http://localhost:9000

### Use the following Query


```typescript
query{
  library{
    id
    title
    author
    stock{
      bookId
      price
      inStock
    }
  }
}
```
