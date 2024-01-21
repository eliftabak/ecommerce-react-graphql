import { gql } from "@apollo/client";

export const GET_PRODUCT_DETAILS_QUERY = gql`
    query GetProductDetails($productId: ID!) {
      product(productId: $productId) {
          id
          title
          image
          material
          color
          description
          release_date
        }
    }
`

export const GET_PRODUCT_PRICES_QUERY = gql`
    query GetProductPrices($productId: ID!) {
    productPrices(productId: $productId) {
        currency
        amount
    }
    }
`;

export const GET_PRODUCTS_QUERY = gql`
    query GetProducts($page: Int, $limit: Int, $search: String, $sortBy: String, $order: String, $release_date: String) {
        products(page: $page, limit: $limit, search: $search, sortBy: $sortBy, order: $order, release_date: $release_date) {
            id
            title
            image
            release_date
        }
    }
`;

export const SEARCH_PRODUCTS_QUERY = gql`
    query SearchProducts($search: String!, $sortBy: String, $order: String, $release_date: String) {
        searchProducts(search: $search, sortBy: $sortBy, order: $order, release_date: $release_date) {
            id
            title
            image
            release_date
        }
}
`;