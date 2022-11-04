import {Table} from "antd";
import React, {useState} from "react";
import {CreateProductReport} from "./CreateProductReport";

export const ProductGridView=({metaData,reports,getCurrentAddedProductsData,editMode=false,allReports})=>{
    const [pReports,setPReports]=useState(reports)
    const updateProductReports=(values)=>{
        values.key=values.product_name;
        setPReports([...pReports,values])
        getCurrentAddedProductsData(pReports)
    }
    return <>
        <Table
            bordered={true}
            className={'prodcut-table'}
            columns={metaData}
            dataSource={pReports}
            pagination={false}
        />
        {editMode&&<CreateProductReport updateProductReports={updateProductReports} metaData={metaData} allReports={allReports}/>}
    </>
}