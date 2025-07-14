// react hooks
import { memo, useState } from "react"
// redux
import { useAppDispatch } from "@/store/hooks"
// actions
import { addToCart } from "@/store/cart/cartSlice"
// react bootstrap component
import { Button, Modal, Spinner } from "react-bootstrap"
// components
import ProductInfo from "../ProductInfo/ProductInfo"
// interfaces and types
import type { IProduct } from "@/interfaces"
// logo
import Like from "@/assets/svg/like.svg?react";
import LikeFill from "@/assets/svg/like-fill.svg?react";
// styles
import styles from "./styles.module.css"
import actGetWishlist from "@/store/wishlist/act/actLikeToggle"
const { disabledBtn, wishlistBtn } = styles


const Product = memo(({ id, max, img, price, title, quantity, isLiked, isAuthenticated }: IProduct) => { // cat_prefix,
    const [isDisabled, setIsDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const dispatch = useAppDispatch();

    const handleClose = () => setShow(false);

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
        if (isLoading) return;
        if (isAuthenticated) {
            setIsLoading(true)
            dispatch(actGetWishlist(id)).unwrap()
                .then(() => setIsLoading(false))
                .catch(() => setIsLoading(false))
        } else {
            setShow(true);
        }

    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you must login first!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <ProductInfo title={title} img={img} price={price} direction="row">
                <div className={wishlistBtn} onClick={likeToggle}>
                    {isLoading ? <Spinner animation="border" size="sm" variant="primary" /> : isLiked ? <LikeFill /> : <Like />}
                </div>

                <p>
                    {currentRemainingQuantity > 0 ? (
                        <>
                            you can add <span className="text-info"> {currentRemainingQuantity}</span> items
                        </>
                    ) : (
                        <span className="text-danger">out of stock</span>
                    )}
                </p>

                <Button disabled={isDisabled || quantityRetchToMax} variant="info" style={{ color: "white", whiteSpace: "nowrap", width: "100%" }} onClick={addToCartHandler} className={quantityRetchToMaxStyle}>
                    {isDisabled ? <><Spinner animation="border" size="sm" /> Loading ...</> : quantityRetchToMax ? "out of stock" : "add to cart"}
                </Button>
            </ProductInfo>
        </>
    )
})

export default Product