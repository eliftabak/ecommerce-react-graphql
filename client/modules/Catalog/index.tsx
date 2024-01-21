import React, { useState, useCallback } from "react"
import { useQuery } from "@apollo/client"
import { ProductPrice } from "../../components/ProductPrice"
import debounce from "lodash.debounce"
import { Link } from "react-router-dom"
import SearchBar from "../../components/SearchBar"
import SortDropdown from "../../components/SortDropdown"
import { IProduct } from "./index.d"
import {
    GET_PRODUCTS_QUERY,
    SEARCH_PRODUCTS_QUERY,
} from "../../../server/queries"

export { Catalog }

const SORT_OPTIONS = [
    { value: "title-asc", label: "Title (A-Z)" },
    { value: "title-desc", label: "Title (Z-A)" },
    { value: "release_date-asc", label: "Release Date (Newest First)" },
    { value: "release_date-desc", label: "Release Date (Oldest First)" },
]
const Catalog = () => {
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [sort, setSort] = useState("")

    const debouncedSetSearch = useCallback(
        debounce((searchValue) => {
            setDebouncedSearch(searchValue)
        }, 500),
        [],
    )

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
        debouncedSetSearch(event.target.value)
    }

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(event.target.value)
    }

    const { loading, error, data } = useQuery(
        debouncedSearch ? SEARCH_PRODUCTS_QUERY : GET_PRODUCTS_QUERY,
        {
            variables: debouncedSearch
                ? {
                      search: debouncedSearch,
                      sortBy: sort.split("-")[0],
                      order: sort.split("-")[1],
                  }
                : {
                      page: 1,
                      limit: 10,
                      sortBy: sort.split("-")[0],
                      order: sort.split("-")[1],
                  },
        },
    )

    const productsToDisplay: IProduct[] = debouncedSearch
        ? data?.searchProducts
        : data?.products

    return (
        <div className="m-3">
            <div className="flex justify-between mb-1 lg:mb-8 lg:mx-32">
                <h1 className="text-2xl font-sans">Products</h1>
                <div className="flex">
                    <SearchBar value={search} onChange={handleSearchChange} />
                    <SortDropdown
                        value={sort}
                        onChange={handleSortChange}
                        options={SORT_OPTIONS}
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-2 lg:gap-6 justify-center">
                {productsToDisplay && productsToDisplay.length > 0 ? (
                    productsToDisplay.map((product: IProduct) => (
                        <div key={product.id} className="bg-gray-200 rounded-sm w-1/5 shadow-md">
                            <Link to={`/product/${product.id}`}>
                                <img
                                    className="rounded-sm w-full h-auto"
                                    src={`https://picsum.photos/200?random=${product.id}`}
                                    alt={product.title}
                                />
                                <div className="m-3 lg:m-6 flex flex-col items-start">
                                    <h2 className="font-bold mb-2 text-red-500">{product.title}</h2>
                                    <p>
                                        Release Date:{" "}
                                        {new Date(
                                            product.release_date,
                                        ).toLocaleDateString()}
                                    </p>
                                    <ProductPrice productId={product.id} />
                                </div>
                            </Link>
                        </div>
                    ))
                ) : loading ? (
                    <p>Loading...</p>
                ) : (
                    error && <p>Error: {error.message}</p>
                )}
            </div>
        </div>
    )
}
