import React from 'react'
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";

const Fillter = (props) => {

    const
        {
            loaiPhuCap,
            typeOfAllowance, selectedTypeOfAllowance, setSelectedTypeOfAllowance,
            workPlaces, selectedWorkPlace, setSelectedWorkPlace,
            handleFilter, handleClear
        } = props;


    return (
        <div className="fillter">
            <Row className="mb-3 row-tool align-items-center">
                {/* Type of Allowance */}
                <Col xs={12} md="auto">
                    <Form.Select
                        value={selectedTypeOfAllowance || ""}
                        onChange={(e) => setSelectedTypeOfAllowance(e.target.value)}>
                        <option value="" disabled>Tất cả phụ cấp</option>
                        {
                            typeOfAllowance.map((allowance) => (
                                <option key={allowance.value} value={allowance.value}>
                                    {
                                        loaiPhuCap[allowance.value]
                                    }
                                </option>
                            ))
                        }
                    </Form.Select>
                </Col>


                {/* WorkPlace */}
                <Col xs={12} md="auto">
                    <Form.Select
                        value={selectedWorkPlace || ""}
                        onChange={(e) => setSelectedWorkPlace(e.target.value)}>
                        <option value="">Tất cả nơi làm việc</option>
                        {workPlaces.map((workPlace) => (
                            <option key={workPlace.id} value={workPlace.name}>
                                {workPlace.name}
                            </option>
                        ))}
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
