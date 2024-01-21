import React from "react"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { GET_PRODUCT_DETAILS_QUERY } from "../../../server/queries"
import { Link } from "react-router-dom"
import { ProductPrice } from "../ProductPrice"

export { ProductItem }

const ProductItem = () => {
    const navigate = useNavigate()
    const { productId } = useParams()

    const { data, loading, error } = useQuery(GET_PRODUCT_DETAILS_QUERY, {
        variables: { productId: productId },
    })

    const product = data?.product

    return (
        <div className="mb-1 lg:mb-8 lg:mx-32 lg:mt-8">
            <button
                className="border border-gray-300 px-4 py-2 rounded"
                onClick={() => navigate(-1)}
            >
                <span className="mr-1">←</span>
                <span>Go Back</span>
            </button>
            {product ? (
                <Link to={`/product/${product.id}`}>
                    <div className="flex flex-row mt-5 lg:mt-16 rounded justify-between w-3/4 bg-neutral-50 shadow-sm">
                        <img
                            className="rounded w-1/2"
                            src={`https://picsum.photos/200?random=${product.id}`}
                            alt={product.title}
                        />
                        <div className="mx-3 p-3 lg:p-10 lg:mx-6 flex flex-col items-start w-1/2 h-full">
                            <h2 className="font-bold mb-2 text-red-500 lg:mb-5">
                                {product.title}
                            </h2>
                            <div className="w-full">
                                <div className="flex flex-row justify-between">
                                    <p>Material</p>
                                    <p>{product.material}</p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p>Color</p>
                                    <p>{product.color}</p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p>Description</p>
                                    <p>{product.description}</p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p>Release Date</p>
                                    <p>{new Date(product.release_date,).toLocaleDateString()}</p>
                                </div>  
                            </div>
                            <div className="rounded bg-red-300 w-full flex justify-center mt-28">
                                <ProductPrice productId={product.id} />
                            </div>
                        </div>
                    </div>
                </Link>
            ) : (
                <>
                    {loading && !data && <p>Loading...</p>}
                    {error && !data && <p>Error loading product</p>}
                </>
            )}
        </div>
    )
}
