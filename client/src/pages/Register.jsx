import React from 'react';
import { Form, Input , message } from "antd";
import "../styles/RegisterStyles.css";
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const onfinishHandler = async(values) => {
    try{
      // const res = await axios.post("api/v1/user/register", values);
      const res = await axios.post("http://localhost:8080/api/v1/user/register", values);
      if(res.data.success){
        message.success("Register Successfully!");
        navigate("/login");
      }else{
        message.error(res.data.message)
      }res
    }catch(error){
      console.log(error)
      message.error("Something went wrong")
    }


  }
  return (
    <>
      <div className='form-container'>
        <Form layout="vertical" onFinish={onfinishHandler} className='register-form'>
          <h3 className='text-center'>Register Form</h3>

          <Form.Item label="Name" name="name">
            <Input type="text" required placeholder="Enter your name" />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input type="email" required placeholder="Enter your email" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type="password" required placeholder="Enter your password" />
          </Form.Item>
          <Link to="/login" className='m-2 '> Already have an account? </Link> {/* <Link to="/login">Login</Link> it redirects to login page */}
          <button className='btn btn-primary' type='submit'>Register</button>
        </Form>
      </div>
    </>
  )
}

export default Register 