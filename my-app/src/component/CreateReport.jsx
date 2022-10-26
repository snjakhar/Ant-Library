import {Form, Input, Modal, Select, InputNumber, Space, Switch, message} from 'antd';
import React, {useState} from 'react';
import 'antd/dist/antd.css'
import {Option} from "antd/es/mentions";
import {postReportApiCall, updateReportAPiCall} from "./apiCalls";
import {isEmpty, pick, pickBy} from "lodash";
import './style.css'
import {FormFooter} from "./FormFooter";
import {checkFieldType, createFormItem} from "./helper";


const CreateReport = ({metaData, getReports, selectedReportInfo, toggleCreateOrOpenReport, handleLoading}) => {

    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleCancel = () => {
        setIsModalOpen(false);
        toggleCreateOrOpenReport()
    };

    const onFinish = (values) => {
        values.phone = values.prefix + -+values.phone;
        if (!isEmpty(selectedReportInfo)) {

            let afterRemoveEmptyValues = Object.keys(values).filter((key) => !!values[key])
            let newValues = pick(values, afterRemoveEmptyValues);


            let payload = {...newValues, _id: selectedReportInfo._id}
            updateReportAPiCall(payload).then((res) => {
                message.success('Report Updated Successfully')
                getReports();
                setIsModalOpen(false)
            })

        } else {
            handleLoading()
            postReportApiCall(values).then((res) => {
                getReports();
                message.success('Report Created Successfully')
                handleLoading()
                setIsModalOpen(false)
            })
        }


    };


    return (
        <>
            <Modal footer={null} title="Fill Form" open={isModalOpen} onCancel={handleCancel}>
                <Form
                    onFinish={onFinish}
                    initialValues={selectedReportInfo}
                    labelCol={{"span": 5}}
                    wrapperCol={{"span": 15}}
                    layout="horizontal"
                    size='small'
                >
                    {
                        metaData.map((field, i) => {
                            if (i !== metaData.length - 1)
                                return createFormItem(field)
                        })
                    }
                    <FormFooter handleCancel={handleCancel} selectedReportInfo={selectedReportInfo}/>
                </Form>
            </Modal>
        </>
    );
};

export default CreateReport;

