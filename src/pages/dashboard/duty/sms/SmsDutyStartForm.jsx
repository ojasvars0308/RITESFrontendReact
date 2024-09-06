import React, { useCallback, useEffect, useState } from 'react'
import SubHeader from '../../../../components/SubHeader'
import CustomDatePicker from '../../../../components/CustomDatePicker'
import FormBody from '../../../../components/FormBody'
import FormDropdownItem from '../../../../components/FormDropdownItem'
import Btn from '../../../../components/Btn'
import { message } from 'antd'
import data from '../../../../utils/db.json'
import { useNavigate } from 'react-router-dom'

// console.log("DATA DUTY START: ", shiftList)

const railGradeList = [
  {
    key: 'R260',
    value: 'R260'
  },
  {
    key: '880',
    value: '880'
  },
  {
    key: '1175HT',
    value: '1175HT'
  },
  {
    key: '1080HH',
    value: '1080HH'
  },
]
const SmsDutyStartForm = () => {
  const [formData, setFormData] = useState(
    {
      date: '',
      shift: '',
      sms: '',
      railGrade: ''
    }
  )
  const [shiftList, setShiftList] = useState([])
  const [smsList, setSmsList] = useState([])

  const navigate = useNavigate()

  const populateShiftSmsList = useCallback(() => {
    setShiftList([...data.shiftList])
    setSmsList([...data.smsList])
  }, [])

  useEffect(() => {
    populateShiftSmsList()
  }, [populateShiftSmsList])


  const handleChange = (fieldName, value) => {
    setFormData(prev => {
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  const handleFormSubmit = () => {
    message.success('SMS duty start triggered.')
    navigate('/sms/dutyEnd')
  }
  return (
    <>
    <SubHeader title='SMS - Duty Start' link='/' />
    <FormBody
      initialValues={formData}
      onFinish={handleFormSubmit}
    >
      <div className="grid grid-cols-2">
      <CustomDatePicker label='Date' name='date' value={formData?.date} onChange={handleChange}/>
      <FormDropdownItem label='Shift' dropdownArray={shiftList} name='shift' onChange={handleChange} valueField='key' visibleField='value' />
      </div>
      <FormDropdownItem label="SMS" name='sms' dropdownArray={smsList} visibleField='value' valueField='key' onChange={handleChange} />
      <FormDropdownItem label="Rail Grade" name='railGrade' dropdownArray={railGradeList} visibleField='value' valueField='key' onChange={handleChange} />
      <Btn htmlType='submit'>Submit</Btn>
    </FormBody>
      
    </>
  )
}

export default SmsDutyStartForm
