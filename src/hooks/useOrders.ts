// react hooks
import { useEffect, useState } from 'react'
// redux
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import actGetOrders from '@/store/order/act/actGetOrders';
import { resetOrderStatus } from '@/store/order/orderSlice';
// interfaces and types
import type { IProduct } from '@/interfaces';

const useOrders = () => {

    const dispatch = useAppDispatch();

    const { loading, error, orderList } = useAppSelector(state => state.order);

    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct[]>([])
    console.log(selectedProduct)


    const viewDetailsHandler = (id: number) => {
        const productDetails = orderList.find((order) => order.id === id);

        if (productDetails) {
            setSelectedProduct(productDetails.items);
            setShowModal(true);
        }

    }

    const modalHandler = () => {
        setShowModal(!showModal);
        setSelectedProduct([]);
    }

    useEffect(() => {
        const promise = dispatch(actGetOrders())

        return () => {
            promise.abort()
            dispatch(resetOrderStatus())
        }
    }, [dispatch])


    return {loading, error, orderList, viewDetailsHandler, showModal, modalHandler, selectedProduct}
}

export default useOrders