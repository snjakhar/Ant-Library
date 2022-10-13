import {Button, Form, Space} from "antd";
import {isEmpty} from "lodash";
import React from "react";

export const FormFooter = ({selectedReportInfo, handleCancel}) => {

    return <Form.Item wrapperCol={{span:16, offset: 8}}>
        <Space
        >
            <Button type="primary" htmlType="submit">
                {isEmpty(selectedReportInfo) ? "Submit" : "Update"}
            </Button>
            <Button type="primary" onClick={handleCancel}>
                Cancel
            </Button>
        </Space>
    </Form.Item>
}