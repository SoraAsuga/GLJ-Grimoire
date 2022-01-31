import {
  AppstoreOutlined,
  BuildOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  FileAddOutlined,
  FolderOutlined,
  FormOutlined,
  NodeExpandOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import React, { FC, useState } from 'react';
import { Button, Dropdown, Input, Menu, Modal, Select } from 'antd';
import { ShortSkill, SwordSkill } from '@/components/SkillTree';
import { nanoid } from 'nanoid';

import './index.less';
import { useRecoilState } from 'recoil';
import { ISkillPointData, skillConfigurationState } from '@/store/skill-configuration';
import { currentSkillConfigState } from '@/store/current-data';
import SplitLine from '../../components/SplitLine';
const { Option } = Select;

interface IProps {
  id: string;
}

const RoleSkill: FC<IProps> = (props) => {
  /** 默认技能加点 */
  const defaultSkillList = {
    武器技能: [
      {
        name: '剑术技能',
        data: SwordSkill,
        chose: false,
        skillData: {
          威力攻击: 0,
          迅捷攻击: 0,
          横扫千军: 0,
          爆气斩: 0,
          流星坠击: 0,
          音速斩切: 0,
          真空刃: 0,
          风暴气流: 0,
          破坏之刃: 0,
          剑术要领: 0,
          剑速提升: 0,
          大师级剑术: 0,
          战吼: 0,
          狂战士之怒: 0,
          快速蹴击: 0,
        },
      },
      {
        name: '射击技能',
        data: ShortSkill,
        chose: false,
        skillData: {
          威力射击: 0,
          涡轮射击: 0,
          弱点狙击: 0,
          箭雨: 0,
          交叉火线: 0,
          粘液射击: 0,
          麻痹射击: 0,
          烟雾弹: 0,
          断腕击: 0,
          弓术要领: 0,
          匿踪: 0,
          远程狙击: 0,
          回气: 0,
          分身射手: 0,
          破灭射击: 0,
        },
      },
    ],
  };

  /** 弹窗显示状态 */
  const [newWindow, setNewWindow] = useState(false);
  const [modifyWindow, setModifyWindow] = useState(false);
  const [deleteWindow, setDeleteWindow] = useState(false);

  /** 暂存名称 */
  const [newConfigurationName, setNewConfigurationName] = useState('');

  /** 技能配置清单 */
  const [skillConfiguration, setSkillConfiguration] = useRecoilState(skillConfigurationState);

  /** 当前配置 */
  const [currentConfig, setCurrentConfig] = useRecoilState(currentSkillConfigState);
  console.log('currentConfig: ', currentConfig);

  const hasConfig = Boolean(currentConfig);

  /** 将数据更新到 store */
  const changeConfig = () => {
    const newConfig = skillConfiguration.map((item) => {
      if (currentConfig.id === item.id) {
        return currentConfig;
      }
      return item;
    });
    setSkillConfiguration(newConfig);
  };

  /** 修改当前配置 */
  const changeCurrentConfig = (value: string) => {
    const newConfig = skillConfiguration.filter((item) => item.id === value);
    setCurrentConfig(newConfig[0]);
  };

  /** 动态生成配置列表 */
  const configList = () => {
    return skillConfiguration.map((item) => {
      return (
        <Option value={item.id} key={item.id}>
          {item.name}
        </Option>
      );
    });
  };

  /** 创建新配置 */
  const createNewList = () => {
    setSkillConfiguration((oldTodoList) => [
      ...oldTodoList,
      {
        id: nanoid(),
        name: newConfigurationName,
        data: defaultSkillList,
      },
    ]);
    setNewConfigurationName('');
    setNewWindow(false);
  };

  /** 修改配置名称 */
  const modifyListName = () => {
    setSkillConfiguration((oldTodoList) =>
      oldTodoList.map((item) => {
        const { id, data } = item;
        if (id === currentConfig.id) {
          return { name: newConfigurationName, id, data };
        }
        return item;
      }),
    );
    setModifyWindow(false);
    setCurrentConfig({ ...currentConfig, name: newConfigurationName });
    setNewConfigurationName('');
  };

  /** 删除配置 */
  const deleteList = () => {
    const newList = skillConfiguration.filter((item) => {
      item.id !== currentConfig.id;
    });
    setSkillConfiguration(newList);
    setCurrentConfig(undefined);
    setDeleteWindow(false);
  };

  /** 动态生成技能树 */
  const skillTree = () => {
    return Object.entries(currentConfig.data).map(([catalog, item]) => {
      const skills = item.filter((skill) => skill.chose);
      if (skills) {
        return skills.map((skill) => {
          const Skill = skill.data;
          return (
            <section className="skill-tree__container" key={skill.name}>
              <SplitLine icon={<NodeExpandOutlined />} title={skill.name}></SplitLine>
              <Skill skillPointsMode catalog={catalog} name={skill.name} />
            </section>
          );
        });
      }
    });
  };

  /** 改变技能树状态 */
  const changeSkillChose = (skillName: string) => {
    let skillTreeName;

    const newData = Object.entries(currentConfig.data).map(([name, item]) => {
      skillTreeName = name;

      const newItemData = item.map((items: ISkillPointData) => {
        const { chose } = items;

        if (skillName === items.name) {
          return { data: items.data, name: items.name, chose: !chose, skillData: items.skillData };
        }

        return items;
      });

      return newItemData;
    });

    setCurrentConfig({
      ...currentConfig,
      data: { ...currentConfig.data, [skillTreeName]: newData[0] },
    });
  };

  /** 动态生成技能选择菜单 */
  const skillChoseMenu = () => {
    /** 动态生成技能选择按钮 */
    const skillChoseButton = (skill: ISkillPointData[]) => {
      return (
        <Menu>
          {skill.map(({ name, chose }) => {
            return (
              <Menu.Item key={name} onClick={() => changeSkillChose(name)}>
                {chose ? (
                  <CheckCircleOutlined style={{ marginRight: '5px' }} />
                ) : (
                  <PlusCircleOutlined style={{ marginRight: '5px' }} />
                )}
                <span>{name}</span>
              </Menu.Item>
            );
          })}
        </Menu>
      );
    };

    return Object.entries(currentConfig.data).map(([name, item], index) => {
      return (
        <Dropdown overlay={skillChoseButton(item)} placement="bottomCenter" key={index}>
          <Button style={{ borderRadius: '15px', margin: '0 5px' }}>
            <AppstoreOutlined />
            {name}
          </Button>
        </Dropdown>
      );
    });
  };

  return (
    <section className="role-simulation__page-skill">
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
      <SplitLine icon={<BuildOutlined />} title="配置列表"></SplitLine>
      <section className="page-skill__menu">
        <Select
          className="page-skill__menu-list"
          defaultValue="选择已有配置"
          onChange={changeCurrentConfig}
        >
          {configList()}
        </Select>
        <section className="page-skill__menu-btn">
          <Button type="primary" shape="round" onClick={() => setNewWindow(true)}>
            <FileAddOutlined style={{ padding: '0 3px' }} />
            新建
          </Button>
          {hasConfig && (
            <Button type="primary" shape="round" onClick={changeConfig}>
              <FolderOutlined style={{ padding: '0 3px' }} />
              保存
            </Button>
          )}
          {hasConfig && (
            <Button type="primary" shape="round" onClick={() => setModifyWindow(true)}>
              <FormOutlined style={{ padding: '0 3px' }} />
              改名
            </Button>
          )}
          {hasConfig && (
            <Button type="primary" shape="round" danger onClick={() => setDeleteWindow(true)}>
              <DeleteOutlined style={{ padding: '0 3px' }} />
              删除
            </Button>
          )}
        </section>
      </section>
      {hasConfig && (
        <section className="page-skill__skill">
          <SplitLine icon={<BuildOutlined />} title="添加/删除技能"></SplitLine>
          <div className="page-skill__skill-menu">{skillChoseMenu()}</div>
          <section className="page-skill__skill-tree">{currentConfig && skillTree()}</section>
        </section>
      )}
    </section>
  );
};

export default RoleSkill;
