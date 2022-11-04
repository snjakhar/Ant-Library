import {Button, Form, Input, InputNumber, Popover, Select, Space, Tag} from "antd";
import {Option} from "antd/es/mentions";
import React from "react";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {isArray} from "lodash";
import {ProductModal} from "./ProductModal";
import {ProductGridView} from "./ProductGridView";

export const formatMetaData = (data) => {

    let arrangeData = []
    data.forEach(({type, configuration}) => {
        switch (type) {
            case 'configuration':
                arrangeData = configuration.map((field) => {
                    if(field['repeating']||field['multi-select'])
                        return {...field, dataIndex: field._id, title: field.label||field._id, key: field._id,width:field['repeating']?"13%":null,
                               render:(values)=>{
                                        if(isArray(values)){
                                            return values.map(v=><Tag color="geekblue">{v}</Tag>)
                                        }
                               }

                    }
                    else if (field.type === 'repeating') {
                        return {
                            ...field, dataIndex: field._id, title: field.label || field._id, key: field._id,
                            render: (record) => isArray(record) &&
                                <ProductModal productMetaData={formatProductMetaData(field.fields)}
                                              productReports={formatProductsReports(record)}/>
                        }
                    }
                    return {...field, dataIndex: field._id, title: field.label || field._id, key: field._id}
                })
                break;
            default:
                console.log('Only Configuration handle...')

        }
    })
    return arrangeData;
}

export const formatProductsReports=(data=[])=>{

    return data.map((report)=>{
        return {...report,key:report._id}
    })
}

export const formatReportsData=(data)=>{

    return data.map((report)=>{
        return report.key=report._id;
    })
}

export const formatProductMetaData=(data)=>{
   let fData=data.map((field)=>{
        return {...field,dataIndex:field._id,title:field.label,key:field._id}
    })
    fData.pop();
    return fData;
}

export const  createFormItem = (field,getCurrentAddedProductsData,selectedReportInfo,reports) => {

    return <Form.Item label={field.label || field._id}
                      name={field._id}
                      rules={[{
                          required: field.type==='repeating'?false:field.required,
                      }, {
                          type: field.type === 'text' ? 'string' : field.type === 'dropdown' ?
                              field['multi-select'] ? 'array' : '' :field['repeating']?'array': field.type,
                          min: field.minLength || field.min,
                          max: field.maxLength || field.max,
                      }]}
    >
        {checkFieldType(field.type, field,getCurrentAddedProductsData,selectedReportInfo,reports)}
    </Form.Item>
}
// const prefixSelector = (
//     <Form.Item name="prefix" noStyle>
//         <Select
//         >
//             <Option value="+91">+91</Option>
//             <Option value="+41">+41</Option>
//         </Select>
//     </Form.Item>
// );

export const checkFieldType = (type, field,getCurrentAddedProductsData,selectedReportInfo,reports) => {
    switch (type) {
        case 'text':
            return <Input/>
        case 'number':
            return <InputNumber/>
        case 'phone':
            return  <Form.List name="phone" >
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({key,name},i) => (
                            <Space
                                key={key}
                                align="baseline"
                            >
                                <Form.Item
                                    name={[name]}
                                >
                                    <Input  placeholder="Enter Phone Number" />
                                </Form.Item>
                                {i!==0&&<MinusCircleOutlined onClick={() => remove(name)} />}
                            </Space>
                        ))}
                        <Form.Item>
                            <Button style={{float:"right"}} type={'primary'} shape={"circle"}  onClick={() => add()} icon={<PlusOutlined/>}></Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        case 'email':
            return <Form.List name="email">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name },i) => (
                            <Space
                                key={key}
                                align="baseline"
                            >
                                <Form.Item
                                    name={[name]}
                                >
                                    <Input type={'emFail'} placeholder="Enter Email" />
                                </Form.Item>
                                {i!==0&&<MinusCircleOutlined onClick={() => remove(name)} />}
                            </Space>
                        ))}
                        <Form.Item>
                            <Button style={{float:"right"}}  type={'primary'} shape={"circle"}  onClick={() => add()} icon={<PlusOutlined/>}></Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        case 'paragraph':
            return <Input.TextArea/>
        case 'dropdown':
            if (field["multi-select"]) {
                return <Select
                    allowClear
                    mode="multiple"
                >
                    {
                        field.options.map(({_id, label}) => {
                            return <Option key={_id} value={label}>{label}</Option>
                        })
                    }
                </Select>
            }
            return <Select
                allowClear
            >
                {
                    field.options.map(({_id, label}) => {
                        return <Option value={label}>{label}</Option>
                    })
                }
            </Select>

        case 'repeating':
            return <ProductGridView metaData={formatProductMetaData(field.fields)} reports={formatProductsReports(selectedReportInfo.products)} getCurrentAddedProductsData={getCurrentAddedProductsData} editMode={true} allReports={reports}/>
        default:
            return <Input/>

    }
}



