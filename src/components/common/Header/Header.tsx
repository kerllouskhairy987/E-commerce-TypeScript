// react hooks
import { useEffect } from "react";
// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/auth/authSlice";
import actGetWishlist from "@/store/wishlist/act/actGetWishlist";
// react bootstrap
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
// components
import HeaderLeftBar from "./HeaderCounter/HeaderLeftBar/HeaderLeftBar";
// react router dom
import { NavLink } from "react-router";

// styles 
import styles from "./styles.module.css"
const { headerContainer, headerLogo, headerLeftBar } = styles;



const Header = () => {
    const dispatch = useAppDispatch();
    const { accessToken, user } = useAppSelector(state => state.auth)
    // console.log(accessToken)

    useEffect(() => {
        if (accessToken) {
            dispatch(actGetWishlist("productIds"));
        }
    }, [dispatch, accessToken])

    return (
        <header>
            <div className={headerContainer}>
                <h1 className={headerLogo}>
                    <NavLink to={"/"}>
                        <span>Our</span> <Badge bg="info">eCom</Badge>
                    </NavLink>
                </h1>

                <div className={headerLeftBar}> <HeaderLeftBar /> </div>
            </div>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="categories">Categories</Nav.Link>
                            <Nav.Link as={NavLink} to="about-us">About</Nav.Link>
                        </Nav>
                        {
                            !accessToken
                                ? <>
                                    <Nav>
                                        <Nav.Link as={NavLink} to="login">Login</Nav.Link>
                                        <Nav.Link as={NavLink} to="register">Register</Nav.Link>
                                    </Nav>
                                </>
                                : <>
                                    <Nav>
                                        <NavDropdown
                                            id="nav-dropdown-dark-example"
                                            title={`welcome ${user?.firstName} ${user?.lastName}`}
                                            menuVariant="dark"
                                        >
                                            <NavDropdown.Item as={NavLink} to="profile" end>profile</NavDropdown.Item>
                                            <NavDropdown.Item as={NavLink} to="profile/orders"> Orders </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item as={NavLink} to={"/"} onClick={() => dispatch(logout())}> Logout </NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </>
                        }

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header