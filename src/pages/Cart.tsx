// react hooks
import { useEffect } from "react";
// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks"
// components
import Heading from "@/components/common/Heading/Heading"
import CartItemsList from "@/components/eCommerce/CartItemsList/CartItemsList";
import actGetProductsByItems from "@/store/cart/act/actGetProductsByItems";
import CartSubtotalPrice from "@/components/eCommerce/CartSubtotalPrice/CartSubtotalPrice";
import { LoadingAndErrorCart } from "@/components/feedback/LoadingAndErrorCart/LoadingAndErrorCart";

const Cart = () => {

    const dispatch = useAppDispatch();
    const { loading, items, productsFullInfo, error } = useAppSelector(state => state.cart)

    useEffect(() => {
        dispatch(actGetProductsByItems())
    }, [dispatch])
    const cartItemsQuantity = productsFullInfo.map((el) => ({ ...el, quantity: items[el.id] || 0 }))

    return (
        <>
            <Heading>Cart</Heading>
            <LoadingAndErrorCart status={loading} error={error}>
                {cartItemsQuantity.length? <>
                <CartItemsList products={cartItemsQuantity} />
                <CartSubtotalPrice products={cartItemsQuantity} />
                </>: <p className="text-info text-center">your cart is empty</p>}
            </LoadingAndErrorCart>
        </>
    )
}

export default Cart