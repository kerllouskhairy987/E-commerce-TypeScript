import type { IProduct } from "@/interfaces"
import CartItem from "../CartItems/CartItems";

interface IProps {
    products: IProduct[];
    changeQuantityHandler: (id: number, quantity: number) => void;
    removeItemHandler: (id: number) => void
}

const CartItemsList = ({ products, changeQuantityHandler, removeItemHandler }: IProps) => {
    // console.log("from cart items list", products)
    const renderCartProductsList = products.map((pro) => <CartItem key={pro.id} {...pro} changeQuantityHandler={changeQuantityHandler} removeItemHandler={removeItemHandler} />)
    return renderCartProductsList
}

export default CartItemsList