import React, { Fragment } from 'react';
import { IDescribeBlockProps, IDescription } from '../../../../constants/types';

import './index.less';

const RenderBlock = (props: IDescribeBlockProps, state) => {
  const { icon, name, type, properties, effects, additional } = props;

  const stateGetter = (name: string) => {
    return state[name];
  };

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

  const renderType = () => {
    return type.map((typeName, index) => <span key={index}>{typeName}</span>);
  };

  const renderProperties = () => {
    return properties.map((property, index) => (
      <div className="render-block__properties-item" key={index}>
        {property.icon}
        <div className="properties-item__name">{property.desc}</div>
      </div>
    ));
  };

  const renderEffects = () => {
    return effects.map((description, index) => (
      <div className="render-block__effects-content" key={index}>
        {descInterpreter(description)}
      </div>
    ));
  };

  const renderAdditional = () => {
    return additional.map((description, index) => {
      return (
        <section className="render-block__additional" key={index}>
          <div className="render-block__additional-header">
            <div className="additional-header__icon">{description.icon}</div>
            <div className="additional-header__name">{description.name}</div>
          </div>
          <div className="render-block__additional-content">{descInterpreter(description)}</div>
        </section>
      );
    });
  };

  return (
    <section className="render-block">
      <header className="render-block__header">
        <div className="render-block__header-icon">{icon}</div>
        <span className="render-block__header-name">{name}</span>
        <span className="render-block__header-type">{renderType()}</span>
      </header>
      <div className="render-block__properties">{renderProperties()}</div>
      <section className="render-block__effects">{renderEffects()}</section>
      {additional && renderAdditional()}
    </section>
  );
};

export default RenderBlock;
