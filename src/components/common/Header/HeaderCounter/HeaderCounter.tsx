// react hooks
import { useEffect, useState } from "react"
// styles
import styles from "./styles.module.css"
import { NavLink } from "react-router"
const { container, totalNum, pumpAnimate, iconWrapper } = styles;

interface IProps {
    to: string;
    svgIcon: React.ReactNode;
    totalQuantity: number;
    title: string;
}
const HeaderCounter = ({to, svgIcon, totalQuantity, title}: IProps) => {

    const [isAnimate, setIsAnimate] = useState(false);
    const basketQuantityWithAnimate = `${totalNum} ${isAnimate ? pumpAnimate : ""}`

    useEffect(() => {
        if (!totalQuantity) {
            return
        }
        setIsAnimate(true);
        const debounce = setTimeout(() => {
            setIsAnimate(false);
        }, 300);

        return () => clearTimeout(debounce);
    }, [totalQuantity])

    return (
        <div className={container}>
            <NavLink to={to} className={iconWrapper}>
                {/* <Logo /> */}
                {svgIcon}
                {totalQuantity > 0 ?
                    <div className={basketQuantityWithAnimate}>{totalQuantity}</div>
                    : null
                }
            </NavLink>
            <h3>{title}</h3>
        </div>
    )
}

export default HeaderCounter