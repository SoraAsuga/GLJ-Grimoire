import React, { FC, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { nanoid } from 'nanoid';

import './index.less';
import { todoListState } from '@/demo/store/todo-list';
import { useSetRecoilState } from 'recoil';
import { TodoListItem } from '../../types';

const { RangePicker } = DatePicker;

interface TodoListDetail {
  title: string;
  date: string;
  content: string;
}

interface IProps {
  /** 关闭菜单的回调  */
  close: () => void;
  onSubmit: (detail: TodoListDetail) => void;
}

const AddDetails: FC<IProps> = (props) => {
  const { close } = props;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [deadlineDate, setDeadlineDate] = useState([]);
  const setTodoList = useSetRecoilState(todoListState);

  /** 获取 title */
  const getTitle = (event: React.FocusEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  /** 获取 content */
  const getContent = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const onChange = (value, dateString) => {
    setDeadlineDate(dateString);
  };

  const handleSubmit = () => {
    if (title !== '' && content !== '' && deadlineDate !== []) {
      const dates = new Date();
      const date = dates.getFullYear() + '-' + dates.getMonth() + '-' + dates.getDay();
      addTodoListItem({
        title,
        content,
        createData: date,
        id: nanoid(),
        deadlineDate,
        isFinished: false,
      });
    } else {
      window.confirm('请完善事件信息!');
    }
  };

  const addTodoListItem = (item: TodoListItem) => {
    setTodoList((todoList) => {
      return todoList.concat([item]);
    });
  };

  return (
    <section className="add-details">
      <div className="add-details__container">
        <header className="add-details__header">
          <button className="add-details__close" onClick={close}>
            <ArrowLeftOutlined />
          </button>
        </header>
        <div className="add-details__set-item">
          <input
            className="set-item__title"
            type="text"
            placeholder="输入事件标题"
            onBlur={getTitle}
          />
          <div className="set-item__date">
            <div className="set-item__date-title">开始时间-----结束时间</div>
            <Space direction="vertical" size={12} className="set-item__date-choice">
              <RangePicker
                className="date-chose"
                ranges={{
                  Today: [moment(), moment()],
                  'This Month': [moment().startOf('month'), moment().endOf('month')],
                }}
                onChange={onChange}
              />
            </Space>
          </div>
          <div className="set-item__content-title">事件内容：</div>
          <textarea className="set-item__content" name="事件内容" onBlur={getContent}></textarea>
          <div className="set-item__confirm">
            <div className="set-item__confirm-div"></div>
            <button className="set-item__confirm-btn" onClick={handleSubmit}>
              确认
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddDetails;
