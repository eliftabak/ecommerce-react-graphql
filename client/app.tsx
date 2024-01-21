import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { Catalog } from "./modules/Catalog"
import React from "react"
import { ProductItem } from "./components/ProductItem"

export { App }

const GRAPHQL_URI = `http://localhost:4040`

const client = new ApolloClient({
    uri: GRAPHQL_URI,
    cache: new InMemoryCache(),
})

function App() {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Catalog />} />
                    <Route path="/product/:productId" element={<ProductItem />} />
                </Routes>
            </BrowserRouter>
        </ApolloProvider>
    )
}
