import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import {TableOutlined} from "@ant-design/icons";
import {ProductGridView} from "./ProductGridView";

export const ProductModal = ({productMetaData,productReports}) => {
    debugger
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <TableOutlined onClick={showModal}  />
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} closable={false}>
                <ProductGridView metaData={productMetaData} reports={productReports}/>
            </Modal>
        </>
    );
};
