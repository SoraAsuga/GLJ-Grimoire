import React, { FC, useState } from 'react';
import { Card, Descriptions, Modal } from 'antd';
import { EditOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { RoleSimulationItem } from '@/store/types';
import { useHistory } from 'react-router-dom';

import './index.less';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { roleSimulationState } from '@/store/role-simulation';
import Item from 'antd/lib/list/Item';
import { nanoid } from 'nanoid';

interface RoleItemProps {
  role: RoleSimulationItem;
}

const RoleItem: FC<RoleItemProps> = (props) => {
  const { role } = props;
  const { name, level, str, dex, int, vit, agi, exName, ex } = props.role;

  const setList = useSetRecoilState(roleSimulationState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();
  const date = new Date();

  const copyRole = () => {
    const createDate =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate() +
      ' ' +
      (date.getHours() + 1) +
      ':' +
      (date.getMinutes() + 1);

    setList((oldList) => {
      return [
        ...oldList,
        {
          id: nanoid(),
          level,
          name,
          str,
          dex,
          int,
          vit,
          agi,
          createDate,
        },
      ];
    });
  };

  const handleClickEdit = () => {
    history.push('/RoleSimulation/EditRole');
  };

  const deleteRole = () => {
    setList((oldList) => oldList.filter((item) => item.id !== role.id));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    deleteRole();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card
        className="role-item"
        actions={[
          <CopyOutlined key="copy" onClick={copyRole} />,
          <EditOutlined key="edit" onClick={handleClickEdit} />,
          <DeleteOutlined key="delete" className="role-item__delete" onClick={showModal} />,
        ]}
      >
        <Descriptions title={name}>
          <Descriptions.Item label="等级">{level}</Descriptions.Item>
          <Descriptions.Item label="STR">{str}</Descriptions.Item>
          <Descriptions.Item label="DEX">{dex}</Descriptions.Item>
          <Descriptions.Item label="INT">{int}</Descriptions.Item>
          <Descriptions.Item label="VIT">{vit}</Descriptions.Item>
          <Descriptions.Item label="AGI">{agi}</Descriptions.Item>
          {exName && <Descriptions.Item label={exName}>{ex}</Descriptions.Item>}
          <Descriptions.Item label="创建日期">{role.createDate}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Modal
        title="删除角色"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确定"
      >
        <p>确定要删除 {name} 吗？</p>
      </Modal>
    </>
  );
};

export default RoleItem;
