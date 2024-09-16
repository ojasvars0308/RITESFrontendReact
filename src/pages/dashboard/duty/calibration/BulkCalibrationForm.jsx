import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../components/DKG_SubHeader'
import FormDropdownItem from '../../../../components/DKG_FormDropdownItem'
import FormBody from '../../../../components/DKG_FormBody'
import CustomDatePicker from '../../../../components/DKG_CustomDatePicker'
import { message, Table } from 'antd'
import { useNavigate } from 'react-router-dom';

import filter from '../../../../assets/icons/filter.svg'
import DisplayIcon from '../../../../components/DKG_DisplayIcon'
import Search from '../../../../components/DKG_Search'
import Btn from '../../../../components/DKG_Btn'

const instrumentMapping = {
  'Measuring Instrument': ['Vernier', 'Micrometer', 'Feeler Gauge', 'Weighing Scale', 'Measuring Tape', 'Measuring Scale'],
  'Testing Machines': ['Hydris', 'Leco / Gas Analyser', 'Spectro', 'Tensile Testing Machine', 'Hardness', 'TLT Machine', 'FWT System', 'FBW M/C'],
  'Gauge (Working)': [ "Head & Web Gauge", "Height Gauge", "Fish Gauge", "Foot Gauge", "Asymmetry +", "Asymmetry -", "Toe Thk +", "Toe Thk -", "Crown (F)", "Crown (M)", "Foot Concavity", "Hole - Base", "Hole - End", "Right Angle", "FWT Bearer Head", "FWT Striker Head" ],
  'Gauge (Master)': [],
  'Straight Edge': ["3m","2m","1.5m","1m","0.85m","100mm"],
  'Templates': ['FWT Bearer Head', 'FWT Striker Head']
}

const railSectionList = [
  {
    key: '60 E1 - Prime',
    value: '60 E1 - Prime'
  },
  {
    key: '60 E1 - IU',
    value: '60 E1 - IU'
  },
  {
    key: 'IRS 52 - Prime',
    value: 'IRS 52 - Prime'
  },
  {
      key: 'IRS 52 - IU',
      value: 'IRS 52 - IU'
  },
  {
      key: '60E1A1 - Prime',
      value: '60E1A1 - Prime'
  },
  {
      key: '60E1A1 - IU',
      value: '60E1A1 - IU'
  },
  {
      key: 'NA',
      value: 'NA'
  },
]

const resultList = [
  {
    key: 'OK',
    value: 'OK'
  },
  {
    key: 'Not OK',
    value: 'Not OK'
  },
  {
    key: 'Discarded',
    value: 'Discarded'
  }
]

