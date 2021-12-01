import { CoffeeOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import React, { FC, useState } from 'react';
import { nanoid } from 'nanoid';

import SplitLine from '../../components/SplitLine';
import './index.less';
const { Option } = Select;

const RoleFood: FC = () => {
  const [food, setFood] = useState([{ name: '料理1', id: 'default' }]);

  /** 料理选择框 */
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const foodList = () =>
    food.map((item) => {
      const { name, id } = item;
      return (
        <Option key={id} value={name}>
          {name}
        </Option>
      );
    });

  return (
    <section className="edit-role__page-food">
      <SplitLine icon={<CoffeeOutlined />} title="料理配置" />
      <section>
        <div>
          <span>选择已有配置</span>
          <Select defaultValue="未选择料理" style={{ width: 120 }} onChange={handleChange}>
            {foodList()}
          </Select>
        </div>
        <div>
          <span>创建新的配置</span>
          <Input placeholder="配置名称" />
        </div>
      </section>
    </section>
  );
};

export default RoleFood;
