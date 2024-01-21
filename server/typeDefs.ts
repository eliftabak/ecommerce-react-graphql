const typeDefs = `#graphql
type Product {
    id: ID!
    title: String
    image: String
    material: String
    color: String
    description: String
    release_date: String
}

type Price {
    currency: String
    amount: Float
}

type Query {
    status: String
    products(page: Int, limit: Int, search: String, sortBy: String, order: String, release_date: String): [Product]
    product(productId: ID!): Product
    productPrices(productId: ID!): [Price]
    searchProducts(search: String!, sortBy: String, order: String, release_date: String): [Product]
}
`;

export default typeDefs;