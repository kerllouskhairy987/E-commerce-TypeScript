// custom hook
import useProducts from "@/hooks/useProducts"
// react bootstrap
import { Container } from "react-bootstrap"
// components
import Product from "@/components/eCommerce/Product/Product"
import GridList from "@/components/common/GridList/GridList"
import Heading from "@/components/common/Heading/Heading"
import { LoadingAndError } from "@/components/feedback/LoadingAndError/LoadingAndError"
// interfaces and types
import type { IProduct } from "@/interfaces"

const Products = () => {
  const { error, loading, productsFullInfo, prefix } = useProducts()

  return (
    <Container>
      <Heading title={`${prefix?.toUpperCase()} Products`} />
      <LoadingAndError type="product" status={loading} error={error}>
        <GridList<IProduct> empty='products' records={productsFullInfo} renderItems={(pro: IProduct) => <Product {...pro} />} />
      </LoadingAndError>
    </Container>
  )
}

export default Products