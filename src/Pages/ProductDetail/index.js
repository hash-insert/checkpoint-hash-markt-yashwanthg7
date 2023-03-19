import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartIcon, HeartIcon, StarIcon } from "@heroicons/react/solid";
import Spinner from "../../Components/Spinner";
import { useProduct } from "../../Context/ProductContext";
import { useCart } from "../../Context/CartContext";
import { useFavorite } from "../../Context/FavoriteContext";
import styles from "./styles.module.css";
import styled from "styled-components";
import { Container } from "postcss";

const StyledConatiner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
  width: 100%;
  margin-left: 30px;
`

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 10px;
  max-width: 700px;
`
const Title = styled.p`
font-size: 20px;
font-weight: bolder;
margin-bottom: 0px;
`
const FooterContainer = styled.div`
 display: flex;
 flex-direction: row;
 margin-top: 20px;
 justify-content: space-between;
`
const StyledButton = styled.button`
  background-color: ${(props) => props.color ? "red" : "yellow"};
  color: black;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  width: 100%;
  height: 30px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  margin-right: 20px;
`;

const Imagediv = styled.div`
 margin: none;
 padding: none;
`


const ProductDetail = () => {

  /**
   * Hints:
   * 1. Get addToCart, items, addToFavorite, favoriteItems from useCart and useFavorite
   * 2. Get product, loading, setProductID from useProduct
   * 3. Get product_id from useParams
   * 4. Call setProductID with product_id as argument
   * 5. Use the product object to display the product details
   * 6. Use the findCartItem and findFavoriteItem to check if the product is in the cart or favorite
   * 7. Use the addToCart and addToFavorite functions to add the product to the cart or favorite
   */

  const { addToCart, items } = useCart();

  const { addToFavorite, favoriteItems } = useFavorite();

  const { product, loading, setProductID } = useProduct();

  const { product_id } = useParams();



  useEffect(() => {
    setProductID(product_id);
  }, [product_id]);



  const findCartItem = items.find((item) => item.id === product.id)
  const findFavoriteItem = favoriteItems.find((item) => item.id === product.id)



  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <StyledConatiner >

          <img className={styles.image} src={product.image} alt="" />

          <ProductDetails>
            BRAND
            <Title>{product.title}</Title>

            <div className={styles.rating} title={product.rating.rate}>
              {[...Array(Math.round(product.rating.rate))].map((e, i) => (
                <StarIcon
                  key={`star-${i}`}
                  className={styles.starIcon}
                  aria-hidden="true"
                />
              ))}
              {[...Array(5 - Math.round(product.rating.rate))].map((e, i) => (
                <StarIcon
                  key={`empty-star-${i}`}
                  className={styles.emptyStarIcon}
                  aria-hidden="true"
                />
              ))}
              <p className="text-xs ml-1 font-light mt-0.5">
                ({product.rating.count})
              </p>
            </div>

            <p className={styles.description}>{product.description}</p>

            <hr
              style={{
                color: "white",
                backgroundColor: "white",
                height: 2,
                marginTop: 20
              }}
            />
            <FooterContainer>
              <div style={{
                color: "yellow",
                fontSize: "30px"
              }}>
                <p>$ {product.price}</p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}>
                <StyledButton onClick={() => addToCart(product, findCartItem)} color={findCartItem} >
                  <ShoppingCartIcon
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col self-center">
                    <span className={styles.buttonText}>
                      {findCartItem ? "Remove from cart" : "Add to Cart"}
                    </span>
                  </div>
                </StyledButton>


                <button
                  className={
                    !findFavoriteItem ? styles.favButton : styles.removeFavButton
                  }
                  onClick={() => {
                    addToFavorite(product, findFavoriteItem)
                  }}
                >
                  <HeartIcon className={styles.heartIcon} />
                </button>

              </div>
            </FooterContainer>
          </ProductDetails>
        </StyledConatiner>
      )}
    </>
  );

};

export default ProductDetail;
