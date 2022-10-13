import {Form, Input, Modal, Select, InputNumber, Space, Switch, message} from 'antd';
import React, {useState} from 'react';
import 'antd/dist/antd.css'
import {Option} from "antd/es/mentions";
import { postReportApiCall, updateReportAPiCall} from "./apiCalls";
import {isEmpty, pick, pickBy} from "lodash";
import './style.css'
import {FormFooter} from "./FormFooter";


const CreateReport = ({metaData, getReports, selectedReportInfo, toggleCreateOrOpenReport}) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const handleCancel = () => {
        setIsModalOpen(false);
        toggleCreateOrOpenReport()
    };

    const onFinish = (values) => {
        values.phone = values.prefix + -+values.phone;
        if (!isEmpty(selectedReportInfo)) {

            let afterRemoveEmptyValues = Object.keys(values).filter((key)=>!!values[key])
            let newValues=pick(values, afterRemoveEmptyValues);


            let payload = {...newValues, _id: selectedReportInfo._id}
            updateReportAPiCall(payload).then((res) => {
                message.success('Report Updated Successfully')
               getReports();
                setIsModalOpen(false)
            })

        }

      else{
            postReportApiCall(values).then((res) => {
               getReports();
                message.success('Report Created Successfully')
                setIsModalOpen(false)
            })
        }


    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
            >
                <Option value="+91">+91</Option>
                <Option value="+41">+41</Option>
            </Select>
        </Form.Item>
    );
    const checkFieldType = (type, field) => {
        switch (type) {
            case 'text':
                return <Input/>
            case 'number':
                return <InputNumber/>
            case 'phone':
                return <Input
                    addonBefore={prefixSelector}
                />
            case 'paragraph':
                return <Input.TextArea/>
            case 'dropdown':
                return <Select
                    allowClear
                >
                    {
                        field.options.map(({_id, label}) => {
                            return <Option value={label}>{label}</Option>
                        })
                    }
                </Select>
            default:
                return <Input/>

        }
    }
    const createFormItem = (field) => {

        return <Form.Item label={field.label || field._id}
                          name={field._id}
                          rules={[{
                              required: field.required,
                          }, {
                              type: field.type === 'text' ? 'string' : field.type === 'dropdown' ? "" : field.type,
                              min: field.minLength || field.min,
                              max: field.maxLength || field.max,
                          }]}
        >
            {checkFieldType(field.type, field)}
        </Form.Item>
    }

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

