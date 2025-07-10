// custom hook
import useCart from "@/hooks/useCart";
// components
import Heading from "@/components/common/Heading/Heading";
import CartItemsList from "@/components/eCommerce/CartItemsList/CartItemsList";
import CartSubtotalPrice from "@/components/eCommerce/CartSubtotalPrice/CartSubtotalPrice";
import { LoadingAndError } from "@/components/feedback/LoadingAndError/LoadingAndError";
// lottie files
import Lottie from "lottie-react";
import EmptyCart from "@/assets/lottieFiles/EmptyCart.json"
// react bootstrap
import { Container } from "react-bootstrap";

const Cart = () => {

    const { loading, error, cartItemsQuantity, changeQuantityHandler, removeItemHandler } = useCart()

    return (
        <>
            <Container>

                <Heading title="Cart" />
                <LoadingAndError type="cart" status={loading} error={error}>
                    {cartItemsQuantity.length ? <>
                        <CartItemsList products={cartItemsQuantity} changeQuantityHandler={changeQuantityHandler} removeItemHandler={removeItemHandler} />
                        <CartSubtotalPrice products={cartItemsQuantity} />
                    </> : <Lottie animationData={EmptyCart} loop={true} style={{ maxWidth: "400px", height: "400px" , margin: "0 auto"}} />}
                </LoadingAndError>
            </Container>
        </>
    )
}

export default Cart