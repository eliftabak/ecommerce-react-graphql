import axios from "axios";

const resolvers = {
    Query: {
        status: () => {
            return `ok @ ${new Date().toString()}`
        },
        products: async (_: unknown, { page, limit, search, sortBy, order, release_date }: { page?: number; limit?: number; search?: string; sortBy?: string; order?: string; release_date?: string }) => {
            try {
                const params = new URLSearchParams({
                    ...(page && { page: page.toString() }),
                    ...(limit && { limit: limit.toString() }),
                    ...(search && { search }),
                    ...(sortBy && { sortBy }),
                    ...(order && { order }),
                    ...(release_date && { release_date }),
                });

                const url = `https://5fa0a1cfe21bab0016dfd30f.mockapi.io/products?${params}`;
                const response = await axios.get(url);

                if (response.status !== 200) {
                    throw new Error(`Failed to fetch products - Status code: ${response.status}`);
                }

                return response.data.items;
            } catch (error) {
                console.error("Error fetching products:", error);
                throw new Error("Failed to fetch products");
            }
        },
        product: async (_: unknown, { productId }: { productId: string }) => {
            try {
                const response = await axios.get(`https://5fa0a1cfe21bab0016dfd30f.mockapi.io/products/${productId}`);  
                return response.data;
        
            } catch (error) {
                console.error("Error fetching product:", error);
                throw new Error("Failed to fetch product");
            }
        },
        
        searchProducts: async (_:unknown, { search, sortBy, order, release_date } : { search: string; sortBy?: string; order?: string; release_date?: string }) => {
            try {
                const params = new URLSearchParams({
                    title: search,
                    ...(sortBy && { sortBy }),
                    ...(order && { order }),
                    ...(release_date && { release_date }),
                });
                const url = `https://5fa0a1cfe21bab0016dfd30f.mockapi.io/products?${params.toString()}`;
                const response = await axios.get(url);
        
                if (response.status !== 200) {
                    throw new Error(`Failed to fetch products - Status code: ${response.status}`);
                }
        
                return response.data.items;
            } catch (error) {
                console.error("Error fetching products:", error);
                throw new Error("Failed to fetch products");
            }
        },      
        productPrices: async (
            _: unknown,
            { productId }: { productId: string },
        ) => {
            try {
                const response = await axios.get(
                    `https://5fa0a1cfe21bab0016dfd30f.mockapi.io/products/${productId}/prices`,
                )
                const prices = response.data

                return prices.map(
                    (priceData: { price: string; currency?: string }) => ({
                        amount: parseFloat(priceData.price),
                        currency: "EUR",
                    }),
                )
            } catch (error) {
                console.error("Error fetching product prices:", error)
                throw new Error("Failed to fetch product prices")
            }
        },
    },
};

export default resolvers;