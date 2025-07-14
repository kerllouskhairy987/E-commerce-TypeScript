// react hooks
import { useCallback, useEffect } from "react";
// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { cartCleanUp, cartItemChangeQuantity, removeFromCart } from "@/store/cart/cartSlice";
// components
import actGetProductsByItems from "@/store/cart/act/actGetProductsByItems";
import { resetOrderStatus } from "@/store/order/orderSlice";


const useCart = () => {
    const dispatch = useAppDispatch();
    const { loading, items, productsFullInfo, error } = useAppSelector(state => state.cart)
    const userAccessToken = useAppSelector(state => state.auth.accessToken)
    const placeOrderStatus = useAppSelector(state => state.order.loading);

    useEffect(() => {
        const promise = dispatch(actGetProductsByItems())

        return () => {
            promise.abort()
            dispatch(cartCleanUp()) // to clean up productFullInfo when change route
            dispatch(resetOrderStatus())
        }
    }, [dispatch])
    const cartItemsQuantity = productsFullInfo.map((el) => ({ ...el, quantity: items[el.id] || 0 }))

    // handlers
    const changeQuantityHandler = useCallback((id: number, quantity: number) => {
        dispatch(cartItemChangeQuantity({ id, quantity }));
    }, [dispatch])

    const removeItemHandler = useCallback((id: number) => {
        dispatch(removeFromCart(id));
    }, [dispatch])

    return { loading, error, cartItemsQuantity, placeOrderStatus, changeQuantityHandler, removeItemHandler, userAccessToken }
}

export default useCart