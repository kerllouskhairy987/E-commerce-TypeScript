import { Table } from 'react-bootstrap'

const OrderSkeletons = () => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Order Number</th>
                    <th>Title</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                {[...Array(5)].map((_, index) => (
                    <tr key={index}>
                        <td>
                            <span className="placeholder-glow">
                                <span className="placeholder col-6"></span>
                            </span>
                        </td>
                        <td>
                            <span className="placeholder-glow">
                                <span className="placeholder col-8"></span>
                            </span>
                        </td>
                        <td>
                            <span className="placeholder-glow">
                                <span className="placeholder col-4"></span>
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>

    )
}

export default OrderSkeletons