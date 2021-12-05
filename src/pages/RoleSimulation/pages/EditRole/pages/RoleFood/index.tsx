import {
  BorderOutlined,
  CheckCircleOutlined,
  CoffeeOutlined,
  DeleteOutlined,
  FileAddOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { Input, InputNumber, Modal, Select } from 'antd';
import React, { FC, useState } from 'react';
import { nanoid } from 'nanoid';

import './index.less';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { foodConfigurationState } from '@/store/food-configuration';
import SplitLine from '../../components/SplitLine';
import { IProps } from '../types';
const { Option } = Select;

const RoleFood: FC<IProps> = (props) => {
  /** 引入料理清单 */
  const foodConfiguration = useRecoilState(foodConfigurationState);
  const setFoodConfiguration = useSetRecoilState(foodConfigurationState);
  /** 暂存当前正在编辑的料理信息 */
  const currentConfiguration = { name: '', id: '', foodList: [] };
  /** 暂存料理名称 */
  const [newConfigurationName, setNewConfigurationName] = useState('');
  /** 已选择的料理项 */
  const [choseItem, setChoseItem] = useState(1);
  /** 弹窗显示状态 */
  const [newWindow, setNewWindow] = useState(false);
  const [modifyWindow, setModifyWindow] = useState(false);
  const [deleteWindow, setDeleteWindow] = useState(false);
  /** 料理列表 */
  const [foodList, setFoodList] = useState([
    { name: 'HP上限+', value: 0, chose: false },
    { name: 'MP上限+', value: 0, chose: false },
    { name: 'STR+', value: 0, chose: false },
    { name: 'DEX+', value: 0, chose: false },
    { name: 'INT+', value: 0, chose: false },
    { name: 'VIT+', value: 0, chose: false },
    { name: 'AGI+', value: 0, chose: false },
    { name: 'ATK+', value: 0, chose: false },
    { name: 'MATK+', value: 0, chose: false },
    { name: '武器ATK+', value: 0, chose: false },
    { name: '物理抗性+', value: 0, chose: false },
    { name: '魔法抗性+', value: 0, chose: false },
    { name: '仇恨值+', value: 0, chose: false },
    { name: '仇恨值-', value: 0, chose: false },
    { name: '攻击MP回复+', value: 0, chose: false },
    { name: '暴击率+', value: 0, chose: false },
    { name: '命中+', value: 0, chose: false },
    { name: '回避+', value: 0, chose: false },
    { name: 'DEF+', value: 0, chose: false },
    { name: 'MDEF+', value: 0, chose: false },
    { name: '掉宝率+', value: 0, chose: false },
    { name: '物理屏障+', value: 0, chose: false },
    { name: '魔法屏障+', value: 0, chose: false },
    { name: '百分比屏障+', value: 0, chose: false },
    { name: '对无属性伤害+', value: 0, chose: false },
    { name: '对火属性伤害+', value: 0, chose: false },
    { name: '对水属性伤害+', value: 0, chose: false },
    { name: '对地属性伤害+', value: 0, chose: false },
    { name: '对风属性伤害+', value: 0, chose: false },
    { name: '对光属性伤害+', value: 0, chose: false },
    { name: '对暗属性伤害+', value: 0, chose: false },
    { name: '对火抗性+', value: 0, chose: false },
    { name: '对水抗性+', value: 0, chose: false },
    { name: '对地抗性+', value: 0, chose: false },
    { name: '对风抗性+', value: 0, chose: false },
    { name: '对光抗性+', value: 0, chose: false },
    { name: '对暗抗性+', value: 0, chose: false },
  ]);

  /** 料理选择并存入暂存 */
  const handleChange = (value: string) => {
    console.log('gdx: ', value);
    const currentFood = foodConfiguration[0].filter((item) => item.id === value);
    currentConfiguration.name = currentFood[0].name;
    currentConfiguration.id = currentFood[0].id;
    currentConfiguration.foodList = currentFood[0].foodList;
    console.log('gdx: ', currentConfiguration);
  };

  /** 动态生成配置表 */
  const foodItems = () =>
    foodConfiguration[0].map((item) => {
      const { name, id } = item;
      return (
        <Option key={id} value={id}>
          {name}
        </Option>
      );
    });

  /** 修改选择状态 */
  const changeChose = (name) => () => {
    const newFoodList = foodList.map((item) => {
      if (choseItem <= 5 && !item.chose && item.name === name) {
        item.chose = true;
        setChoseItem(choseItem + 1);
        return item;
      } else if (item.chose && item.name === name) {
        item.chose = false;
        setChoseItem(choseItem - 1);
        return item;
      }
      return item;
    });
    setFoodList(newFoodList);
  };

  /** 料理等级 */
  const changeValue = (name) => (value) => {
    const newFoodList = foodList.map((item) => {
      if (item.name === name) {
        item.value = value;
        return item;
      }
      return item;
    });
    setFoodList(newFoodList);
  };

  /** 动态生成已选列表 */
  const foodListChose = () =>
    foodList
      .filter((item) => item.chose)
      .map((item) => {
        const { name, value } = item;
        return (
          <div key={name} className="page-food__chose-item">
            <CheckCircleOutlined style={{ border: 'none' }} />
            <span className="chose-item__name">
              {name}
              {value}
            </span>
            <button className="chose-item__delete" onClick={changeChose(name)}>
              <DeleteOutlined />
            </button>
            <InputNumber
              className="chose-item__data"
              min={0}
              max={10}
              defaultValue={value}
              onChange={changeValue(name)}
            />
          </div>
        );
      });

  /** 动态生成未选列表 */
  const foodListUnChose = () =>
    foodList
      .filter((item) => !item.chose)
      .map((item) => {
        const { name, value } = item;
        return (
          <button key={name} className="page-food__chose-item item-btn" onClick={changeChose(name)}>
            <BorderOutlined style={{ border: 'none' }} />
            <span className="chose-item__name">
              {name}
              {value}
            </span>
            <InputNumber
              className="chose-item__data"
              min={0}
              max={10}
              defaultValue={value}
              onChange={changeValue(name)}
            />
          </button>
        );
      });

  /** 创建新料理配置 */
  const createNewList = () => {
    setFoodConfiguration((oldTodoList) => [
      ...oldTodoList,
      {
        id: nanoid(),
        name: newConfigurationName,
        foodList: [],
      },
    ]);
    setNewWindow(false);
    setNewConfigurationName('');
  };

  /** 修改配置名称 */
  const modifyListName = () => {
    setFoodConfiguration((oldTodoList) =>
      oldTodoList.map((item) => {
        const { id, foodList } = item;
        if (id === currentConfiguration.id) {
          currentConfiguration.name = newConfigurationName;
          return { name: newConfigurationName, id, foodList };
        }
        return item;
      }),
    );
    console.log('修改名称: ', foodConfiguration);
    setModifyWindow(false);
    setNewConfigurationName('');
  };

  /** 删除配置 */
  const deleteList = () => {};

  return (
    <section className="edit-role__page-food">
      <Modal
        title="新建配置"
        visible={newWindow}
        onOk={createNewList}
        onCancel={() => setNewWindow(false)}
        okText="确认"
        cancelText="取消"
      >
        <Input placeholder="新配置名称" onChange={(e) => setNewConfigurationName(e.target.value)} />
      </Modal>
      <Modal
        title="修改配置名"
        visible={modifyWindow}
        onOk={modifyListName}
        onCancel={() => setModifyWindow(false)}
        okText="确认"
        cancelText="取消"
      >
        <Input placeholder="新配置名称" onChange={(e) => setNewConfigurationName(e.target.value)} />
      </Modal>
      <Modal
        title="删除配置"
        visible={deleteWindow}
        onOk={deleteList}
        onCancel={() => setDeleteWindow(false)}
        okText="确认"
        cancelText="取消"
      >
        <p>确认删除该配置吗？</p>
      </Modal>
      <div className="page-food__container" style={{ marginTop: '0' }}>
        <SplitLine icon={<CoffeeOutlined />} title="料理配置" />
        <section className="page-food__name">
          <Select
            defaultValue="未选择配置"
            onChange={handleChange}
            className="page-food__name-chose"
          >
            {foodItems()}
          </Select>
          <div className="page-food__name-btn">
            <button onClick={() => setNewWindow(true)}>
              <FileAddOutlined style={{ padding: '0 3px' }} />
              新建配置
            </button>
            <button onClick={() => setModifyWindow(true)}>
              <FormOutlined style={{ padding: '0 3px' }} />
              修改名称
            </button>
            <button className="page-food__name-delete" onClick={() => setDeleteWindow(true)}>
              <DeleteOutlined style={{ padding: '0 3px' }} />
              删除配置
            </button>
          </div>
        </section>
      </div>
      <section className="page-food__container chose-window">
        <SplitLine icon={<CoffeeOutlined />} title="已选料理" />
        <section className="page-food__chose-container">{foodListChose()}</section>
      </section>
      <section className="page-food__container">
        <SplitLine icon={<CoffeeOutlined />} title="备选料理" />
        <section className="page-food__chose-container">{foodListUnChose()}</section>
      </section>
    </section>
  );
};

export default RoleFood;
