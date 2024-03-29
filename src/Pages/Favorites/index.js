import React from 'react'
import { Link } from 'react-router-dom'
import { HeartIcon } from '@heroicons/react/outline'
import styles from './styles.module.css'
import { useFavorite } from '../../Context/FavoriteContext'
import { useCart } from '../../Context/CartContext'
import Card3 from '../../Components/Card/index3';

const Favorites = () => {
  const { favoriteItems, addToFavorite } = useFavorite()
  const { addToCart, items } = useCart()

  return (
    <div>
      {favoriteItems.length < 1 && (
        <div className="flex flex-wrap max-w-7xl mx-auto my-4">
          <div className="w-full sm:w-2/2 md:w-2/2 xl:w-5/5 p-4 h-[500px] my-auto">
            <div className={styles.cardBg}>
              <HeartIcon className="h-40 w-40 mx-auto mt-10 text-red-500" />
              <p className="text-xl font-extralight text-black tracking-widest text-center pt-6">
                There is no product in your favorites.
              </p>
              <p className="text-center mt-2 font-bold text-black tracking-wide">
                Add the products you like to your favorites to buy them later.
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

      {favoriteItems.length > 0 && (
        <div  >
          {favoriteItems.map((item) => (
            <div key={item.id} >
              <Card3
                item={item}
                addToCart={addToCart}
                addToFavorite={addToFavorite}
                isFavorite={favoriteItems.some((favItem) => favItem.id === item.id)}
                isAddedToCart={items.some((cartItem) => cartItem.id === item.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
