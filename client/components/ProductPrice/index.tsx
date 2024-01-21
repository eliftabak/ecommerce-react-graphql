import React, { FC } from 'react';
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_PRICES_QUERY } from '../../../server/queries';

export { ProductPrice }

type ProductDetailsProps = {
  productId: string;
};

type Price = {
  currency: string;
  amount: number;
};

const ProductPrice: FC<ProductDetailsProps> = ({ productId }) => {
    const { loading, error, data } = useQuery(GET_PRODUCT_PRICES_QUERY, {
        variables: { productId },
    });

    return (
        <div>
          {data && data.productPrices.map((price: Price) => (
            <p key={price.currency}>Price: {price.amount} {price.currency}</p>
          ))}
          {loading && !data && <p>Loading...</p>}
          {error && !data && <p>Error loading prices</p>}
        </div>
    );
}

