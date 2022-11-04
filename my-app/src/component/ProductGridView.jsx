import {Table} from "antd";
import React, {useState} from "react";
import {CreateProductReport} from "./CreateProductReport";

export const ProductGridView=({metaData,reports,getCurrentAddedProductsData})=>{
    const [pReports,setPReports]=useState(reports)
    const updateProductReports=(values)=>{
        values.key=values.product_name;
        setPReports([...pReports,values])
        getCurrentAddedProductsData(pReports)
    }
    return <>
        <Table
            className={'table-box'} bordered={true}
            columns={metaData}
            dataSource={pReports}
            pagination={false}
        />
        {!reports.length&&<CreateProductReport updateProductReports={updateProductReports}/>}
    </>
}