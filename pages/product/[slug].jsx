import React from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import data from '../../utils/data';
import Link from 'next/link';
import Image from 'next/image';
import { Store } from '../../utils/store';
import { useContext } from 'react';

import { toast } from 'react-toastify';
export default function ProcuctScreens() {
  const { query } = useRouter();
  const { slug } = query;
  const { state, dispatch } = useContext(Store);
  const product = data.products.find((x) => x.slug === slug);

  if (!product) {
    return <div>Product is not Found</div>;
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      toast.error('Sorry! product is out of stock');

      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  return (
    <Layout title={product.name}>
      <div>
        <Link href="/">Back to Product</Link>
      </div>

      <div className=" grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            height={640}
            width={640}
            layout="responsive"
          ></Image>
        </div>

        <div>
          <ul>
            <li>
              <h1 className="text-lg"> {product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description:{product.description}</li>
          </ul>
        </div>

        <div>
          <div className="card p-5">
            <div className="mb-2   flex justify-between">
              <div>Price</div>
              <div>$ {product.price}</div>
            </div>
            <div className="mb-2   flex justify-between">
              <div>Status</div>
              <div>
                {product.countInStock > 0 ? ` In stoke` : ' Unavilable'}
              </div>
            </div>
            <button
              className="  primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
