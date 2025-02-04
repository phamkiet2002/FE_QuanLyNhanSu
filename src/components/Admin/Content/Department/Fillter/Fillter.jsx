import React from 'react'
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";

const Fillter = (props) => {

    const { workPlaces, selectedWorkPlace, setSelectedWorkPlace } = props;

    return (
        <>
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
        </>
    )
}

export default Fillter
