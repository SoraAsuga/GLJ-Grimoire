import { todoListState } from '@/demo/store/todo-list';
import { DownSquareOutlined, UpSquareOutlined } from '@ant-design/icons';
import React, { useState, FC } from 'react';
import { useSetRecoilState } from 'recoil';
import { Button } from 'antd';

import './index.less';

// 规定传入的 props 的类型
interface IValue {
  title: string;
  createData: string;
  deadlineDate: any;
  content: string;
  id: string;
}

interface IProps {
  value: IValue;
}

const Item: FC<IProps> = (props) => {
  // 接收传入的 props
  const { title, createData, deadlineDate, content, id } = props.value;
  const [showDetails, useShowDetails] = useState(false);
  const setTodoList = useSetRecoilState(todoListState);

  // 用于确认是否删除对应 id 的 todo
  const handleDelete = () => {
    if (window.confirm('确定删除吗?')) {
      setTodoList((todoList) => {
        return todoList.filter((item) => !(item.id === id));
      });
    }
  };

  const btnText = () => {
    if (showDetails) {
      return <UpSquareOutlined />;
    } else {
      return <DownSquareOutlined />;
    }
  };

  const showDetail = () => {
    useShowDetails(!showDetails);
  };

  const changeToFinish = () => {
    setTodoList((todoList) => {
      return todoList.map((item) => {
        if (item.id === id && item.isFinished === false) {
          return {
            title,
            createData,
            deadlineDate,
            content,
            id,
            isFinished: true,
          };
        }
        return item;
      });
    });
  };

  return (
    <div>
      <li className="todo-list__item">
        <div className="item__content">
          <input type="checkbox" onChange={changeToFinish} />
          <div className="todo-list__item-text">{title}</div>
          <button className="todo-list__item-details" onClick={showDetail}>
            {btnText()}
          </button>
        </div>
      </li>
      {showDetails && (
        <div className="todo-list__details">
          <div className="todo-list__details-deadline">开始于: {deadlineDate[0]}</div>
          <div className="todo-list__details-deadline">结束于: {deadlineDate[1]}</div>
          <div className="todo-list__details-content">事件内容:{content}</div>
          <div className="todo-list__details-create">事件创建于:{createData}</div>
          <div className="todo-list__delete-container">
            <div className="todo-list__delete-div"></div>
            <Button className="todo-list__delete" onClick={handleDelete} type="primary" danger>
              删除
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
