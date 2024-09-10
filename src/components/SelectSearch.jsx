import React from 'react';
import { Form, Select } from 'antd';

const SelectSearch = ({ label, name, value, onChange, required, placeholder, className }) => (
    <Form.Item label={label} name={name} rules={[{ required: required ? true : false, message: 'Please input your value!' }]}>
        <Select
            showSearch
            value={value}
            placeholder={placeholder}
            filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
            {
                value: '1',
                label: 'Jack',
            },
            {
                value: '2',
                label: 'Lucy',
            },
            {
                value: '3',
                label: 'Tom',
            },
            ]}
            className={className}
            required
        />
    </Form.Item>
);
export default SelectSearch;