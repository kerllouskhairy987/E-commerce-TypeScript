import type { IProduct } from "@/interfaces"
import CartItem from "../CartItems/CartItems";

interface IProps {
    products: IProduct[];
}

const CartItemsList = ({ products }: IProps) => {
    // console.log("from cart items list", products)
    const renderCartProductsList = products.map((pro) => <CartItem key={pro.id} {...pro} />)
    return renderCartProductsList
}

export default CartItemsList