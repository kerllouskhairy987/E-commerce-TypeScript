import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import actGetWishlist from '@/store/wishlist/act/actGetWishlist'
import { wishlistCleanUp } from '@/store/wishlist/wishlistSlice'

const useWishlist = () => {
    const dispatch = useAppDispatch()
    const { loading, productsFullInfo, error } = useAppSelector(state => state.wishlist)
    const cartItems = useAppSelector((state) => state.cart.items);

    useEffect(() => {
        const promise = dispatch(actGetWishlist("productsFullInfo"));
        return () => {
            promise.abort();
            dispatch(wishlistCleanUp());
        };
    }, [dispatch]);

    const records = productsFullInfo.map((el) => ({
        ...el,
        quantity: cartItems[el.id],
        isLiked: true,
        isAuthenticated: true
    }));
    return { loading, error, records }
}

export default useWishlist