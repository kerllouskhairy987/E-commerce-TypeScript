// react bootstrap component
import { Button } from "react-bootstrap"
// styles
import styles from "./styles.module.css"
const { product, productImg } = styles


const Product = () => {
    return (
        <div className={product}>
            <div className={productImg}>
                <img src="https://media.istockphoto.com/id/938304518/photo/young-gril-playing-with-her-dog-outside-on-a-field-dog-is-very-happy.jpg?s=612x612&w=0&k=20&c=fY6Kzq70D9HZnsUketnhR8xbpEueqn_HMzukvIP8VWc=" alt="" />
            </div>
            <h2>Title</h2>
            <h3>10 EGP</h3>
            <Button variant="info" style={{ color: "white" }}>
                Add to cart
            </Button>
        </div>
    )
}
// https://github.com/kerllouskhairy987/E-commerce-TypeScript.git
export default Product