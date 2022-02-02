import React, { FC, useState } from 'react';
import './index.less';
import { Layout, Menu, Input } from 'antd';
import {
  ArrowDownOutlined,
  BorderOutlined,
  CheckCircleOutlined,
  QuestionOutlined,
  SearchOutlined,
  StarOutlined,
  TagsOutlined,
} from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import { Header } from 'antd/lib/layout/layout';
import { EForgingCrystal, ENumericalNumber } from '@/constants/numericalValue';
import { forgingCrystalState } from '@/store/forging-crystal';
import ForgingCrystalCard from '@/components/ForgingCrystalCard';

const { Content, Sider } = Layout;
const { Search } = Input;

interface IEquipMenu {
  name: EForgingCrystal;
}

interface IEnchantItem {
  type: ENumericalNumber;
  chose: boolean;
}

const ForgingCrystalQuery: FC = () => {
  /** 装备类型菜单 */
  const menu: IEquipMenu[] = [
    {
      name: EForgingCrystal.WEAPON,
    },
    {
      name: EForgingCrystal.ARMOR,
    },
    { name: EForgingCrystal.ADD },
    { name: EForgingCrystal.SPECIAL },
    { name: EForgingCrystal.CURRENCY },
  ];

  /** 装备附魔菜单 */
  const [enchantMenu, setEnchantMenu] = useState([
    { type: ENumericalNumber.ATK, chose: false },
    { type: ENumericalNumber.ATK_PERCENT, chose: false },
    { type: ENumericalNumber.WEAPON_ATK, chose: false },
    { type: ENumericalNumber.WEAPON_ATK_PERCENT, chose: false },
    { type: ENumericalNumber.MATK, chose: false },
    { type: ENumericalNumber.MATK_PERCENT, chose: false },
    { type: ENumericalNumber.PHYSICAL_PIERCE, chose: false },
    { type: ENumericalNumber.MAGIC_PIERCE, chose: false },
    { type: ENumericalNumber.STABILITY, chose: false },
    { type: ENumericalNumber.ATTACK_MP_RECOVERY, chose: false },
    { type: ENumericalNumber.ATTACK_MP_RECOVERY_PERCENT, chose: false },
    { type: ENumericalNumber.STR, chose: false },
    { type: ENumericalNumber.STR_PERCENT, chose: false },
    { type: ENumericalNumber.DEX, chose: false },
    { type: ENumericalNumber.DEX_PERCENT, chose: false },
    { type: ENumericalNumber.INT, chose: false },
    { type: ENumericalNumber.INT_PERCENT, chose: false },
    { type: ENumericalNumber.VIT, chose: false },
    { type: ENumericalNumber.VIT_PERCENT, chose: false },
    { type: ENumericalNumber.AGI, chose: false },
    { type: ENumericalNumber.AGI_PERCENT, chose: false },
    { type: ENumericalNumber.HP, chose: false },
    { type: ENumericalNumber.HP_PERCENT, chose: false },
    { type: ENumericalNumber.MP, chose: false },
    { type: ENumericalNumber.NHPR, chose: false },
    { type: ENumericalNumber.NHPR_PERCENT, chose: false },
    { type: ENumericalNumber.NMPR, chose: false },
    { type: ENumericalNumber.NMPR_PERCENT, chose: false },
    { type: ENumericalNumber.DEF, chose: false },
    { type: ENumericalNumber.DEF_PERCENT, chose: false },
    { type: ENumericalNumber.MDEF, chose: false },
    { type: ENumericalNumber.MDEF_PERCENT, chose: false },
    { type: ENumericalNumber.PHYSICAL_RESISTANCE, chose: false },
    { type: ENumericalNumber.MAGIC_RESISTANCE, chose: false },
    { type: ENumericalNumber.REDUCE_DMG_FOE_EPICENTER, chose: false },
    { type: ENumericalNumber.REDUCE_PLAYER_EPICENTER, chose: false },
    { type: ENumericalNumber.REDUCE_DMG_STRAIGHT_LINE, chose: false },
    { type: ENumericalNumber.REDUCE_DMG_CHARGE, chose: false },
    { type: ENumericalNumber.REDUCE_DMG_METEOR, chose: false },
    { type: ENumericalNumber.REDUCE_DMG_BULLET, chose: false },
    { type: ENumericalNumber.REDUCE_DMG_BOWLING, chose: false },
    { type: ENumericalNumber.REDUCE_DMG_FLOOR, chose: false },
    { type: ENumericalNumber.ACCURACY, chose: false },
    { type: ENumericalNumber.ACCURACY_PERCENT, chose: false },
    { type: ENumericalNumber.DODGE, chose: false },
    { type: ENumericalNumber.DODGE_PERCENT, chose: false },
    { type: ENumericalNumber.CRITICAL_RATE, chose: false },
    { type: ENumericalNumber.CRITICAL_RATE_PERCENT, chose: false },
    { type: ENumericalNumber.CRITICAL_DAMAGE, chose: false },
    { type: ENumericalNumber.CRITICAL_DAMAGE_PERCENT, chose: false },
    { type: ENumericalNumber.ASPD, chose: false },
    { type: ENumericalNumber.ASPD_PERCENT, chose: false },
    { type: ENumericalNumber.CSPD, chose: false },
    { type: ENumericalNumber.CSPD_PERCENT, chose: false },
    { type: ENumericalNumber.STRONGER_AGAINST_FIRE, chose: false },
    { type: ENumericalNumber.STRONGER_AGAINST_WALTER, chose: false },
    { type: ENumericalNumber.STRONGER_AGAINST_EARTH, chose: false },
    { type: ENumericalNumber.STRONGER_AGAINST_WIND, chose: false },
    { type: ENumericalNumber.STRONGER_AGAINST_LIGHT, chose: false },
    { type: ENumericalNumber.STRONGER_AGAINST_DARK, chose: false },
    { type: ENumericalNumber.STRONGER_AGAINST_NORMAL, chose: false },
    { type: ENumericalNumber.FIRE_RESISTANCE, chose: false },
    { type: ENumericalNumber.WALTER_RESISTANCE, chose: false },
    { type: ENumericalNumber.EARTH_RESISTANCE, chose: false },
    { type: ENumericalNumber.WIND_RESISTANCE, chose: false },
    { type: ENumericalNumber.LIGHT_RESISTANCE, chose: false },
    { type: ENumericalNumber.DARK_RESISTANCE, chose: false },
    { type: ENumericalNumber.NORMAL_RESISTANCE, chose: false },
    { type: ENumericalNumber.AILMENT_RESISTANCE_PERCENT, chose: false },
    { type: ENumericalNumber.GUARD_RECHARGE_PERCENT, chose: false },
    { type: ENumericalNumber.GUARD_POWER, chose: false },
    { type: ENumericalNumber.GUARD_POWER_PERCENT, chose: false },
    { type: ENumericalNumber.EVASION_RECHARGE_PERCENT, chose: false },
    { type: ENumericalNumber.AGGRO_PERCENT, chose: false },
    { type: ENumericalNumber.FIRE, chose: false },
    { type: ENumericalNumber.WALTER, chose: false },
    { type: ENumericalNumber.EARTH, chose: false },
    { type: ENumericalNumber.WIND, chose: false },
    { type: ENumericalNumber.LIGHT, chose: false },
    { type: ENumericalNumber.DARK, chose: false },
    { type: ENumericalNumber.DROP_RATE_PERCENT, chose: false },
    { type: ENumericalNumber.PHYSICAL_BARRIER, chose: false },
    { type: ENumericalNumber.MAGIC_BARRIER, chose: false },
    { type: ENumericalNumber.FRACTIONAL_BARRIER_PERCENT, chose: false },
    { type: ENumericalNumber.SHORT_RANGE_DAMAGE_PERCENT, chose: false },
    { type: ENumericalNumber.LONG_RANGE_DAMAGE_PERCENT, chose: false },
    { type: ENumericalNumber.UNSHEATHE_ATTACK_PERCENT, chose: false },
  ]);

  /** 装备库 */
  const itemList = useRecoilValue(forgingCrystalState);

  /** 当前菜单 */
  const [currentMenu, setCurrentMenu] = useState(true);

  /** 当前装备类型 */
  const [currentItemType, setCurrentItemType] = useState(EForgingCrystal.WEAPON);

  /** 当前附魔筛选 */
  const [currentEnchant, setCurrentEnchant] = useState([]);

  /** 当前装备 */
  const [currentItem, setCurrentItem] = useState(undefined);

  /** 查询装备名称 */
  const [equipName, setEquipName] = useState('');

  /** 对比装备 */
  const [contrast, setContrast] = useState(undefined);

  /** 附魔选择状态 */
  const changeEnchantState = (item: IEnchantItem) => () => {
    const newList = enchantMenu.map((items) => {
      const { type } = item;

      if (item.type === items.type && items.chose) {
        const newCurrentEnchant = currentEnchant.filter((enchant) => enchant !== item.type);
        setCurrentEnchant(newCurrentEnchant);
        return { type, chose: false };
      } else if (item.type === items.type && !items.chose) {
        setCurrentEnchant([...currentEnchant, item.type]);
        return { type, chose: true };
      }
      return items;
    });
    setEnchantMenu(newList);
  };

  /** 动态生成装备菜单 */
  const menuItem = () => {
    if (currentMenu) {
      return menu.map((item, index) => {
        return (
          <Menu.Item
            key={index}
            icon={<TagsOutlined />}
            onClick={() => {
              setCurrentItemType(item.name);
              setEquipName('');
            }}
          >
            {item.name}
          </Menu.Item>
        );
      });
    }
    return enchantMenu.map((item, index) => (
      <button
        className="props-query__enchant"
        key={index}
        style={item.chose ? { backgroundColor: '#4e8eee20' } : {}}
        onClick={changeEnchantState(item)}
      >
        {item.chose ? (
          <CheckCircleOutlined className="props-query__enchant-icon" />
        ) : (
          <BorderOutlined className="props-query__enchant-icon" />
        )}
        {item.type}
      </button>
    ));
  };

  /** 两数组对比 */
  function includes(arr1: any[], arr2: any[]) {
    return arr2.every((val) => arr1.includes(val));
  }

  /** 动态生成条目 */
  const equipItem = () => {
    if (equipName !== '') {
      const newItem = itemList.filter((item) => {
        return item.name.includes(equipName);
      });

      console.log('gdx: ', newItem.length);

      return newItem.length === 0 ? (
        <div className="props-query__item">
          <QuestionOutlined style={{ margin: '5px' }} />
          查无此锻晶
        </div>
      ) : (
        newItem.map((item, index) => {
          return (
            <div className="props-query__item" key={index} onClick={() => setCurrentItem(item)}>
              <StarOutlined style={{ margin: '5px' }} />
              <div className="props-query__name">{item.name}</div>
              {item.strengthen && <div className="props-query__tips">强化锻晶</div>}
            </div>
          );
        })
      );
    } else if (currentMenu) {
      return itemList
        .filter((item) => item.type === currentItemType)
        .map((item, index) => (
          <div className="props-query__item" key={index} onClick={() => setCurrentItem(item)}>
            <StarOutlined style={{ margin: '5px' }} />
            <div className="props-query__name">{item.name}</div>
            {item.strengthen && <div className="props-query__tips">强化锻晶</div>}
          </div>
        ));
    }
    return itemList
      .filter((item) => {
        let enchants = [];
        item.enchanting &&
          (enchants = item.enchanting.map((enchant) => {
            return enchant.type;
          }));
        return includes(enchants, currentEnchant);
      })
      .map((item, index) => {
        return (
          <div className="props-query__item" key={index} onClick={() => setCurrentItem(item)}>
            <StarOutlined style={{ margin: '5px' }} />
            <div className="props-query__name">{item.name}</div>
            {item.strengthen && <div className="props-query__tips">强化锻晶</div>}
          </div>
        );
      });
  };

  /** 查询 */
  const onSearch = (value) => {
    setEquipName(value);
  };

  return (
    <div className="props-query__forging">
      <Header className="props-query__header">
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1" icon={<SearchOutlined />} onClick={() => setCurrentMenu(true)}>
            锻晶类型查询
          </Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined />} onClick={() => setCurrentMenu(false)}>
            锻晶附魔查询
          </Menu.Item>
        </Menu>
        <Search
          className="props-query__header-search"
          placeholder="输入装备名称"
          onSearch={onSearch}
          enterButton
        />
      </Header>
      <Layout className="props-query__container">
        <Sider theme="light" className="el-menu-vertical">
          <Menu
            className="props-query__menu"
            theme="light"
            defaultSelectedKeys={['1']}
            mode="inline"
          >
            {menuItem()}
          </Menu>
        </Sider>
        <Layout className="site-layout el-menu-vertical">
          <Content style={{ margin: '0 16px' }} className="props-query__content">
            <div
              className="props-query__content-items el-menu-vertical"
              style={currentItem ? {} : { width: '100%' }}
            >
              {equipItem()}
            </div>
            {currentItem && (
              <div className="props-query__container-details">
                <div className="container-details__container">
                  <div className="container-details__card">
                    <ForgingCrystalCard item={currentItem}></ForgingCrystalCard>
                  </div>
                  <button
                    className="container-details__conversion"
                    onClick={() => setContrast(currentItem)}
                  >
                    <ArrowDownOutlined />
                    加入对比
                  </button>
                  {contrast && (
                    <div className="container-details__card">
                      <ForgingCrystalCard item={contrast}></ForgingCrystalCard>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default ForgingCrystalQuery;
