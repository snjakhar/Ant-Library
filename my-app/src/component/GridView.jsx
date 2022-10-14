import 'antd/dist/antd.css'
import React, {useEffect, useState} from "react";
import {deleteReportApiCall, getMetaDataApiCall, getReportsApiCall} from "./apiCalls";
import {formatMetaData} from "./helper";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {Button, message, Popconfirm, Table} from "antd";
import CreateReport from "./CreateReport";
import {skeletonGenerator} from "./Skelton";

const LOGO_URL='https://uploads-ssl.webflow.com/5e9ab1a2b27cf6d2e5949d84/5eac683ef43e864e24da506a_logo-hubbler.svg'

export const GridView = () => {

    const [metaData, setMetaData] = useState([]);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true)
    const [selectedReportInfo, setSelectedReportInfo] = useState({})
    const [openReport, setOpenReport] = useState(false)

    useEffect(() => {
        getMetaDataApiCall().then(({data: {result}}) => {
            setMetaData([...formatMetaData(result), addActionButton()])
            getReports()
        }).catch((error) => {
            console.log('Error In Meta Api Call', error)
        })
    }, [])

    const addActionButton = () => {
        return {
            key: "actions",
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => {
                            setSelectedReportInfo(record)
                            toggleCreateOrOpenReport(p => !p)
                        }}/>
                        <Popconfirm title="Sure to delete?" onConfirm={() => deleteReport(record._id)}>
                            <DeleteOutlined style={{color: "red", marginLeft: 12}}/>
                        </Popconfirm>
                    </>
                );
            },
        }
    }

    const getReports =  () => {
        setLoading(true)
        getReportsApiCall().then(({data: {result}}) =>{
            setReports(result)
            setLoading(false)
        })
    }

    const deleteReport = (id) =>{
        deleteReportApiCall(id).then(({data: {success}}) =>
        {   message.success('Report deleted successfully')
            getReports();
        }
        )
    }

    const toggleCreateOrOpenReport = () => setOpenReport(p => !p)

    const createReportProps={
        metaData,
        getReports,
        selectedReportInfo,
        toggleCreateOrOpenReport,
    }

    return <div>
        <div className={'hubbler'}><img src={LOGO_URL} alt={'hubbler'}/></div>
        <Table
            scroll={{y: 400}}
            className={'table-box'} bordered={true}
            columns={metaData} dataSource={loading? skeletonGenerator(metaData.map(({dataIndex})=>dataIndex),10) :reports} pagination={false}
        />
        <Button
            className={'create-report-button'} type="primary" shape="circle"
            onClick={() => {
                setSelectedReportInfo({})
                toggleCreateOrOpenReport()
            }}
        >
            <PlusOutlined/>
        </Button>
        {openReport && <CreateReport {...createReportProps}/>}
    </div>
}