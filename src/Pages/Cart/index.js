import React from 'react'
import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import styles from "./styles.module.css";
import { useFavorite } from '../../Context/FavoriteContext'
import Card2 from '../../Components/Card/index2';

const Cart = () => {
  const { items, removeFromCart,addToCart } = useCart();
  const { addToFavorite, favoriteItems } = useFavorite()

  const subtotal = items.reduce((acc, obj) => acc + obj.price, 0).toFixed(1);

  return (
    <div>
      {items.length < 1 && (
        <div className="flex flex-wrap max-w-7xl mx-auto my-4">
          <div className="w-full sm:w-2/2 md:w-2/2 xl:w-5/5 p-4 h-[500px] my-auto">
            <div className={styles.cardBg}>
              <ShoppingCartIcon className="h-40 w-40 mx-auto mt-10 text-slate-700" />
              <p className="text-xl text-black font-extralight tracking-widest text-center pt-6">
                There are no products in your cart.
              </p>
              <p className="text-center text-black mt-2 font-bold tracking-wide">
                Add the products you like to the cart and buy.
              </p>
              <Link to="/">
                <div className={styles.continueButton}>
                  <button className={styles.button}>
                    <div className="flex flex-col self-center">
                      <span className={styles.buttonText}>
                        Continue Shopping
                      </span>
                    </div>
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div >
          <div >
            {items.map((item) => (
              <div key={item.id} >
                <Card2
                  item={item}
                  addToFavorite={addToFavorite}
                  isFavorite={favoriteItems.some((favItem) => favItem.id === item.id)}
                  isAddedToCart={items.some((cartItem) => cartItem.id === item.id)}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <p className="text-gray-500 text-sm mr-4">Subtotal: ${subtotal}</p>
            <button className={styles.checkoutButton}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
