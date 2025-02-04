import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./UpdateAttendanceSettingStyle.scss";
import { toast } from "react-toastify";
import { updateAttendanceSetting } from "../../../../../../services/AttendanceSetting";

const UpdateAttendanceSetting = (props) => {
    const { showUpdate, setShowUpdate, fetchListAttendanceSetting, dataUpdate } = props;

    const [maximumLateAllowed, setMaximumLateAllowed] = useState("");
    const [maxEarlyLeaveAllowed, setMaxEarlyLeaveAllowed] = useState("");

    const reSetForm = () => {
        setMaximumLateAllowed("");
        setMaxEarlyLeaveAllowed("");
    };

    const handleClose = () => {
        setShowUpdate(false);
        reSetForm();
    };

    const validateForm = () => {
        let valid = true;
        if (maximumLateAllowed === "" || maxEarlyLeaveAllowed === "") {
            valid = false;
        }
        return valid;
    };

    useEffect(() => {
        if (showUpdate) {
            setMaximumLateAllowed(dataUpdate.maximumLateAllowed);
            setMaxEarlyLeaveAllowed(dataUpdate.maxEarlyLeaveAllowed);
        }
    }, [dataUpdate, showUpdate]);

    const handleUpdateAttendanceSetting = async () => {
        if (validateForm()) {
            const attendanceSetting = { maximumLateAllowed, maxEarlyLeaveAllowed };
            let res = await updateAttendanceSetting(dataUpdate.id, attendanceSetting);
            console.log(res);
            if (res.isSuccess === true) {
                handleClose();
                reSetForm();
                fetchListAttendanceSetting("0", 1, 10);
                toast.success("Cập nhật thành công.");
            } else {
                toast.error("Lỗi khi sửa thông tin.");
            }
        } else {
            toast.error("Vui lòng nhập đầy đủ các trường có dấu sao đỏ.");
        }
    };

    return (
        <>
            <Modal
                show={showUpdate}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className="modal-create"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cấu hình thời gian chấm công</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">

                        <div className="col-md-6">
                            <label className="form-label">
                                Thời gian cho đi trễ
                                <span className="valid">*</span>
                            </label>
                            <input
                                type="time"
                                className="form-control"
                                value={maximumLateAllowed}
                                onChange={(event) => {
                                    const timeWithSeconds = `${event.target.value}:00`;
                                    setMaximumLateAllowed(timeWithSeconds);
                                }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">
                                Thời gian cho về sớm
                                <span className="valid">*</span>
                            </label>
                            <input
                                type="time"
                                className="form-control"
                                value={maxEarlyLeaveAllowed}
                                onChange={(event) => {
                                    const timeWithSeconds = `${event.target.value}:00`;
                                    setMaxEarlyLeaveAllowed(timeWithSeconds);
                                }}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Bỏ qua
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdateAttendanceSetting()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateAttendanceSetting
