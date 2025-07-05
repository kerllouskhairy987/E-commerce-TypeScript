// react bootstrap component
import { Button } from "react-bootstrap"
// styles
import styles from "./styles.module.css"
import type { IProduct } from "@/interfaces"
const { product, productImg } = styles


const Product = ({  img, price, title }: IProduct) => { // id, cat_prefix,
    return (
        <div className={product}>
            <div className={productImg}>
                <img src={img} alt={title} />
            </div>
            <h2 title={title}>{title}</h2>
            <h3>{price} EGP</h3>
            <Button variant="info" style={{ color: "white" }}>
                Add to cart
            </Button>
        </div>
    )
}

export default Product