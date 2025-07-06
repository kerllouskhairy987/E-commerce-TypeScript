// bootstrap
import { Col, Row } from "react-bootstrap";

interface IProps<T> {
    records: T[];
    renderItems: (record: T) => React.ReactNode;
}

type hasId = { id?: number }

const GridList = <T extends hasId>({ records, renderItems }: IProps<T>) => {

    const renders = records.length > 0 ? records.map((record) => (
        <Col key={record.id} md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2">
            {renderItems(record)}
        </Col>
    )
    ) : <h2 className="text-center text-info">there are no categories</h2>

    return <Row> {renders}</Row>
}

export default GridList