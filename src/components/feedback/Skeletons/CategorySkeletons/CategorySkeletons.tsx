import { Col, Container, Row } from "react-bootstrap"

export const CategoriesSkeleton = () => {
    return (
        <Container>
            <Row>
                {[...Array(8)].map((_, idx) => (
                    <Col key={idx} md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2">
                        <div className="d-flex flex-column align-items-center">
                            <div
                                className="rounded-circle bg-light d-flex align-items-center justify-content-center placeholder-glow"
                                style={{ width: '120px', height: '120px' }}
                            >
                                <div className="placeholder w-100 h-100 rounded-circle bg-secondary"></div>
                            </div>

                            <div className="placeholder-glow mt-2 w-50">
                                <span className="placeholder col-12 bg-secondary"></span>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
