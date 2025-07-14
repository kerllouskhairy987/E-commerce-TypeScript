import styles from "./styles.module.css"

interface IProps {
    title: string;
    img: string;
    price: number;
    quantity?: number;
    direction?: "row" | "column";
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

const ProductInfo = ({ title, img, price, quantity, direction = "row", children, style }: IProps) => {
    return (
        <div className={`${styles[`product-${direction}`]}`} style={style}>
            <div className={`${styles[`productImg-${direction}`]}`}>
                <img src={img} alt={title} />
            </div>
            <div className={`${styles[`productInfo-${direction}`]}`}>
                <h2 title={title}>{title}</h2>
                <h3>{Number(price).toFixed(2)} EGP</h3>
                {quantity && quantity > 0 && <p>Total Quantity: {quantity}</p>}
                {quantity && quantity > 0 && <p>Total Price: {(price * quantity).toFixed(2)}</p>}

                {children}

            </div>
        </div>
    )
}

export default ProductInfo