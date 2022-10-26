import {Form, Input, InputNumber, Select} from "antd";
import {Option} from "antd/es/mentions";
import React from "react";

export const formatMetaData = (data) => {

    let arrangeData = []
    data.forEach(({type, configuration}) => {
        switch (type) {
            case 'configuration':
                arrangeData = configuration.map((field) => {
                    return {...field, dataIndex: field._id, title: field.label || field._id, key: field._id}
                })
                break;
            default:
                console.log('Only Configuration handle...')

        }
    })
    return arrangeData;
}

export const formatReportsData=(data)=>{
    data.forEach((report)=>{
        report ['key']=report._id
        if(report['hobbies'])report["hobbies"]=report.hobbies.map(h=>` ${h}, `)
    })
    debugger
}

export const  createFormItem = (field) => {

    return <Form.Item label={field.label || field._id}
                      name={field._id}
                      rules={[{
                          required: field.required,
                      }, {
                          type: field.type === 'text' ? 'string' : field.type === 'dropdown' ?
                              field['multi-select'] ? 'array' : '' : field.type,
                          min: field.minLength || field.min,
                          max: field.maxLength || field.max,
                      }]}
    >
        {checkFieldType(field.type, field)}
    </Form.Item>
}
const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select
        >
            <Option value="+91">+91</Option>
            <Option value="+41">+41</Option>
        </Select>
    </Form.Item>
);

export const checkFieldType = (type, field) => {
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
        default:
            return <Input/>

    }
}