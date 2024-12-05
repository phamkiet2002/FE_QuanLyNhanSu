import React, { useState } from 'react'
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";
import './ListLeaveRegistrationNghiBuoiStyle.scss'

const ListLeaveRegistrationNghiBuoi = (props) => {
    const { listLeaveRegistration } = props;
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    return (
        <>
            <div className="LeaveRegistration container">

                <Table className="LeaveRegistration_table" striped bordered hover>
                    <thead>
                        <tr className='text-center'>
                            <th>Nhân viên yêu cầu</th>
                            <th>Thông tin xin nghỉ</th>
                            <th>Lý do</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listLeaveRegistration.map((item, index) =>
                                <tr key={index} className='text-center'>
                                    <td>{item.employee.name}</td>
                                    <td>
                                        Nghỉ buổi:
                                        {
                                            item.halfDayoff == 'Sang' ? " Sáng" :
                                                item.halfDayoff == 'Chieu' ? " Chiều" : "Không xác định"
                                        }
                                        <br />
                                        Ngày: {formatDate(item.dayOff)}
                                    </td>
                                    <td>
                                        {item.leaveReason}
                                    </td>
                                    <td className={`LeaveRegistration_pendingApproval_${item.pendingApproval}`}>
                                        {
                                            item.pendingApproval == 'Daduyet' ? "Đã duyệt" :
                                                item.pendingApproval == 'Chuaduyet' ? "Chờ duyệt" :
                                                    item.pendingApproval == 'Tuchoi' ? "Từ chối" : "Không xác định"
                                        }
                                    </td>
                                    <td>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-around",
                                            }}
                                        >
                                            <button className="btn btn-sm btn-outline-primary m-1">
                                                <FaEye style={{ verticalAlign: "middle" }} />
                                            </button>
                                            <button className="btn btn-sm btn-outline-primary m-1">
                                                <FaEdit style={{ verticalAlign: "middle" }} />
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger m-1">
                                                <FaTrashAlt style={{ verticalAlign: "middle" }} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        {listLeaveRegistration && listLeaveRegistration.length === 0 && (
                            <tr>
                                <td className="text-center" colSpan={"7"}>Not found Data</td>
                            </tr>
                        )}
                    </tbody>
                </Table>

            </div>
        </>
    )
}

export default ListLeaveRegistrationNghiBuoi
