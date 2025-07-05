// react router dom
import { Link } from "react-router";
// interfaces and types
import type { ICategory } from "@/interfaces";
// styles
import styles from "./styles.module.css"
const { category, categoryImg, categoryTitle } = styles

const Category = ({ title, prefix, img }: ICategory) => {
    return (
        <div className={category}>
            <Link to={`/categories/products/${prefix}`}>
                <div className={categoryImg}>
                    <img src={img} alt={title} />
                </div>
                <h4 className={categoryTitle}>{title}</h4>
            </Link>
        </div>
    )
}

export default Category