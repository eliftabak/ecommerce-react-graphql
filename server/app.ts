import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

import resolvers from "./resolvers"
import typeDefs from "./typeDefs"

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4040 },
})

console.log(`🚀  GraphQL server ready at: ${url}`)
