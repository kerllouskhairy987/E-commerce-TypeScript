// custom hook
import useOrders from "@/hooks/useOrders";
// components
import Heading from "@/components/common/Heading/Heading";
import ProductInfo from "@/components/eCommerce/ProductInfo/ProductInfo";
import { LoadingAndError } from "@/components/feedback/LoadingAndError/LoadingAndError";
// lottie files
import LottieHandlers from "@/components/feedback/LottieHandlers/LottieHandlers";
// bootstrap
import { Button, Container, Modal, Table } from "react-bootstrap";


const Orders = () => {

    const { loading, error, orderList, viewDetailsHandler, showModal, modalHandler, selectedProduct } = useOrders();

    return (
        <>
            <Container>

                <Modal show={showModal} onHide={modalHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>Placing Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            selectedProduct.map((product) => (
                                <ProductInfo key={product.id} {...product} direction="column" style={{ marginBottom: "10px" }} />
                            ))
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={modalHandler}> Close </Button>
                    </Modal.Footer>
                </Modal>

                <Heading title="My Orders" />

                <LoadingAndError error={error} status={loading} type="orders">
                    {orderList.length
                        ? <Table>
                            <thead>
                                <tr>
                                    <th>Order Number</th>
                                    <th>Title</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderList.map((order) => (
                                        <tr key={order.id}>
                                            <td># {order.id}</td>
                                            <td>
                                                {order.items.length} item(s) {" / "}
                                                <span
                                                    onClick={() => viewDetailsHandler(order.id)}
                                                    style={{ cursor: "pointer", textDecoration: "underline" }}>
                                                    Product Details
                                                </span>
                                            </td>
                                            <td>{order.subtotal.toFixed(2)}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                        : <LottieHandlers type="EmptyOrders" message="You have no orders" error={false} />}
                </LoadingAndError>
            </Container>
        </>
    )
}

export default Orders