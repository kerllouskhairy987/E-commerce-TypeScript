// styles from bootstrap 
import { Container } from "react-bootstrap"
// components
import Header from "@/components/common/Header/Header"
import Footer from "@/components/common/Footer/Footer"
// react router dom
import { Outlet } from "react-router"
// styles 
import styles from "./styles.module.css"
const {container, wrapper}  = styles


const MainLayout = () => {
    return (
        <Container className={container}>
            <Header />
            <div className={wrapper}>
                <Outlet />
            </div>
            <Footer />
        </Container>
    )
}

export default MainLayout