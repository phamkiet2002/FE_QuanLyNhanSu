import React from 'react'
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";

const Fillter = (props) => {

    const
        {
            contractNumber, setContractNumber
        } = props;

    return (
        <>
            {/* Contrac Number */}
            <Col xs={9} md="auto">
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Nhập số hợp đồng"
                        value={contractNumber}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                                setContractNumber(value);
                            }
                        }}
                    />

                </InputGroup>
            </Col>
        </>
    )
}

export default Fillter
