import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useParams } from "react-router"
// components
import { productsCleanUp } from "@/store/products/productsSlice"
// bootstrap component
import actGetProductsByCatPrefix from "@/store/products/act/actGetProductsByCatPrefix"

const useProducts = () => {

    const { prefix } = useParams()
    const dispatch = useAppDispatch()

    const { loading, records, error } = useAppSelector(state => state.products)

    const wishlistItemId = useAppSelector(state => state.wishlist.itemsId)

    const userAccess = useAppSelector(state => state.auth.accessToken)

    const cartItems = useAppSelector(state => state.cart.items)

    const productsFullInfo = records.map((el) => ({
        ...el,
        quantity: cartItems[el.id] || 0,
        isLiked: wishlistItemId.includes(el.id),
        isAuthenticated: userAccess ? true : false,
    }))

    useEffect(() => {
        const promise = dispatch(actGetProductsByCatPrefix(`${prefix}`))
        return () => {
            dispatch(productsCleanUp())
            promise.abort()
        }
    }, [dispatch, prefix])

    return { loading, error, productsFullInfo, prefix }
}

export default useProducts