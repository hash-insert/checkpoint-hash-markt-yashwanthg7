import styles from './styles.module.css'
import { StarIcon, ShoppingCartIcon, HeartIcon, TrashIcon} from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import { useCart } from "../../Context/CartContext";

const Card2 = ({
    item,
    addToFavorite,
    findFavoriteItem

}) => {
    const {removeFromCart } = useCart();

    return (
        <div key={`${item.id}-item`} className={styles.card} title={item.title}>
            <div className={styles.cardLink}>
                <button
                    className={
                        !findFavoriteItem ? styles.favButton : styles.removeFavButton
                    }
                    onClick={() => {
                        addToFavorite(item, findFavoriteItem)
                    }}
                >
                    <HeartIcon className={styles.heartIcon} />
                </button>
                <Link to={`/product/${item.id}`}>
                    <div className={styles.cardHeader}>
                        <img className={styles.cardImg} src={item.image} alt="" />
                    </div>
                </Link>
                <div className={styles.cardBody}>
                    <div>
                        <p className={styles.cardTitle} title={item.title}>
                            <span className={styles.brand} title="Brand">
                                Brand,
                            </span>{" "}
                            {item.title}
                        </p>
                    </div>
                    <div className={styles.rating} title={item.rating.rate}>
                        {[...Array(Math.round(item.rating.rate))].map((e, i) => (
                            <StarIcon
                                key={`star-${i}`}
                                className={styles.starIcon}
                                aria-hidden="true"
                            />
                        ))}
                        {[...Array(5 - Math.round(item.rating.rate))].map((e, i) => (
                            <StarIcon
                                key={`empty-star-${i}`}
                                className={styles.emptyStarIcon}
                                aria-hidden="true"
                            />
                        ))}
                        <p className="text-xs ml-1 font-light mt-0.5">
                            ({item.rating.count})
                        </p>
                    </div>
                    <div>
                        <div className="my-auto" title={`$${item.price}`}>
                            <span className={styles.priceSub}>$</span>
                            <span className={styles.priceTop}>{Math.trunc(item.price)}</span>
                            {parseInt((item.price % 1).toFixed(2).substring(2)) !== 0 ? (
                                <span className={styles.priceSub}>
                                    {parseInt((item.price % 1).toFixed(2).substring(2))}
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    
                    <button className={styles.removeButton} onClick={() => removeFromCart(item.id)}>
                        <TrashIcon className="h-4 w-4 mr-1" />
                        Remove
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card2