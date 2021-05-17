import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Radio, DatePicker, Space } from 'antd';
import moment from 'moment';

const EditUserForm = (props) => {
    const [user, setUser] = useState(props.currentUser);
    useEffect(() => {
        setUser(props.currentUser)
    }, [props])
    const dateFormat = 'DD-MM-YYYY';

    const handelDateChange = (date, dateString) => {
        const initialValue = dateString;
        const name = "joiningDate"
        setUser({ ...user, [name]: initialValue });
    }
    const handelChange = (e, name) => {
        const value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    const regex = {
        "name": /^[a-zA-Z]+[a-zA-Z-]*$/,
        "emailId": /^([_\-0-9a-zA-Z]+)@([_\-0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/,
        "aadharNumber": /^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$/,
        "panNumber": /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
    };

    const conditionsArray = [
        regex.name.test(user.name),
        regex.emailId.test(user.emailId),
        regex.aadharNumber.test(user.aadharNumber),
        regex.panNumber.test(user.panNumber),
    ]

    const handleSubmit = e => {
        e.preventDefault();
        if (!conditionsArray.includes(false) &&  user.joiningDate) {
            props.updateUser(user);
        }
    }
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const tailLayout = {
        wrapperCol: {
            offset: 6,
            span: 16,
        },
    };
    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };

    return (
        <Form
            {...layout}
            onFinish={onFinish}
            style={{ marginTop: 40 }}
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 15,
            }}
            layout="horizontal"
        >
            <Form.Item label="Name"
                initialValue={user.name}
                name="name"
                rules={[
                    {
                        required: true,
                        pattern: new RegExp(regex.name),
                        message: "Please input Valid name!",
                    }
                ]}
            >
                <Input type="text"
                    placeholder="Input Name"
                    onChange={(e) => handelChange(e, "name")} />
            </Form.Item>
            <Form.Item label="E-mail"
                initialValue={user.emailId}
                name="emailId"
                rules={[
                    {
                        type: "email",
                        pattern: new RegExp(regex.emailId),
                        message: "The input is not valid E-mail!"
                    },
                    {
                        required: true,
                        message: "Please input your E-mail!"
                    }
                ]}
            >
                <Input type="text"
                    placeholder="Input Email ID"
                    onChange={(e) => handelChange(e, "emailId")} />
            </Form.Item>
            <Form.Item label="AadharNumber"
                initialValue={user.aadharNumber}
                name="aadharNumber"
                rules={[
                    {
                        required: true,
                        pattern: new RegExp(regex.aadharNumber),
                        message: "Please input your Aadhar Number!"
                    }
                ]}
            >
                <Input type="text"
                    onChange={(e) => handelChange(e, "aadharNumber")}
                    placeholder="Input AadharNumber"
                />
            </Form.Item>
            <Form.Item label="PanNumber"
                initialValue={user.panNumber}
                name="panNumber"
                rules={[
                    {
                        required: true,
                        pattern: new RegExp(regex.panNumber),
                        message: "Please input your Pan Number!"
                    }
                ]}
            >
                <Input type="text"
                    placeholder="Input Pan Number"
                    onChange={(e) => handelChange(e, "panNumber")} />
            </Form.Item>
            <Form.Item label="employeeType"
                initialValue={user.employeeType}
                name="employeeType"
            >
                <Radio.Group
                    onChange={(e) => handelChange(e, "employeeType")} >
                    <Radio value="Full-Time">Full-Time</Radio>
                    <Radio value="Part-Time">Part-Time</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="joiningDate" name="joiningDate"
                initialValue={moment(user.joiningDate, dateFormat)}
                rules={[
                    {
                        required: true,
                        message: 'Please input joining Date',
                    },
                ]}
            >
                <DatePicker
                    format={dateFormat}
                    onChange={(date, dateString) => handelDateChange(date, dateString)} />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Space>
                    <Button htmlType="submit" type="primary" onClick={handleSubmit} >Save</Button>
                    <Button htmlType="submit" type="danger" onClick={props.onCancel} >Cancel</Button>
                </Space>
            </Form.Item>
        </Form>
    )
}

export default EditUserForm;