import {
  BorderOutlined,
  CheckCircleOutlined,
  CoffeeOutlined,
  DeleteOutlined,
  FileAddOutlined,
  FolderOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { Button, Input, InputNumber, Modal, Select } from 'antd';
import React, { FC, useState } from 'react';
import { nanoid } from 'nanoid';

import './index.less';
import {
  EFoodData,
  ENumericalNumber,
  ENumericalNumberType,
  FOOD_DATA,
  NUMERICAL_NUMBER,
} from '@/components/numericalValue';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { foodConfigurationState } from '@/store/food-configuration';
import _ from 'lodash';
import { currentFoodState } from '@/store/current-data';
import SplitLine from '../../components/SplitLine';
import { IProps } from '../types';

const { Option } = Select;
const HALF_MAX_LEVEL = 5;

const RoleFood: FC<IProps> = (props) => {
  /** 默认料理清单 */
  const defaultFoodList = [
    { foodData: EFoodData.HP, userConfiguration: { value: 0, chose: false, level: 0 } },
    { foodData: EFoodData.MP, userConfiguration: { value: 0, chose: false, level: 0 } },
    { foodData: EFoodData.STR, userConfiguration: { value: 0, chose: false, level: 0 } },
    { foodData: EFoodData.DEX, userConfiguration: { value: 0, chose: false, level: 0 } },
    { foodData: EFoodData.INT, userConfiguration: { value: 0, chose: false, level: 0 } },
    { foodData: EFoodData.VIT, userConfiguration: { value: 0, chose: false, level: 0 } },
    { foodData: EFoodData.AGI, userConfiguration: { value: 0, chose: false, level: 0 } },
    { foodData: EFoodData.ATK, userConfiguration: { value: 0, chose: false, level: 0 } },
    { foodData: EFoodData.MATK, userConfiguration: { value: 0, chose: false, level: 0 } },
    {
      foodData: EFoodData.WEAPON_ATK,
      userConfiguration: { value: 0, chose: false, level: 0 },
    },
    {
      foodData: EFoodData.PHYSICAL_RESISTANCE,
      userConfiguration: { value: 0, chose: false, level: 0 },
    },
    {
      foodData: EFoodData.MAGIC_RESISTANCE,
      userConfiguration: { value: 0, chose: false, level: 0 },
    },
    {
      foodData: EFoodData.AGGRO_PERCENT,
      userConfiguration: { value: 0, chose: false, level: 0 },
    },
    {
      foodData: EFoodData.AGGRO_REDUCE_PERCENT,
      userConfiguration: { value: 0, chose: false, level: 0 },
    },
    {
      foodData: EFoodData.ATTACK_MP_RECOVERY,
      userConfiguration: { value: 0, chose: false, level: 0 },
    },
    {
      foodData: EFoodData.CRITICAL_RATE,
      userConfiguration: { value: 0, chose: false, level: 0 },
    },
    { foodData: EFoodData.ACCURACY, userConfiguration: { value: 0, chose: false, level: 0 } },
    { foodData: EFoodData.DODGE, userConfiguration: { value: 0, chose: false, level: 0 } },
    { foodData: EFoodData.DEF, userConfiguration: { value: 0, chose: false, level: 0 } },
    { foodData: EFoodData.MDEF, userConfiguration: { value: 0, chose: false, level: 0 } },
  ];

  /** 引入料理清单 */
  const [foodConfiguration, setFoodConfiguration] = useRecoilState(foodConfigurationState);

  /** 暂存当前正在编辑的料理配置信息 */
  const [currentConfiguration, setCurrentConfiguration] = useState({
    name: '选择已有配置',
    id: '',
    foodList: defaultFoodList,
    choseFoodNumber: 0,
  });

  /** 将当前选中料理更新到 store 中 */
  const [currentChoseFood, setCurrentChoseFood] = useRecoilState(currentFoodState);

  /** 暂存料理名称 */
  const [newConfigurationName, setNewConfigurationName] = useState('');

  /** 已选择的料理项 */
  const [choseItem, setChoseItem] = useState(1);

  /** 弹窗显示状态 */
  const [newWindow, setNewWindow] = useState(false);
  const [modifyWindow, setModifyWindow] = useState(false);
  const [deleteWindow, setDeleteWindow] = useState(false);

  /** 将料理数据更新到 store */
  const changeFoodConfiguration = () => {
    console.log('已更新料理配置');
    const newFoodConfiguration = foodConfiguration.map((item) => {
      if (currentConfiguration.id === item.id) {
        return currentConfiguration;
      }
      return item;
    });
    setFoodConfiguration(newFoodConfiguration);
  };

  /** 料理选择并存入暂存 */
  const handleChange = (value: string) => {
    const currentFood = foodConfiguration.filter((item) => item.id === value);

    setChoseItem(currentFood[0].choseFoodNumber);
    setCurrentConfiguration({
      name: currentFood[0].name,
      id: currentFood[0].id,
      foodList: currentFood[0].foodList,
      choseFoodNumber: currentFood[0].choseFoodNumber,
    });
    setCurrentChoseFood(
      currentConfiguration.foodList.filter((item) => item.userConfiguration.chose),
    );
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
  const changeChose = (name: ENumericalNumber) => () => {
    const newFoodList = currentConfiguration.foodList.map((item) => {
      const { foodData, userConfiguration } = item;
      const { value, level } = userConfiguration;
      if (
        choseItem <= 4 &&
        !item.userConfiguration.chose &&
        FOOD_DATA[item.foodData].name === name
      ) {
        setChoseItem(choseItem + 1);
        return {
          foodData,
          userConfiguration: {
            value,
            chose: true,
            level,
          },
        };
      } else if (item.userConfiguration.chose && FOOD_DATA[item.foodData].name === name) {
        setChoseItem(choseItem - 1);
        return {
          foodData,
          userConfiguration: {
            value,
            chose: false,
            level,
          },
        };
      }
      return item;
    });
    setCurrentConfiguration({
      name: currentConfiguration.name,
      id: currentConfiguration.id,
      foodList: newFoodList,
      choseFoodNumber: choseItem,
    });
    setCurrentChoseFood(
      currentConfiguration.foodList.filter((item) => item.userConfiguration.chose),
    );
  };

  /** 料理等级与加成 */
  const changeLevel = (name: ENumericalNumber) => (value: number) => {
    const newFoodList = currentConfiguration.foodList.map((item) => {
      const { halfIncrement, max } = FOOD_DATA[item.foodData];
      const { chose } = item.userConfiguration;

      if (FOOD_DATA[item.foodData].name === name) {
        if (value <= HALF_MAX_LEVEL) {
          const newValue = halfIncrement * value;
          return { ...item, userConfiguration: { level: value, value: newValue, chose } };
        } else {
          const newValue =
            ((max - halfIncrement * HALF_MAX_LEVEL) / HALF_MAX_LEVEL) * (value - HALF_MAX_LEVEL) +
            halfIncrement * HALF_MAX_LEVEL;
          return { ...item, userConfiguration: { level: value, value: newValue, chose } };
        }
      }
      return item;
    });

    setCurrentConfiguration({
      name: currentConfiguration.name,
      id: currentConfiguration.id,
      foodList: newFoodList,
      choseFoodNumber: currentConfiguration.choseFoodNumber,
    });
    setCurrentChoseFood(newFoodList.filter((item) => item.userConfiguration.chose));
  };

  /** 动态生成已选列表 */
  const foodListChose = () =>
    currentConfiguration.foodList
      .filter((item) => item.userConfiguration.chose)
      .map((item) => {
        const { value, level } = item.userConfiguration;
        const { name, isNegative } = FOOD_DATA[item.foodData];
        return (
          <div key={'food' + item.foodData} className="page-food__chose-item">
            <CheckCircleOutlined style={{ border: 'none' }} />
            <span className="chose-item__name">
              {NUMERICAL_NUMBER[name].name}
              {isNegative ? '-' : '+'}
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
              value={level}
              onChange={changeLevel(name)}
            />
          </div>
        );
      });

  /** 动态生成未选列表 */
  const foodListUnChose = () =>
    currentConfiguration.foodList
      .filter((item) => !item.userConfiguration.chose)
      .map((item) => {
        const { value, level } = item.userConfiguration;
        const { name, isNegative } = FOOD_DATA[item.foodData];
        return (
          <button
            key={'food' + item.foodData}
            className="page-food__chose-item item-btn"
            onClick={changeChose(name)}
          >
            <BorderOutlined style={{ border: 'none' }} />
            <span className="chose-item__name">
              {NUMERICAL_NUMBER[name].name}
              {isNegative ? '-' : '+'}
              {value}
              {NUMERICAL_NUMBER[name].type === ENumericalNumberType.Normal ? '' : '%'}
            </span>
            <InputNumber
              className="chose-item__data"
              min={0}
              max={10}
              value={level}
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
        foodList: defaultFoodList,
        choseFoodNumber: 0,
      },
    ]);
    setNewConfigurationName('');
    setNewWindow(false);
  };

  /** 修改配置名称 */
  const modifyListName = () => {
    setFoodConfiguration((oldTodoList) =>
      oldTodoList.map((item) => {
        const { id, foodList, choseFoodNumber } = item;
        if (id === currentConfiguration.id) {
          return { name: newConfigurationName, id, foodList, choseFoodNumber };
        }
        return item;
      }),
    );
    console.log('修改名称: ', foodConfiguration);
    setModifyWindow(false);
    setCurrentConfiguration({ ...currentConfiguration, name: newConfigurationName });
    setNewConfigurationName('');
  };

  /** 删除配置 */
  const deleteList = () => {
    const newList = foodConfiguration.filter((item) => {
      item.id !== currentConfiguration.id;
    });
    setFoodConfiguration(newList);
    setCurrentConfiguration({
      name: '选择已有配置',
      id: '',
      foodList: defaultFoodList,
      choseFoodNumber: 0,
    });
    setDeleteWindow(false);
    setCurrentChoseFood([]);
  };

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
        <Input
          placeholder="新配置名称"
          value={newConfigurationName}
          onChange={(e) => setNewConfigurationName(e.target.value)}
        />
      </Modal>
      <Modal
        title="修改配置名"
        visible={modifyWindow}
        onOk={modifyListName}
        onCancel={() => setModifyWindow(false)}
        okText="确认"
        cancelText="取消"
      >
        <Input
          placeholder="新配置名称"
          value={newConfigurationName}
          onChange={(e) => setNewConfigurationName(e.target.value)}
        />
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
            value={currentConfiguration.name}
            onChange={handleChange}
            className="page-food__name-chose"
          >
            {foodItems()}
          </Select>
          <div className="page-food__name-btn">
            <Button type="primary" shape="round" onClick={() => setNewWindow(true)}>
              <FileAddOutlined style={{ padding: '0 3px' }} />
              新建
            </Button>
            {currentConfiguration.id === '' || (
              <Button type="primary" shape="round" onClick={changeFoodConfiguration}>
                <FolderOutlined style={{ padding: '0 3px' }} />
                保存
              </Button>
            )}
            {currentConfiguration.id === '' || (
              <Button type="primary" shape="round" onClick={() => setModifyWindow(true)}>
                <FormOutlined style={{ padding: '0 3px' }} />
                改名
              </Button>
            )}
            {currentConfiguration.id === '' || (
              <Button type="primary" shape="round" onClick={() => setDeleteWindow(true)} danger>
                <DeleteOutlined style={{ padding: '0 3px' }} />
                删除
              </Button>
            )}
          </div>
        </section>
      </div>
      {currentConfiguration.id === '' || (
        <section className="page-food__container chose-window">
          <SplitLine icon={<CoffeeOutlined />} title="已选料理" />
          <section className="page-food__chose-container">{foodListChose()}</section>
        </section>
      )}
      {currentConfiguration.id === '' || (
        <section className="page-food__container">
          <SplitLine icon={<CoffeeOutlined />} title="备选料理" />
          <section className="page-food__chose-container">{foodListUnChose()}</section>
        </section>
      )}
    </section>
  );
};

export default RoleFood;
