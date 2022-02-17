import React, { Fragment } from 'react';
import { IDescribeTableProps, IDescription } from '../../../../constants/types';

import './index.less';

const RenderTable = (props: IDescribeTableProps, state) => {
  const descInterpreter = (description: IDescription) => {
    const { raw, values } = description;

    const slice = raw.split(/[{}]/);

    function interpretValue(expName: string) {
      const { args, fn } = values[expName];
      const interpretedArgs = args.map((name) => stateGetter(name));
      return fn(...interpretedArgs);
    }

    return slice.map((str, i) => {
      if (str.startsWith('expression:')) {
        const expName = str.replace('expression:', '');
        return <Fragment key={i}>{interpretValue(expName)}</Fragment>;
      }

      return <Fragment key={i}>{str}</Fragment>;
    });
  };

  const stateGetter = (name: string) => {
    // console.log('stateGetter', state);
    return state[name];
  };

  // console.log('renderTableItem', stateGetter('level'));

  const { items } = props;

  return (
    <div className="render-table">
      {items.map((item, index) => (
        <div className="render-table__item" key={index}>
          <div className="render-table__item-icon ">{item.icon}</div>
          <div className="render-table__item-title">{item.name}</div>
          <div className="render-table__item-content">{descInterpreter(item.desc)}</div>
        </div>
      ))}
    </div>
  );
};

export default RenderTable;
