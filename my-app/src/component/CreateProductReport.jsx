import {Button, Form, Input, InputNumber, Popover} from 'antd';
import React, { useState } from 'react';

export const CreateProductReport = ({updateProductReports,metaData,allReports}) => {

    const [open, setOpen] = useState(false);
    const handleOpenChange = (newOpen) => setOpen(newOpen);

    return (
        <>
            <Popover
                content={<ProductForm data={metaData} addProductReports={updateProductReports} allReports={allReports}/>}
                placement={'right'}
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
            >
                <Button style={{float:'right'}} type="primary" >Add</Button>
            </Popover>
        </>
    );
};
let sku='';
const ProductForm = ({data,addProductReports,allReports}) => {

    const onFinish=(values)=>addProductReports(values)

    const onChange=(e)=>{
        // if(e.target.id==='basic_sku')sku=e.target.value;
        // console.log(e)
        console.log(e)
    }

    const isUnique=()=>{

    }
    return <Form
        name="basic"
        labelCol={{
            span: 12,
        }}
        wrapperCol={{
            span: 10,
        }}
        onFinish={onFinish}
        onKeyUp={onChange}
    >
        {
            data.map((field)=>{
                return  <Form.Item
                    label={field.label}
                    name={field._id}
                    rules={field._id!=='sku'?[
                        {
                            required: field.required
                        }
                    ]:[{
                        required:true,
                        type:'number',
                        message:"Enter Unique Number"
                    }]}
                >
                    {field._id==='sku'?<InputNumber/>:(field.type==='text'?<Input/>:<InputNumber/>)}
                </Form.Item>
            })
        }
        <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
        >
            <Button type="primary" htmlType="submit">
                Save
            </Button>
        </Form.Item>
    </Form>
}