const BulkCalibrationForm = () => {
  const [shiftDetails, setShiftDetails] = useState(null);
  const [instrumentCategoryList, setInstrumentCategoryList] = useState([])
  const [instrumentList, setInstrumentList] = useState([])
  const [data, setData] = useState([
    {
      key: '1',
      serialNumber: '',
    },
  ]);

  const handleAddRow = () => {
    const newRow = {
      key: `${data.length + 1}`,
      serialNumber: '',
    };
    setData([...data, newRow]);
  };

  const navigate = useNavigate();

  const handleSelectChange = (value, key) => {
    const updatedData = data.map((row) => {
      if (row.key === key) {
        return { ...row, serialNumber: value };
      }
      return row;
    });
    setData(updatedData);
  };

  const columns = [
    {
      title: 'S.No.',
        dataIndex: 'key',
        key: 'key',
        render: (text, record, index) => index + 1,
    },
    {
      title: 'Serial Number',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      render: (text, record) => (
        <FormDropdownItem name='railSection' dropdownArray={railSectionList} visibleField='value' valueField='key' onChange={handleSelectChange} />
      )
    }
  ]

  const [formData, setFormData] = useState({
    instrumentCategory: null,
    instrument: null, 
    instrumentDetail: '',
    railSection: null,
    serialNumber: '',
    calibrationDate: new Date(),
    calibrationUptoDate: '',
  })

  const handleFormSubmit = () => {
    console.log("FORM SUBMIT CALLED")
    message.success('Form Submit Called')
  }

  const populateData = () => {
    const instrumentCategoryList = Object.keys(instrumentMapping).map(inst => {
      return {
        key: inst,
        value: inst
      }
    })
    setInstrumentCategoryList([...instrumentCategoryList])
  }
  
  const handleChange = (fieldName, value) => {
    setFormData(prev=>{
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  useEffect(()=> {
      populateData()
  }, [])

  useEffect(()=>{
  if(instrumentMapping[formData.instrumentCategory]){
      const instrumentList = instrumentMapping[formData.instrumentCategory].map(inst => {
      return {
          key: inst,
          value: inst
      }
      })
      setInstrumentList([...instrumentList])
  }
  }, [formData.instrumentCategory, instrumentCategoryList])

  useEffect(() => {
    fetch('http://localhost:8000/shiftDetails')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
            setShiftDetails([...data])
        })
        .catch(error => console.error('Error fetching shift details:', error));
 }, []);

 const handleClick = (e) => {
  e.preventDefault();
  navigate('/calibrationList');
  }

  return (
    <>
      <SubHeader title='Bulk Re-Calibration List' link='/calibrationList' />

      <div className='flex mt-2'>
        {shiftDetails && 
            <div className='flex flex-wrap mb-4'>
                <h6 className='font-medium mr-5 mt-2'>Date - <span className='font-light'>{shiftDetails[0].date}</span></h6>
                <h6 className='font-medium mr-5 mt-2'>Shift - <span className='font-light'>{shiftDetails[0].shift}</span></h6>
            </div>
        }
      </div>

      <hr />

      <FormBody
        initialValues={formData}
        onFinish={handleFormSubmit}
      >
        <div className='grid grid-cols-2'>
            <div className='flex items-center'>
                <DisplayIcon 
                    src={filter}
                    alt='Filter'
                    width={24}
                    height={24}
                    className='mr-4'
                />
                
                <FormDropdownItem label='Instrument Category' name='instrumentCategory' dropdownArray={instrumentCategoryList} valueField={'key'} visibleField={'value'} onChange={handleChange} required />
            </div>

            <div className='flex items-center'>
                <DisplayIcon 
                    src={filter}
                    alt='Filter'
                    width={24}
                    height={24}
                    className='mr-4'
                />
                
                <FormDropdownItem label ='Instrument' name='instrument' dropdownArray={instrumentList} valueField={'key'} visibleField={'value'} onChange = {handleChange} required />
            </div>
        </div>

        <div className='grid grid-cols-2'>
            {
                (formData.instrumentCategory === 'Gauge (Working)' || formData.instrumentCategory === 'Gauge (Master)') && 
                    <div className='flex items-center'>
                        <DisplayIcon 
                            src={filter}
                            alt='Filter'
                            width={24}
                            height={24}
                            className='mr-4'
                        />

                        <FormDropdownItem label='Rail Section' name='railSection' dropdownArray={railSectionList} visibleField='value' valueField='key' onChange={handleChange} required />
                    </div>
            }
        </div>

        <Search 
            className='pl-10 pr-4 py-2 rounded-full bg-slate-200 focus:outline-none w-44 text-gray-500 text-sm mb-2'
            placeholder='Search By S. No.'
            svgClass="absolute left-2 top-3 h-4 w-4 text-gray-500"
        />

        <hr />

        <div className='flex flex-col mb-4'>
          <div className='mt-6'>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
          </div>

          <Btn htmlType='submit' className='bg-red-500 hover:!bg-slate-700 w-44 md:w-[initial] text-white mt-4' onClick={handleAddRow}>Add Row / Instrument</Btn>
        </div>

        <hr />

        <div className='flex flex-col mt-4'>
          <FormDropdownItem label ='Calibration Result' name='calibrationResult' dropdownArray={resultList} valueField='key' visibleField='value' onChange = {handleChange} required />
          <CustomDatePicker label='Calibration Valid upto Date' name='calibrationUptoDate' value={formData?.calibrationUptoDate} onChange={handleChange} required />
        </div>
        <Btn htmlType='submit' onClick={handleClick}>Save</Btn>
      </FormBody>
    </>
  )
}

export default BulkCalibrationForm