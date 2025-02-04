import React from 'react'
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";

const Fillter = (props) => {
  const { pendingApproval, setPendingApproval } = props
  return (
    <>
      <Col xs={6} md="auto">
        <Form.Select
          value={pendingApproval || 0}
          onChange={(e) => setPendingApproval(e.target.value)}
        >
          <option value="0">Chờ duyệt</option>
          <option value="1">Đã duyệt</option>
          <option value="2">Từ chối</option>
          <option value="3">Đã Húy</option>
        </Form.Select>
      </Col>
    </>
  )
}

export default Fillter
