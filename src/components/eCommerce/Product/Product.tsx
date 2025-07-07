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
// styles
import styles from "./styles.module.css"
const { product, productImg, disabledBtn } = styles


const Product = memo(({ id, max, img, price, title, quantity }: IProduct) => { // cat_prefix,
    const [isDisabled, setIsDisabled] = useState(false)
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
console.log(typeof price)
    return (
        <div className={product}>
            <div className={productImg}>
                <img src={img} alt={title} />
            </div>
            <h2 title={title}>{title}</h2>
            <h3>{price.toFixed(2)} EGP</h3>
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