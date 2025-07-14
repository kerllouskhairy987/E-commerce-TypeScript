// react hooks
import { memo, useCallback } from "react";
// bootstrap
import { Form, Button } from "react-bootstrap";
// interfaces and types
import type { IProduct } from "@/interfaces";

import styles from "./styles.module.css";
import ProductInfo from "../ProductInfo/ProductInfo";
const { cartItem, cartItemSelection } = styles;


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
            <ProductInfo title={title} img={img} price={price} direction="column">
                <Button
                    variant="secondary"
                    style={{ color: "white", width: "fit-content" }}
                    className="mt-auto"
                    onClick={() => removeItemHandler(id)}>
                    Remove
                </Button>
            </ProductInfo>

            <div className={cartItemSelection}>
                <span className="d-block mb-1">Quantity</span>
                <Form.Select value={quantity} onChange={changeQuantity}> {renderCartOptions} </Form.Select>
            </div>
        </div>
    );
});

export default CartItem;