
// styles
import styles from "./styles.module.css"
const { category, categoryImg, categoryTitle } = styles


const Category = () => {
    return (
        <div className={category}>
            <div className={categoryImg}>
                <img src="https://media.istockphoto.com/id/938304518/photo/young-gril-playing-with-her-dog-outside-on-a-field-dog-is-very-happy.jpg?s=612x612&w=0&k=20&c=fY6Kzq70D9HZnsUketnhR8xbpEueqn_HMzukvIP8VWc=" alt="product image" />
            </div>
            <h4 className={categoryTitle}>Title</h4>
        </div>
    )
}

export default Category