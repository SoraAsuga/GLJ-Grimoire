import { roleSimulationState } from '@/store/role-simulation';
import {
  BookOutlined,
  BulbOutlined,
  CoffeeOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  RadarChartOutlined,
  RollbackOutlined,
  SkinOutlined,
  SolutionOutlined,
  StarOutlined,
  UserOutlined,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons';
import React, { FC, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import './index.less';
import { InputNumber } from 'antd';

/** 分割线 */
interface ISplit {
  name: string;
}

const Split: FC<ISplit> = (props) => {
  const { name } = props;

  return (
    <div className="role-content__split">
      <BulbOutlined className="role-content__split-icon" />
      <div className="role-content__split-title">{name}</div>
      <div className="role-content__split-line"></div>
    </div>
  );
};

/** 角色页 */
interface IRoleProps {
  name: string;
  changeAbilityData: (
    o1: number,
    o2: number,
    o3: number,
    o4: number,
    o5: number,
    o6: number,
  ) => void;
}

const RolePage: FC<IRoleProps> = (props) => {
  const [level, setLevel] = useState(1);
  const [str, setStr] = useState(1);
  const [dex, setDex] = useState(1);
  const [int, setInt] = useState(1);
  const [vit, setVit] = useState(1);
  const [agi, setAgi] = useState(1);
  const [exName, setExName] = useState('无');
  const [exData, setExData] = useState(1);
  const { name, changeAbilityData } = props;

  const uploadAbilityData = () => {
    changeAbilityData(level, str, dex, int, vit, agi);
  };

  const changeExAbility = (name) => () => {
    setExName(name);
  };

  const abilityLabel = (name: string) => {
    /** 检测能力类型并显示数据 */
    const checkType = () => {
      if (name === 'STR') {
        return str;
      } else if (name === 'DEX') {
        return dex;
      } else if (name === 'INT') {
        return int;
      } else if (name === 'VIT') {
        return vit;
      } else if (name === 'AGI') {
        return agi;
      } else {
        return exData;
      }
    };

    const changeNum = (type, num) => () => {
      if (type === 'plus') {
        switch (name) {
          case 'STR':
            setStr(str + num);
            break;
          case 'DEX':
            setDex(dex + num);
            break;
          case 'INT':
            setInt(int + num);
            break;
          case 'VIT':
            setVit(vit + num);
            break;
          case 'AGI':
            setAgi(agi + num);
            break;
          default:
            setExData(exData + num);
        }
      } else if (type === 'subtract') {
        if (str + dex + int + vit + agi - num >= 5) {
          switch (name) {
            case 'STR':
              str - num && setStr(str - num);
              break;
            case 'DEX':
              setDex(dex - num);
              break;
            case 'INT':
              setInt(int - num);
              break;
            case 'VIT':
              setVit(vit - num);
              break;
            case 'AGI':
              setAgi(agi - num);
              break;
            default:
              if (exData - num >= 1) {
                setExData(exData + num);
              }
          }
        } else {
          alert('属性值不能小与1');
        }
      }
    };

    return (
      <div className="role-content__ability-content">
        <RadarChartOutlined className="default-color__icon role-content__icon" />
        <div className="role-content__ability-title default-color">{name}</div>
        <section className="role-content__ability-input default-color">
          <MinusCircleOutlined className="input__10" onClick={changeNum('subtract', 10)} />
          <MinusCircleOutlined className="input__1" onClick={changeNum('subtract', 1)} />
          <div className="input__num">{checkType()}</div>
          <PlusCircleOutlined className="input__1" onClick={changeNum('plus', 1)} />
          <PlusCircleOutlined className="input__10" onClick={changeNum('plus', 10)} />
        </section>
      </div>
    );
  };

  const exAbilityButton = (name: string) => {
    return (
      <button className="role-content__ex-btn" onClick={changeExAbility(name)}>
        <StarOutlined className="default-color__icon role-content__icon" />
        <div className="role-content__ex-name default-color">{name}</div>
      </button>
    );
  };

  const changeLevel = (type, num) => () => {
    if (type === 'add') {
      setLevel(level + num);
    } else {
      if (level - num >= 1) {
        setLevel(level - num);
      } else {
        alert('等级不能小与1');
      }
    }
  };

  return (
    <section className="role-content__role role-content__page" onChange={uploadAbilityData}>
      <Split name="角色名称" />
      <div className="role-content__role-name">
        <UserOutlined className="default-color__icon role-content__icon" />
        <div className="role-name__name default-color">{name}</div>
      </div>
      <Split name="角色等级" />
      <div className="role-content__level">
        <SkinOutlined className="default-color__icon role-content__icon" />
        <div className="role-content__level-title default-color">角色等级</div>
        <MinusCircleOutlined
          className="input__10 default-color"
          onClick={changeLevel('subtract', 10)}
        />
        <MinusCircleOutlined
          className="input__1 default-color"
          onClick={changeLevel('subtract', 1)}
        />
        <div className="input__num default-color">{level}</div>
        <PlusCircleOutlined className="input__1 default-color" onClick={changeLevel('add', 1)} />
        <PlusCircleOutlined className="input__10 default-color" onClick={changeLevel('add', 10)} />
      </div>
      <Split name="角色能力" />
      <section className="role-content__ability" onChange={() => {}}>
        {abilityLabel('STR')}
        {abilityLabel('DEX')}
        {abilityLabel('INT')}
        {abilityLabel('VIT')}
        {abilityLabel('AGI')}
        {exName !== '无' && abilityLabel(exName)}
      </section>
      <Split name="角色特殊能力" />
      <section className="role-content__ex">
        {exAbilityButton('无')}
        {exAbilityButton('TEC')}
        {exAbilityButton('MEN')}
        {exAbilityButton('LUK')}
        {exAbilityButton('CRT')}
      </section>
    </section>
  );
};

/** 面板数据页 */
const RoleAbilityPage: FC = () => {
  return <section className="role-content__page">面板数据页</section>;
};

/** 装备页 */
const RoleOutfitPage: FC = () => {
  return <section className="role-content__page">装备页</section>;
};

/** 技能页 */
const RoleSkillPage: FC = () => {
  return <section className="role-content__page">技能页</section>;
};

/** 料理页 */
const RoleFoodPage: FC = () => {
  return <section className="role-content__page">料理页</section>;
};

interface IAbilityProps {
  nameId: string[];
  close: () => void;
}

/** 角色能力界面 */
const RoleAbility: FC<IAbilityProps> = (props) => {
  const { nameId, close } = props;
  /** 子页面显示状态 */
  const [showPage, setShowPage] = useState(1);
  /** 角色能力储存状态 */
  const [abilityData, setAbilityData] = useState([]);
  const setRoleSimulation = useSetRecoilState(roleSimulationState);

  /** 创建新的角色储存到集中管理 */
  const addRole = () => {
    setRoleSimulation((oldRoleSimulation) => [
      ...oldRoleSimulation,
      {
        name: nameId[0],
        id: nameId[1],
        level: abilityData[0],
        str: abilityData[1],
        dex: abilityData[2],
        int: abilityData[3],
        agi: abilityData[4],
        vit: abilityData[5],
      },
    ]);
  };

  /**
   * 角色能力的状态
   * o1:level o2:str o3:dex 04:int o5:agi o6:vit
   */
  const changeAbilityData = (
    o1: number,
    o2: number,
    o3: number,
    o4: number,
    o5: number,
    o6: number,
  ) => {
    const newAbilityData = [o1, o2, o3, o4, o5, o6];
    setAbilityData(newAbilityData);
  };

  /** 改变页面显示状态 */
  const changeShowPage = (page) => () => {
    setShowPage(page);
  };

  /** 储存菜单子页用于遍历展示 */
  const Pages = [
    { id: 1, page: <RolePage name={nameId[0]} changeAbilityData={changeAbilityData}></RolePage> },
    { id: 2, page: <RoleAbilityPage></RoleAbilityPage> },
    { id: 3, page: <RoleOutfitPage></RoleOutfitPage> },
    { id: 4, page: <RoleSkillPage></RoleSkillPage> },
    { id: 5, page: <RoleFoodPage></RoleFoodPage> },
  ];

  /** 控制显示页面 */
  const showPages = (id: number) => {
    return Pages.filter((item) => id === item.id)[0].page;
  };

  /** 确认返回主菜单 */
  const judgeClose = () => {
    if (window.confirm('确定返回?')) {
      return close();
    }
  };

  /** 确认保存 */
  const saveData = () => {
    window.alert('成功保存');
    addRole;
  };

  return (
    <section className="role">
      <section className="role-content el-menu-vertical">
        <header className="role-content__header">
          <div className="role-content__menu default-color">
            <button className="role-content__menu-btn" onClick={judgeClose}>
              <RollbackOutlined className="default-color__icon" />
              &nbsp; 返回
            </button>
            <button className="role-content__menu-btn" onClick={changeShowPage(1)}>
              <UserOutlined className="default-color__icon" />
              &nbsp; 角色
            </button>
            <button className="role-content__menu-btn" onClick={changeShowPage(2)}>
              <SolutionOutlined className="default-color__icon" />
              &nbsp; 面板
            </button>
            <button className="role-content__menu-btn" onClick={changeShowPage(3)}>
              <SkinOutlined className="default-color__icon" />
              &nbsp; 装备
            </button>
            <button className="role-content__menu-btn" onClick={changeShowPage(4)}>
              <BookOutlined className="default-color__icon" />
              &nbsp; 技能
            </button>
            <button className="role-content__menu-btn" onClick={changeShowPage(5)}>
              <CoffeeOutlined className="default-color__icon" />
              &nbsp; 料理
            </button>
            <button className="role-content__menu-btn" onClick={saveData}>
              <VerticalAlignBottomOutlined className="default-color__icon" />
              &nbsp; 保存
            </button>
          </div>
        </header>
        {showPages(showPage)}
      </section>
    </section>
  );
};

export default RoleAbility;
