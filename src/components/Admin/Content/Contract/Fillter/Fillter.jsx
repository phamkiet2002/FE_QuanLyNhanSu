import React from "react";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";

const Fillter = (props) => {
  const { contracNumber, setContracNumber } = props;

  return (
    <>
      {/* Contrac Number */}
      <Col xs={9} md="auto">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Nhập số hợp đồng"
            value={contracNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setContracNumber(value);
              }
            }}
          />
        </InputGroup>
      </Col>
    </>
  );
};

export default Fillter;
