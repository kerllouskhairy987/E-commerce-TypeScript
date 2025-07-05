// bootstrap component
import { Container, Row, Col } from "react-bootstrap"
// components
import Category from "@/components/eCommerce/Category/Category"

const Categories = () => {
  return (
    <Container>
      <Row>
        <Col md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2">
          <Category />
        </Col>
        <Col md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2">
          <Category />
        </Col>
        <Col md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2">
          <Category />
        </Col>
        <Col md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2">
          <Category />
        </Col>
        <Col md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2">
          <Category />
        </Col>
        <Col md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2">
          <Category />
        </Col>
        <Col md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2">
          <Category />
        </Col>
        <Col md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2">
          <Category />
        </Col>
      </Row>
    </Container>
  )
}

export default Categories