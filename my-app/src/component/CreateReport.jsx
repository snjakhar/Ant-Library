import {Form, Input, Modal, Select, InputNumber, Space, Switch, message} from 'antd';
import React, {useState} from 'react';
import 'antd/dist/antd.css'
import {Option} from "antd/es/mentions";
import {postReportApiCall, updateReportAPiCall} from "./apiCalls";
import {isEmpty, pick, pickBy} from "lodash";
import './style.css'
import {FormFooter} from "./FormFooter";
import { createFormItem} from "./helper";

let newAddedProducts=[]
const CreateReport = ({metaData, getReports, selectedReportInfo, toggleCreateOrOpenReport, handleLoading,reports}) => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleCancel = () => {
        setIsModalOpen(false);
        toggleCreateOrOpenReport()
    };

    const onFinish = (values) => {
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
            values.products=newAddedProducts;
            postReportApiCall(values).then((res) => {
                getReports();
                message.success('Report Created Successfully')
                handleLoading()
                setIsModalOpen(false)
            })
        }


    };

   const getCurrentAddedProductsData=(data)=>{
       newAddedProducts=data;
   }
    return (
        <>
            <Modal footer={null} title="Fill Form" open={isModalOpen} onCancel={handleCancel}>
                <Form
                    onFinish={onFinish}
                    initialValues={selectedReportInfo}
                    labelCol={{"span": 5}}
                    wrapperCol={{"span":18}}
                    layout="horizontal"
                    size='small'
                >
                    {
                        metaData.map((field, i) => {
                            if (i !== metaData.length - 1)
                                return createFormItem(field,getCurrentAddedProductsData,selectedReportInfo,reports)
                        })
                    }
                    <FormFooter handleCancel={handleCancel} selectedReportInfo={selectedReportInfo}/>
                </Form>
            </Modal>
        </>
    );
};

export default CreateReport;

