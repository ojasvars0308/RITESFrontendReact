import React, { useState } from 'react'
import Btn from '../../components/DKG_Btn'
import { ReactComponent as Logo } from "../../assets/icons/RITES_logo.svg";
import FormBody from '../../components/DKG_FormBody'
import FormInputItem from '../../components/DKG_FormInputItem'
import { useDispatch } from 'react-redux';
import { login } from '../../store/slice/authSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleFormSubmit = async () => {
    await dispatch(login()).unwrap()
    navigate('/dashboard')
  }

  const [formData, setFormData] = useState(
    {
      empId: '', password: ''
    }
  )

  const handleFormValueChange = (fieldName, value) => {
    setFormData(prev=> {
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }
  return (
    <>
      <header className='bg-emerald-900 text-offWhite p-4 w-full'>
        <h1>Log In</h1>
      </header>

      <main className='p-4 flex flex-col h-[70vh] justify-center items-center gap-4'>
        <Logo width={200} height={200} />
        
        <FormBody onFinish={handleFormSubmit} initialValues={formData}>
          <FormInputItem label="Employee ID" placeholder="123456" name='empId' onChange={handleFormValueChange} required />
          <FormInputItem label="Password" placeholder="*****" name='password' onChange={handleFormValueChange} required />

          <div className='flex justify-center mt-4'>
            <Btn htmlType='submit'>Save</Btn>
          </div>
        </FormBody>

        <div className='flex items-center'>
          <h2 className='text-gray-500'>Account credentials unavailable ? <br /> Request Admin for your credentials.</h2>
        </div>
      </main>
    </>
  )
}

export default Login
