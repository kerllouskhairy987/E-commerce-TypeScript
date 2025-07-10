import GridList from '@/components/common/GridList/GridList'
import Heading from '@/components/common/Heading/Heading'
import Product from '@/components/eCommerce/Product/Product'
import { LoadingAndError } from '@/components/feedback/LoadingAndError/LoadingAndError'
import useWishlist from '@/hooks/useWishlist'
import type { IProduct } from '@/interfaces'



const Wishlist = () => {

    const { error, loading, records } = useWishlist()

    return (
        <>
            <Heading title='Your Wishlist' />
            <LoadingAndError type='product' status={loading} error={error}>
                <GridList<IProduct>
                    empty='wishlist'
                    records={records}
                    renderItems={(record) => <Product {...record} />}
                />
            </LoadingAndError>
        </>
    )
}

export default Wishlist