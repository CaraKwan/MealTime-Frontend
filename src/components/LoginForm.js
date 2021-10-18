import React from "react";
import {Button, Form, Input, message} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {login} from "../utils";

//Display log in page
//Collect user input and execute a login request
class LoginForm extends React.Component {
    state = {
        loading: false
    };

    //step 1, set loading to true
    //step 2, send login request to server(call login api)
    //step 3, deal with login status : login success or fail
    //step 4, set loading back to false
    onFinish = (data) => {
        this.setState({loading: true});
        login(data)
            .then(() => {
                message.success(`Login Successful`);
                this.props.onSuccess();   //Inform of App.js the successful login status
            })
            .catch((err) => {
                message.error(err.message); //Show error message from login api
            })
            .finally(() => {
                this.setState({loading: false});
            });
    };

    render = () => {
        return (
            <Form
                name="normal_login"
                onFinish={this.onFinish}
                style={{
                    width: 300,
                    margin: "auto"
                }}
            >
                <Form.Item
                    name="username"
                    rules={[{required: true, message: "Please input your Username!"}]}
                >
                    <Input prefix={<UserOutlined/>} placeholder="Username"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: "Please input your Password!"}]}
                >
                    <Input.Password prefix={<LockOutlined/>} placeholder="Password"/>
                </Form.Item>

                <Form.Item>
                    {/*submit : call onFinish()*/}
                    <Button type="primary" htmlType="submit" loading={this.state.loading}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        );
    };
}

export default LoginForm;