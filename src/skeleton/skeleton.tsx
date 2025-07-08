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


export const ProductSkeleton = () => {
    return (
        <Container>
            <Row>
                {[...Array(8)].map((_, idx) => (
                    <Col key={idx} md={3} xs={6} className="d-flex justify-content-center mb-4">
                        <div className="d-flex flex-column align-items-center" style={{ width: '120px' }}>
                            <div
                                className="bg-light placeholder-glow mb-2"
                                style={{ height: '180px', width: '100%' }}
                            >
                                <div className="placeholder w-100 h-100"></div>
                            </div>
                            <div className="placeholder-glow w-100 mb-2">
                                <span className="placeholder col-12 bg-secondary" style={{ height: '18px', display: 'block' }}></span>
                            </div>
                            <div className="placeholder-glow w-100 mb-3">
                                <span className="placeholder col-6 bg-secondary" style={{ height: '14px', display: 'block' }}></span>
                            </div>
                            <div className="placeholder-glow w-100">
                                <span
                                    className="placeholder btn btn-info disabled w-100"
                                    style={{ height: '36px' }}
                                ></span>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>

    )
}

export const CartSkeleton = () => {
    return (
        <Container>
            <Row>
                {[...Array(5)].map((_, idx) => (
                        <div key={idx} className="d-flex justify-content-between align-items-center pb-2 mb-2 border-bottom">
                            <div className="d-flex">
                                <div className="placeholder-glow">
                                    <div
                                        className="placeholder"
                                        style={{ height: "180px", width: "160px", backgroundColor: "#e0e0e0" }}
                                    ></div>
                                </div>
                                <div className="d-flex flex-column ms-2" style={{ width: "140px" }}>
                                    <div className="placeholder-glow mb-2">
                                        <span className="placeholder col-12" style={{ height: "20px" }}></span>
                                    </div>
                                    <div className="placeholder-glow mb-3">
                                        <span className="placeholder col-6" style={{ height: "16px" }}></span>
                                    </div>
                                    <div className="mt-auto">
                                        <span className="placeholder col-5 btn btn-secondary disabled" style={{ height: "35px" }}></span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="mb-1">
                                    <span className="placeholder col-4" style={{ height: "16px" }}></span>
                                </div>
                                <div className="placeholder-glow">
                                    <span className="placeholder col-6" style={{ height: "38px", borderRadius: "0.375rem" }}></span>
                                </div>
                            </div>
                        </div>
                ))}
            </Row>
        </Container>
    );

} 