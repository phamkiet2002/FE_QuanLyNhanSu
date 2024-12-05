import React from 'react'
import { Row, Col, InputGroup, Form, Button, Table } from "react-bootstrap";

const Pagination = (props) => {

    const { pageIndex, pageSize, totalCount, handlePreviousPage, handleNextPage } = props;

    return (
        <div className="pagination-controls d-flex justify-content-between align-items-center"
            style={{ marginBotton: "20px" }}
        >
            <div>
                <Button
                    variant="secondary"
                    onClick={handlePreviousPage}
                    disabled={pageIndex <= 1}
                >
                    &laquo; Trước
                </Button>

                <span className="mx-2">{`Trang ${pageIndex} / ${Math.ceil(totalCount / pageSize)}`}</span>

                <Button
                    variant="secondary"
                    onClick={handleNextPage}
                    disabled={pageIndex * pageSize >= totalCount}
                >
                    Sau &raquo;
                </Button>
            </div>
            <div>
                <span>Tổng số: {totalCount} mục</span>
            </div>
        </div>
    )
}

export default Pagination
