// redux
import { useAppSelector } from '@/store/hooks'
import { getCartTotalQuantitySelector } from '@/store/cart/selector'
// components
import HeaderCounter from '../HeaderCounter'
// Logo
import CartIcon from "@/assets/svg/cart.svg?react"
import WishlistIcon from "@/assets/svg/wishlist.svg?react"



const HeaderLeftBar = () => {
    const cartTotalQuantity = useAppSelector(getCartTotalQuantitySelector);
    const wishlistTotalQuantity = useAppSelector(state => state.wishlist.itemsId.length);

    return (
        <div className='d-flex'>

            <div style={{ marginRight: "10px", paddingRight: "10px", borderRight: "1px solid black" }}>
                <HeaderCounter to="wishlist" svgIcon={<WishlistIcon title="wishlist" />} totalQuantity={wishlistTotalQuantity} title="wishlist" />
            </div>
            <HeaderCounter to="cart" svgIcon={<CartIcon title="cart" />} totalQuantity={cartTotalQuantity} title="cart" />
        </div>
    )
}

export default HeaderLeftBar