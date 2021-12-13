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
import {
  ENumericalNumber,
  ENumericalNumberType,
  NUMERICAL_NUMBER,
} from '@/constants/numericalValue';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { foodConfigurationState } from '@/store/food-configuration';
import SplitLine from '../../components/SplitLine';
import { IProps } from '../types';
const { Option } = Select;

const RoleFood: FC<IProps> = (props) => {
  /** 引入料理清单 */
  const [foodConfiguration, setFoodConfiguration] = useRecoilState(foodConfigurationState);
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
    { name: ENumericalNumber.HP, value: 0, chose: false, level: 0, max: 5000, halfIncrement: 400 },
    { name: ENumericalNumber.MP, value: 0, chose: false, level: 0, max: 1000, halfIncrement: 60 },
    { name: ENumericalNumber.STR, value: 0, chose: false, level: 0, max: 30, halfIncrement: 2 },
    { name: ENumericalNumber.DEX, value: 0, chose: false, level: 0, max: 30, halfIncrement: 2 },
    { name: ENumericalNumber.INT, value: 0, chose: false, level: 0, max: 30, halfIncrement: 2 },
    { name: ENumericalNumber.VIT, value: 0, chose: false, level: 0, max: 30, halfIncrement: 2 },
    {
      name: ENumericalNumber.AGI,
      value: 0,
      chose: false,
      level: 0,
      max: 30,
      halfIncrement: 2,
    },
    { name: ENumericalNumber.ATK, value: 0, chose: false, level: 0, max: 100, halfIncrement: 6 },
    { name: ENumericalNumber.MATK, value: 0, chose: false, level: 0, max: 100, halfIncrement: 6 },
    {
      name: ENumericalNumber.WEAPON_ATK,
      value: 0,
      chose: false,
      level: 0,
      max: 100,
      halfIncrement: 6,
    },
    {
      name: ENumericalNumber.PHYSICAL_RESISTANCE,
      value: 0,
      chose: false,
      level: 0,
      max: 50,
      halfIncrement: 4,
    },
    {
      name: ENumericalNumber.MAGIC_RESISTANCE,
      value: 0,
      chose: false,
      level: 0,
      max: 50,
      halfIncrement: 4,
    },
    {
      name: ENumericalNumber.AGGRO_PERCENT,
      value: 0,
      chose: false,
      level: 0,
      max: 100,
      halfIncrement: 6,
    },
    {
      name: ENumericalNumber.AGGRO_PERCENT,
      value: 0,
      chose: false,
      type: '-',
      level: 0,
      max: 100,
      halfIncrement: 6,
    },
    {
      name: ENumericalNumber.ATTACK_MP_RECOVERY,
      value: 0,
      chose: false,
      level: 0,
      max: 30,
      halfIncrement: 2,
    },
    {
      name: ENumericalNumber.CRITICAL_RATE,
      value: 0,
      chose: false,
      level: 0,
      max: 30,
      halfIncrement: 2,
    },
    {
      name: ENumericalNumber.ACCURACY,
      value: 0,
      chose: false,
      level: 0,
      max: 100,
      halfIncrement: 6,
    },
    {
      name: ENumericalNumber.DODGE,
      value: 0,
      chose: false,
      level: 0,
      max: 100,
      halfIncrement: 6,
    },
    { name: ENumericalNumber.DEF, value: 0, chose: false, level: 0, max: 100, halfIncrement: 6 },
    { name: ENumericalNumber.MDEF, value: 0, chose: false, level: 0, max: 100, halfIncrement: 6 },
  ]);

  /** 料理选择并存入暂存 */
  const handleChange = (value: string) => {
    console.log('gdx: ', value);
    const currentFood = foodConfiguration.filter((item) => item.id === value);
    currentConfiguration.name = currentFood[0].name;
    currentConfiguration.id = currentFood[0].id;
    currentConfiguration.foodList = currentFood[0].foodList;
    console.log('gdx: ', currentConfiguration);
  };

  /** 动态生成配置表 */
  const foodItems = () =>
    foodConfiguration.map((item) => {
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

  /** 料理等级与加成 */
  const changeLevel = (name: ENumericalNumber) => (value: number) => {
    const newFoodList = foodList.map((item) => {
      if (item.name === name) {
        item.level = value;
        if (value <= 5) {
          item.value = item.halfIncrement * value;
        } else {
          item.value =
            ((item.max - item.halfIncrement * 5) / 5) * (value - 5) + item.halfIncrement * 5;
        }
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
        const { name, value, type, level } = item;
        return (
          <div key={name} className="page-food__chose-item">
            <CheckCircleOutlined style={{ border: 'none' }} />
            <span className="chose-item__name">
              {NUMERICAL_NUMBER[name].name}
              {type ? type : '+'}
              {value}
              {NUMERICAL_NUMBER[name].type === ENumericalNumberType.Normal ? '' : '%'}
            </span>
            <button className="chose-item__delete" onClick={changeChose(name)}>
              <DeleteOutlined />
            </button>
            <InputNumber
              className="chose-item__data"
              min={0}
              max={10}
              defaultValue={level}
              onChange={changeLevel(name)}
            />
          </div>
        );
      });

  /** 动态生成未选列表 */
  const foodListUnChose = () =>
    foodList
      .filter((item) => !item.chose)
      .map((item) => {
        const { name, value, type, level } = item;
        return (
          <button key={name} className="page-food__chose-item item-btn" onClick={changeChose(name)}>
            <BorderOutlined style={{ border: 'none' }} />
            <span className="chose-item__name">
              {NUMERICAL_NUMBER[name].name}
              {type ? type : '+'}
              {value}
              {NUMERICAL_NUMBER[name].type === ENumericalNumberType.Normal ? '' : '%'}
            </span>
            <InputNumber
              className="chose-item__data"
              min={0}
              max={10}
              defaultValue={level}
              onChange={changeLevel(name)}
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
