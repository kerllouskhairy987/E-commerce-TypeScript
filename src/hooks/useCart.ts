// react hooks
import { useCallback, useEffect } from "react";
// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks"
// components
import actGetProductsByItems from "@/store/cart/act/actGetProductsByItems";
import { cartCleanUp, cartItemChangeQuantity, removeFromCart } from "@/store/cart/cartSlice";


const useCart = () => {
    const dispatch = useAppDispatch();
    const { loading, items, productsFullInfo, error } = useAppSelector(state => state.cart)

    useEffect(() => {
        const promise = dispatch(actGetProductsByItems())
        return () => {
            dispatch(cartCleanUp()) // to clean up productFullInfo when change route
            promise.abort()
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

    return {loading, error, cartItemsQuantity, changeQuantityHandler, removeItemHandler}
}

export default useCart