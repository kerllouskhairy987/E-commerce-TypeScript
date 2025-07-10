import { Link, useLocation } from "react-router";
import { Button, Container } from "react-bootstrap";
// lottie files
import Lottie from "lottie-react";
import EmptyCart from "@/assets/lottieFiles/EmptyCart.json"
import EmptyProductsKind from "@/assets/lottieFiles/EmptyProductsKind.json"
import EmptyWishlist from "@/assets/lottieFiles/EmptyWishlist.json"
import LazyLoading from "@/assets/lottieFiles/LazyLoading.json"
import NotFound from "@/assets/lottieFiles/NotFound.json"
import Error from "@/assets/lottieFiles/Error.json"


const lottieFilesMap = {
    EmptyCart,
    EmptyProductsKind,
    EmptyWishlist,
    LazyLoading,
    NotFound,
    Error,
}

interface IProps {
    type: keyof typeof lottieFilesMap;
    message?: string;
    error: boolean;
}

const LottieHandlers = ({ type, message, error = true }: IProps) => {
    const { pathname } = useLocation();
    const Component = lottieFilesMap[type]
    return (
        <Container>

            <div className="d-flex flex-column justify-content-center align-content-center text-center mb-5" style={{ maxHeight: "100vh" }}>
                {message && <h3 style={{ fontSize: "19px" }}>{message}</h3>}
                <Lottie animationData={Component} loop={true} style={{ maxWidth: "400px", height: "400px", margin: "0 auto" }} />
                {error &&
                    <div className='d-flex align-items-center justify-content-center gap-3'>
                        <Link to={"/"} replace={true}>
                            <Button>Home</Button>
                        </Link>
                        <Link to={pathname} reloadDocument>
                            <Button>Refresh</Button>
                        </Link>
                    </div>
                }
            </div>
        </Container>
    )
}

export default LottieHandlers