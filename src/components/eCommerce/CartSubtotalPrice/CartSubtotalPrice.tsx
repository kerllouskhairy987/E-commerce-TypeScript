import type { IProduct } from "@/interfaces";
import styles from "./styles.module.css";

interface IProps {
    products: IProduct[]
}
const CartSubtotalPrice = ({ products }: IProps) => {
    const subtotal = products.reduce((accumulator, el) => {
        const price = el.price;
        const quantity = el.quantity;
        if (quantity && typeof quantity === "number") {
            return accumulator + price * quantity;
        } else {
            return accumulator;
        }
    }, 0);
    return (
        <div className={styles.container}>
            <span>Subtotal:</span>
            <span>{subtotal.toFixed(2)} EGP</span>
        </div>
    );
}

export default CartSubtotalPrice