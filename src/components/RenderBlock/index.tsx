import React, { Fragment } from 'react';
import { IDescribeBlockProps, IDescription } from '../SkillDescribe/types';

import './index.less';

const RenderBlock = (props: IDescribeBlockProps, state) => {
  const { icon, name, type, properties, effects, additional } = props;

  const stateGetter = (name: string) => {
    // console.log('stateGetter', state);
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
    return type.map((typeName) => <span key={typeName}>{typeName}</span>);
  };

  const renderProperties = () => {
    return properties.map((property) => (
      <div className="render-block__properties-item" key={property.desc}>
        {property.icon}
        <div className="properties-item__name">{property.desc}</div>
      </div>
    ));
  };

  const renderEffects = () => {
    return effects.map((description) => (
      <div className="render-block__effects-content">{descInterpreter(description)}</div>
    ));
  };

  const renderAdditional = () => {
    return additional.map((description) => {
      return (
        <section className="render-block__additional">
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
