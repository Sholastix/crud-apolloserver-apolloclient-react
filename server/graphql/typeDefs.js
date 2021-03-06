const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type Product {
    _id: ID!
    name: String!
    price: Float!
    createdAt: Date!
    updatedAt: Date!
  }

  type DeleteResponse {
    _id: ID!
    result: Boolean!
  }

  type RootQuery {
    getProducts: [Product!]!
    getProduct(_id: ID!): Product!
  }

  type RootMutation {
    createProduct(name: String!, price: Float!): Product!
    updateProduct(_id: ID!, name: String!, price: Float!): Product!
    deleteProduct(_id: ID!): DeleteResponse!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`

module.exports = {
  typeDefs,
}