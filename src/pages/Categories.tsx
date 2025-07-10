// bootstrap component
import { Container } from "react-bootstrap"
// interfaces and types
import type { ICategory } from "@/interfaces"
// components
import Category from "@/components/eCommerce/Category/Category"
import { LoadingAndError } from "@/components/feedback/LoadingAndError/LoadingAndError"
import GridList from "@/components/common/GridList/GridList"
import Heading from "@/components/common/Heading/Heading"
import useCategories from "@/hooks/useCategories"

const Categories = () => {

  const { loading, records, error } = useCategories()
  return (
    <Container>
      <Heading title="Categories" />
      <LoadingAndError type="category" status={loading} error={error}>
        <GridList<ICategory> empty="products" records={records} renderItems={(cat: ICategory) => <Category {...cat} />} />
      </LoadingAndError>
    </Container>

  )
}

export default Categories