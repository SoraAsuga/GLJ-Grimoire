import React, { useState, FC } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import AddDetails from './AddDetails';
import './index.less';

const AddTodo: FC = () => {
  // 用于显示添加详情页面
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const closeDetailModal = () => {
    setDetailModalVisible(false);
  };

  const getSubmit = () => {};

  return (
    <div>
      <button className="add-button" onClick={() => setDetailModalVisible(true)}>
        <PlusOutlined className="add-button__icon" />
      </button>
      {detailModalVisible && <AddDetails close={closeDetailModal} onSubmit={getSubmit} />}
    </div>
  );
};

export default AddTodo;
