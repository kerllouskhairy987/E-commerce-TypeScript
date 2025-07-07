// react hooks
import { useEffect, useState } from "react"
import Logo from "@/assets/svg/cart.svg?react"
// redux
import { useAppSelector } from "@/store/hooks"
import { getCartTotalQuantitySelector } from "@/store/cart/cartSlice"
// styles
import styles from "./styles.module.css"
const { basketContainer, basketQuantity, pumpCartQuantity } = styles

const HeaderBasket = () => {

    const [isAnimate, setIsAnimate] = useState(false);
    const totalQuantity = useAppSelector(getCartTotalQuantitySelector);
    const basketQuantityWithAnimate = `${basketQuantity} ${isAnimate ? pumpCartQuantity : ""}`

    useEffect(() => {
        if (!totalQuantity) {
            return
        }
        setIsAnimate(true);
        const debounce = setTimeout(() => {
            setIsAnimate(false);
        }, 300);

        return () => clearTimeout(debounce);
    }, [totalQuantity])

    return (
        <div className={basketContainer}>
            <Logo />
            <div className={basketQuantityWithAnimate}>{totalQuantity}</div>
        </div>
    )
}

export default HeaderBasket