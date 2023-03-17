import React, { useContext, useEffect } from "react";
import { useProduct } from "../../Context/ProductContext";
import styles from "./styles.module.css";
import Spinner from "../../Components/Spinner";
import { useParams } from "react-router-dom";
import { useCart , CartProvider} from '../../Context/CartContext'
import { useFavorite } from '../../Context/FavoriteContext'
import Card from "../../Components/Card";

const Products = () => {
  const { addToCart, items } = useCart()
  const { addToFavorite, favoriteItems } = useFavorite()

  const { productList, loading, setProductID, setCategory } = useProduct();

  const { category_id } = useParams()

  useEffect(() => {
    setCategory(category_id)
  }, [category_id])

  console.log(items)




  return (
    <div className={styles.cardGroup}>
      {!loading ? (
        productList.map((product) => {
          const findCartItem = items.find((item) => item.id === product.id)
          const findFavoriteItem = favoriteItems.find((item) => item.id === product.id)
          return (
            <Card
              item={product}
              addToFavorite={ addToFavorite}
              findFavoriteItem={ findFavoriteItem}
              addToCart={addToCart }
              findCartItem={findCartItem}
            />
          )
        })

      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Products;