import {
  PlusCircleOutlined,
  RedoOutlined,
  RollbackOutlined,
  StarOutlined,
} from '@ant-design/icons';
import React, { FC, useState } from 'react';
import { nanoid } from 'nanoid';
import { useRecoilValue } from 'recoil';
import { roleSimulationState } from '@/store/role-simulation';

import RoleAbility from './RoleAbility';
import './index.less';

interface IProps {
  /** 关闭窗口 */
  close: () => void;
  /** 打开面板 */
  open: () => void;
  /** 上传名称 */
  uploadName: (name: string) => () => void;
}

/** 创建新角色,将新角色名传入数据页加载 */
const CreateRole: FC<IProps> = (props) => {
  const { close, open, uploadName } = props;
  const [roleName, setRoleName] = useState('');

  const getName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoleName(event.target.value);
  };

  const confirmName = () => {
    uploadName(roleName)();
    open();
  };

  return (
    <section className="role-simulation__window">
      <div className="role-simulation__create">
        <header className="role-simulation__create-header">创建一个新角色</header>
        <input
          type="text"
          placeholder="输入角色名"
          className="role-simulation__create-input"
          onChange={getName}
        />
        <button className="role-simulation__create-btn" onClick={confirmName}>
          就这个名字!
        </button>
        <button className="role-simulation__create-btn" onClick={close}>
          返回菜单
        </button>
      </div>
    </section>
  );
};

/** 加载已创建的角色,选择角色名加载数据页 */
const LoadRole: FC<IProps> = (props) => {
  const { close, open, uploadName } = props;
  const roleData = useRecoilValue(roleSimulationState);

  const roleBtn = () => {
    roleData.map((item) => {
      const { id, name, level, str, dex, int, vit, agi } = item;

      return (
        <button key={id} className="load-content__btn">
          <header className="load-content__btn-header default-color">{name}</header>
          <section className="load-content__btn-content default-color el-menu-vertical">
            <div className="btn-content__box">
              <StarOutlined className="btn-content__icon" />
              <div className="btn-content__text">LV</div>
              <div className="btn-content__text">{level}</div>
            </div>
            <div className="btn-content__box">
              <StarOutlined className="btn-content__icon" />
              <div className="btn-content__text">STR</div>
              <div className="btn-content__text">{str}</div>
            </div>
            <div className="btn-content__box">
              <StarOutlined className="btn-content__icon" />
              <div className="btn-content__text">DEX</div>
              <div className="btn-content__text">{dex}</div>
            </div>
            <div className="btn-content__box">
              <StarOutlined className="btn-content__icon" />
              <div className="btn-content__text">INT</div>
              <div className="btn-content__text">{int}</div>
            </div>
            <div className="btn-content__box">
              <StarOutlined className="btn-content__icon" />
              <div className="btn-content__text">VIT</div>
              <div className="btn-content__text">{vit}</div>
            </div>
            <div className="btn-content__box">
              <StarOutlined className="btn-content__icon" />
              <div className="btn-content__text">AGI</div>
              <div className="btn-content__text">{agi}</div>
            </div>
          </section>
        </button>
      );
    });
  };

  return (
    <section className="role-simulation__window">
      <div className="role-simulation__load">
        <header className="role-simulation__load-header">
          <RollbackOutlined onClick={close} className="default-color__icon load-header__close" />
          <div className="load-header__title">加载角色</div>
        </header>
        <div className="role-simulation__load-content el-menu-vertical">{roleBtn}</div>
      </div>
    </section>
  );
};

const RoleSimulation: FC = () => {
  /** 控制创建角色窗口显示状态 */
  const [showCreateRole, setShowCreateRole] = useState(false);
  /** 控制加载角色窗口显示状态 */
  const [showLoadRole, setShowLoadRole] = useState(false);
  /** 控制角色页面显示状态 */
  const [showRole, setShowRole] = useState(false);
  /** 角色名及 ID 的状态 */
  const [simulationName, setsSimulationName] = useState(['', '']);

  /** 更新取用名字的回调 */
  const uploadName = (name: string) => () => {
    setsSimulationName([name, nanoid()]);
  };

  /** 切换显示组件 */
  const changeShow = (type: number) => () => {
    switch (type) {
      case 0:
        setShowCreateRole(!showCreateRole);
        break;
      case 1:
        setShowLoadRole(!showLoadRole);
        break;
      case 2:
        setShowCreateRole(false);
        setShowLoadRole(false);
        setShowRole(!showRole);
      default:
    }
  };

  return (
    <div className="role-simulation">
      {showCreateRole && (
        <CreateRole close={changeShow(0)} open={changeShow(2)} uploadName={uploadName} />
      )}
      {showLoadRole && (
        <LoadRole close={changeShow(1)} open={changeShow(2)} uploadName={uploadName} />
      )}
      {showRole && <RoleAbility nameId={simulationName} close={changeShow(2)} />}
      <button className="role-simulation__add role-simulation__btn" onClick={changeShow(0)}>
        <div className="role-simulation__btn-title default-color">点击创建一个新角色</div>
        <PlusCircleOutlined className="role-simulation__btn-icon" />
      </button>
      <button className="role-simulation__load role-simulation__btn" onClick={changeShow(1)}>
        <div className="role-simulation__btn-title default-color">点击加载已创建的角色</div>
        <RedoOutlined className="role-simulation__btn-icon" />
      </button>
    </div>
  );
};

export default RoleSimulation;
