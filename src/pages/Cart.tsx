// custom hook
import useCart from "@/hooks/useCart";
// components
import Heading from "@/components/common/Heading/Heading";
import CartItemsList from "@/components/eCommerce/CartItemsList/CartItemsList";
import CartSubtotalPrice from "@/components/eCommerce/CartSubtotalPrice/CartSubtotalPrice";
import { LoadingAndError } from "@/components/feedback/LoadingAndError/LoadingAndError";
// lottie files
import LottieHandlers from "@/components/feedback/LottieHandlers/LottieHandlers";
import Lottie from "lottie-react";
import EmptyCart from "@/assets/lottieFiles/EmptyCart.json"
// react bootstrap
import { Container } from "react-bootstrap";

const Cart = () => {

    const { loading, error, cartItemsQuantity, placeOrderStatus, changeQuantityHandler, removeItemHandler, userAccessToken } = useCart()

    return (
        <>
            <Container>

                <Heading title="Cart" />
                <LoadingAndError type="cart" status={loading} error={error}>
                    {
                        cartItemsQuantity.length
                            ? <>
                                <CartItemsList products={cartItemsQuantity} changeQuantityHandler={changeQuantityHandler} removeItemHandler={removeItemHandler} />
                                <CartSubtotalPrice products={cartItemsQuantity} userAccessToken={userAccessToken} />
                            </>
                            :  placeOrderStatus === "succeeded" 
                            ?  <LottieHandlers error={false} type="Success" message="Order placed successfully"  />
                            : <LottieHandlers error={false} type="EmptyCart" message="Your cart is empty" />
                    }
                </LoadingAndError>
            </Container>
        </>
    )
}

export default Cart