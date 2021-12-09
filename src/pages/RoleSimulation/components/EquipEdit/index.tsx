import Modal from 'antd/lib/modal/Modal';
import React, { FC } from 'react';

interface IProps {
  onCancel: () => void;
  onOk?: () => void;
  visible: boolean;
}

const EquipEdit: FC<IProps> = (props) => {
  const { visible, onCancel, onOk } = props;

  return (
    <Modal title="Basic Modal" visible={visible} onOk={onOk} onCancel={onCancel} footer={false}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default EquipEdit;
