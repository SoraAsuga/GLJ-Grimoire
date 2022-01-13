import { EWeaponType } from '@/typings/equipment';
import { BookOutlined } from '@ant-design/icons';
import React, { FC, useMemo } from 'react';

import './index.less';
import useRefState from '@/hooks/useRefState';
import { InputNumber, Select } from 'antd';
import RenderTable from '../RenderTable';
import RenderDesc from '../RenderDesc';
import RenderBlock from '../RenderBlock';
import RenderTip from '../RenderTip';
import { ESkillEffectType, IDescribeSkillData } from './types';

const { Option } = Select;

interface IDescribe {
  item: IDescribeSkillData;
}

const Describe: FC<IDescribe> = (props) => {
  const { item } = props;
  const skillData = item;

  const [state, setState] = useRefState({
    level: 1,
    roleLevel: 1,
    weaponType: skillData.neededMainWeapon[0],
    secondaryWeaponType: skillData.neededSecondaryWeapon[0],
  });

  /** 抽象不同样式对应的渲染函数 */
  const skillEffectsHandler = useMemo(
    () => ({
      [ESkillEffectType.Table]: RenderTable,
      [ESkillEffectType.Desc]: RenderDesc,
      [ESkillEffectType.Block]: RenderBlock,
      [ESkillEffectType.Tip]: RenderTip,
    }),
    [],
  );

  const renderSkillEffects = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return skillData.effects.map(({ type, data }) => skillEffectsHandler[type](data, state));
  };

  /** 动态生成选项 */
  const menuItem = (item: EWeaponType[]) => {
    return item.map((item) => (
      <Option value={item} key={item}>
        {item}
      </Option>
    ));
  };

  return (
    <section className="describe">
      <section className="describe-menu">
        <div className="describe-menu__item">
          主手武器{' '}
          <Select
            defaultValue={state.weaponType}
            style={{ width: 120 }}
            onChange={(value) => setState({ weaponType: value })}
            bordered={false}
          >
            {menuItem(skillData.neededMainWeapon)}
          </Select>
        </div>
        <div className="describe-menu__item">
          副手武器{' '}
          <Select
            defaultValue={state.secondaryWeaponType}
            style={{ width: 120 }}
            onChange={(value) => setState({ secondaryWeaponType: value })}
            bordered={false}
          >
            {menuItem(skillData.neededSecondaryWeapon)}
          </Select>
        </div>
        <div className="describe-menu__item">
          技能等级{' '}
          <InputNumber
            size="small"
            min={1}
            max={10}
            defaultValue={10}
            onChange={(value) => setState({ level: value })}
          />
        </div>
        <div className="describe-menu__item">
          角色等级{' '}
          <InputNumber
            size="small"
            min={1}
            max={240}
            defaultValue={240}
            onChange={(value) => setState({ roleLevel: value })}
          />
        </div>
      </section>
      <header className="describe-header">
        <BookOutlined className="describe-header_icon" />
        <span className="describe-header_title">{skillData.name}</span>
      </header>
      {renderSkillEffects()}
    </section>
  );
};

export default Describe;
