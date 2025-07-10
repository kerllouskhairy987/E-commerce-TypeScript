// bootstrap
import { Col, Row } from "react-bootstrap";
// lottie files
import Lottie from "lottie-react";
import EmptyCart from "@/assets/lottieFiles/EmptyCart.json"
import EmptyWishlist from "@/assets/lottieFiles/EmptyWishlist.json"
import EmptyProductsKind from "@/assets/lottieFiles/EmptyProductsKind.json"

// dynamic components
const Empty = {
    products: EmptyProductsKind,
    cart: EmptyCart,
    wishlist: EmptyWishlist
}
interface IProps<T> {
    records: T[];
    renderItems: (record: T) => React.ReactNode;
    empty: keyof typeof Empty;             // typeof Empty ==> type Empty = { products: "EmptyProductsKind", cart: "EmptyCart", wishlist: "EmptyWishlist" }
}

type hasId = { id?: number }


const GridList = <T extends hasId>({ records, renderItems, empty }: IProps<T>) => {

    const Component = Empty[empty]

    const renders = records.length > 0 ? records.map((record) => (
        <Col key={record.id} md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2">
            {renderItems(record)}
        </Col>
    )
    ) : <Lottie animationData={Component} loop={true} style={{ width: "400px", height: "400px", margin: "0 auto" }} />

    return <Row> {renders}</Row>
}

export default GridList