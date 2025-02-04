import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";

const Fillter = (props) => {
  const {
    workPlaces, selectedWorkPlace, setSelectedWorkPlace,
    departments, setSelectedDepartment, selectedDepartment,
    positions, setSelectedPosition, selectedPosition,
    levels, setSelectLevel, selectLevel,
    Status, setStatus
  } = props;
  const [selectedWorkPlaceId, setSelectedWorkPlaceId] = useState("");

  return (
    <>
      {/* WorkPlace */}
      <Col xs={12} md="auto">
        <Form.Select
          value={selectedWorkPlace || ""}
          onChange={(e) => {
            setSelectedWorkPlace(e.target.value);
            const workplace = workPlaces.find(
              (wp) => wp.name === e.target.value
            );
            setSelectedWorkPlaceId(workplace ? workplace.id : "");
          }}
        >
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
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">Tất cả phòng ban</option>
          {departments
            .filter(
              (dept) =>
                !selectedWorkPlaceId ||
                dept.workPlace?.id === selectedWorkPlaceId
            )
            .map((department) => (
              <option key={department.id} value={department.name}>
                {department.name} - {department.workPlace?.name}
              </option>
            ))}
        </Form.Select>
      </Col>
      {/* Position */}
      <Col xs={12} md="auto">
        <Form.Select
          value={selectedPosition || ""}
          onChange={(e) => setSelectedPosition(e.target.value)}
        >
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
          onChange={(e) => setSelectLevel(e.target.value)}
        >
          <option value="">Tất cả Level</option>
          {levels.map((level) => (
            <option key={level.id} value={level.name}>
              {level.name}
            </option>
          ))}
        </Form.Select>
      </Col>

      {/* Status */}
      <Col xs={6} md="auto" className="mt-1">
        <Form.Select
          value={Status || 0}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="0">Đang làm việc</option>
          <option value="1">Đã nghỉ việc</option>
        </Form.Select>
      </Col>
    </>
  );
};

export default Fillter;
