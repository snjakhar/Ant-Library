import {Button, Form, Input, InputNumber, Popover} from 'antd';
import React, { useState } from 'react';
import {ProductGridView} from "./ProductGridView";

const data=[
    {
        _id:"product_name",
        label:"Product Name",
        type:"text",
        required:true
    },
    {
        _id:"sku",
        label:"Stock Keeping Unit (SKU)",
        type:"text",
        required:true
    },
    {
        _id:"price",
        label:"Price per Qty",
        type:"number",
        required:true
    },
    {
        _id:"quantity",
        label:"Quantity",
        type:"number",
        required:true
    }
]

export const CreateProductReport = ({updateProductReports}) => {

    const [open, setOpen] = useState(false);



    const handleOpenChange = (newOpen) => setOpen(newOpen);

    const addProductReports=(values)=>{
        updateProductReports(values)
    }


    return (
        <>
            <Popover
                content={<ProductForm data={data} addProductReports={addProductReports}/>}
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
const ProductForm = ({data,addProductReports}) => {

    const onFinish=(values)=>{
        console.log(values)
        addProductReports(values)
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
    >
        {
            data.map((field)=>{
                return  <Form.Item
                    label={field.label}
                    name={field._id}
                    rules={[
                        {
                            required: field['required'],
                        },
                    ]}
                >
                    {field.type==='text'?<Input/>:<InputNumber/>}
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