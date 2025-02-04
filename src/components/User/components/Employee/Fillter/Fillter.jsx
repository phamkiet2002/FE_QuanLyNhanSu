import React from 'react'
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";

const Fillter = (props) => {

    const
        {
            workPlaces, selectedWorkPlace, setSelectedWorkPlace,
            departments, setSelectedDepartment, selectedDepartment,
            positions, setSelectedPosition, selectedPosition,
            levels, setSelectLevel, selectLevel
        } = props;

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

            {/* Department */}
            <Col xs={12} md="auto">
                <Form.Select
                    value={selectedDepartment || ""}
                    onChange={(e) => setSelectedDepartment(e.target.value)}>
                    <option value="">Tất cả phòng ban</option>
                    {departments.map((department) => (
                        <option key={department.id} value={department.name}>
                            {department.name}
                        </option>
                    ))}
                </Form.Select>
            </Col>

            {/* Position */}
            <Col xs={12} md="auto">
                <Form.Select
                    value={selectedPosition || ""}
                    onChange={(e) => setSelectedPosition(e.target.value)}>
                    <option value="">Tất cả chức vụ</option>
                    {positions.map((position) => (
                        <option key={position.id} value={position.name}>
                            {position.name}
                        </option>
                    ))}
                </Form.Select>
            </Col>

            {/* Level */}
            <Col xs={12} md="auto">
                <Form.Select
                    value={selectLevel || ""}
                    onChange={(e) => setSelectLevel(e.target.value)}>
                    <option value="">Tất cả Level</option>
                    {levels.map((level) => (
                        <option key={level.id} value={level.name}>
                            {level.name}
                        </option>
                    ))}
                </Form.Select>
            </Col>
        </>
    )
}

export default Fillter
