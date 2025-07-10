import { Container, Row } from "react-bootstrap";

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