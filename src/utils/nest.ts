import { createElement, FC } from 'react';

const nest = (...components: FC<any>[]) => {
  return (props: any) => {
    return components.reduceRight((children, Current) => {
      return createElement(Current, props, children);
    }, props.children);
  };
};

export default nest;
