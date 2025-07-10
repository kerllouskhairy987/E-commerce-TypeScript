// react hooks
import { memo, useCallback } from "react";
// bootstrap
import { Form, Button } from "react-bootstrap";
// interfaces and types
import type { IProduct } from "@/interfaces";

import styles from "./styles.module.css";
const { cartItem, product, productImg, productInfo, cartItemSelection } = styles;


type IProps = IProduct & {
    changeQuantityHandler: (id: number, quantity: number) => void;
    removeItemHandler: (id: number) => void;
}

const CartItem = memo(({ id, img, price, title, max, quantity, changeQuantityHandler, removeItemHandler }: IProps) => {

    // handlers
    const changeQuantity = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const quantity = Number(e.target.value);
        changeQuantityHandler(id, quantity);
    }, [id, changeQuantityHandler])

    // render option list
    const renderCartOptions = Array.from({ length: max ?? 0 }, (_, index) => {
        const optionNum = index + 1;
        return <option key={optionNum}>{optionNum}</option>;
    });

    return (
        <div className={cartItem}>
            <div className={product}>
                <div className={productImg}>
                    <img src={img} alt={title} />
                </div>
                <div className={productInfo}>
                    <h2 title={title}>{title}</h2>
                    <h3>{Number(price).toFixed(2)} EGP</h3>
                    <Button variant="secondary" style={{ color: "white", width: "fit-content" }} className="mt-auto" onClick={() => removeItemHandler(id)} > Remove </Button>
                </div>
            </div>

            <div className={cartItemSelection}>
                <span className="d-block mb-1">Quantity</span>
                <Form.Select value={quantity} onChange={changeQuantity}> {renderCartOptions} </Form.Select>
            </div>
        </div>
    );
});

export default CartItem;