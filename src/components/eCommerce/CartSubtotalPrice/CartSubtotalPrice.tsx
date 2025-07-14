import type { IProduct } from "@/interfaces";
import styles from "./styles.module.css";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import actPlaceOrder from "@/store/order/act/actPlaceOrder";
import { clearCartAfterPlaceOrder } from "@/store/cart/cartSlice";

interface IProps {
    products: IProduct[],
    userAccessToken: string | null;
}
const CartSubtotalPrice = ({ products, userAccessToken }: IProps) => {
    const dispatch = useAppDispatch()

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)



    const subtotal = products.reduce((accumulator, el) => {
        const price = el.price;
        const quantity = el.quantity;
        if (quantity && typeof quantity === "number") {
            return accumulator + price * quantity;
        } else {
            return accumulator;
        }
    }, 0);

    const modalHandler = () => {
        setShowModal(!showModal)
        setError(null)
    }

    const placeOrderHandler = () => {
        setLoading(true);

        dispatch(actPlaceOrder(subtotal))
            .unwrap()
            .then(() => {
                dispatch(clearCartAfterPlaceOrder())
                setShowModal(false)
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
    }

    return (
        <>
            <Modal show={showModal} onHide={modalHandler} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Placing Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to place the order with Subtotal: <span className="bg-info text-white">{subtotal.toFixed(2)} EGP</span>
                    {
                        !loading && error && <p className="text-danger">{error}</p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modalHandler}>
                        Close
                    </Button>
                    <Button variant="info" style={{ color: "white" }} onClick={placeOrderHandler}>
                        {
                            loading
                                ? <>
                                    <Spinner animation="border" size="sm" /> Loading ...
                                </>
                                : "Confirm"
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={styles.container}>
                <span>Subtotal:</span>
                <span>{subtotal.toFixed(2)} EGP</span>
            </div>
            {
                userAccessToken &&
                <div className={styles.container}>
                    <span></span>
                    <Button
                        variant="info"
                        style={{ color: "white " }}
                        onClick={modalHandler}
                    >Place Order</Button>
                </div>
            }
        </>
    );
}

export default CartSubtotalPrice