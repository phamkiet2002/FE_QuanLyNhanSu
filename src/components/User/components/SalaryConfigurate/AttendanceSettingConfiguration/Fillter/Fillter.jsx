import React from 'react'
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";

const Fillter = (props) => {

    const
        {
            status,
            setStatus,
            handleFilter, handleClear
        } = props;

    return (
        <div className="fillter">
            <Row className="mb-3 row-tool align-items-center">

                {/* Status */}
                <Col xs={12} md="auto">
                    <Form.Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Tất cả trạng thái</option>
                        <option value="0">Hoạt động</option>
                        <option value="1">Ngừng hoạt động</option>
                    </Form.Select>
                </Col>

                <Col xs={12} md="auto">
                    <Button style={{ marginRight: '5px' }} variant="primary" onClick={handleFilter}>Lọc</Button>
                    <Button variant="outline-secondary" onClick={handleClear}>
                        X
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default Fillter
