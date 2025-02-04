import React from "react";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";
import "./SearchFillterStyle.scss";

const SearchFillter = (props) => {
  const {
    filterText,
    setFilterText,
    handleFilter,
    handleClear,
    children,
    placeholder,
  } = props;
  return (
    <div className="fillter">
      <Row className="mb-3 row-tool align-items-center">
        {/* Search fillter */}
        <Col xs={9} md="auto">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder={placeholder || "Enter store name"}
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </InputGroup>
        </Col>

        {children}

        <Col xs={12} md="auto">
          <Button
            style={{ marginRight: "5px" }}
            variant="primary"
            onClick={handleFilter}
          >
            Lọc
          </Button>
          <Button variant="outline-secondary" onClick={handleClear}>
            X
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SearchFillter;
