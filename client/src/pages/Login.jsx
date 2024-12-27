import React from 'react'
import { Form, Input, message } from "antd"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/login", values);
      if(res.data.success){
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        console.log(res);
        navigate("/")
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message, "something went wrong");
    }
  }
  return (
    <>
      <div className='form-container'>
        <Form layout="vertical" onFinish={onfinishHandler} className='register-form'>
          <h1>Login Form</h1>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          
          <Link to="/register" className='m-2 '> Don't have an account? </Link> {/* <Link to="/login">Login</Link> it redirects to login page */}

          <button className='btn btn-primary' type='submit'>Login</button>
        </Form>
      </div>
    </>
  )
}

export default Login