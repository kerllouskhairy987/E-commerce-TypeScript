// react hooks
import { memo, useState } from "react"
// redux
import { useAppDispatch } from "@/store/hooks"
// actions
import { addToCart } from "@/store/cart/cartSlice"
// react bootstrap component
import { Button, Spinner } from "react-bootstrap"
// interfaces and types
import type { IProduct } from "@/interfaces"
// logo
import Like from "@/assets/svg/like.svg?react";
import LikeFill from "@/assets/svg/like-fill.svg?react";
// styles
import styles from "./styles.module.css"
import actGetWishlist from "@/store/wishlist/act/actLikeToggle"
const { product, productImg, disabledBtn, wishlistBtn } = styles


const Product = memo(({ id, max, img, price, title, quantity, isLiked }: IProduct) => { // cat_prefix,
    const [isDisabled, setIsDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const disabledBtnAnimate = `${isDisabled ? disabledBtn : ""}`
    const currentRemainingQuantity = max ? max - (quantity ?? 0) : 0;
    const quantityRetchToMax = currentRemainingQuantity === 0;
    const quantityRetchToMaxStyle = `${disabledBtnAnimate} ${quantityRetchToMax ? "bg-danger not-allowed" : ""}`


    const addToCartHandler = () => {
        setIsDisabled(true)
        dispatch(addToCart(id))

        const debounce = setTimeout(() => {
            setIsDisabled(false)
        }, 300)

        return () => clearTimeout(debounce)
    }
    const likeToggle = () => {
        if(isLoading) return;
        setIsLoading(true)
        dispatch(actGetWishlist(id)).unwrap()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false))
    }
    return (
        <div className={product}>
            <div className={wishlistBtn} onClick={likeToggle}>
                {isLoading ? <Spinner animation="border" size="sm" variant="primary" /> : isLiked ? <LikeFill /> : <Like />}
            </div>

            <div className={productImg}>
                <img src={img} alt={title} />
            </div>
            <h2 title={title}>{title}</h2>
            <h3>{Number(price).toFixed(2)} EGP</h3>
            <p>
                {currentRemainingQuantity > 0 ? (
                    <>
                        you can add <span className="text-info"> {currentRemainingQuantity}</span> items
                    </>
                ) : (
                    <span className="text-danger">out of stock</span>
                )}
            </p>

            <Button disabled={isDisabled || quantityRetchToMax} variant="info" style={{ color: "white", whiteSpace: "nowrap" }} onClick={addToCartHandler} className={quantityRetchToMaxStyle}>
                {isDisabled ? <><Spinner animation="border" size="sm" /> Loading ...</> : quantityRetchToMax ? "out of stock" : "add to cart"}
            </Button>
        </div>
    )
})

export default Product