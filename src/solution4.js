import React, { useReducer } from 'react';

/** 方案一 lift content up 内容提升 */
const ChildComponent = props => {
  console.log('child component render');
  return (
    <div style={{ border: '1px solid blue' }}>
      i'm child component
    </div>
  )
}

const ParentComponent = props => {
  const [, forceUpdate] = useReducer(c => c + 1, 0);
  console.log('parent component render');
  return (
    <div style={{ border: '1px solid red', marginTop: 100 }}>
      <div>solution 1: lift content up</div>
      <button onClick={forceUpdate}>click</button>
      {props.children}
    </div>
  )
}

const Container = () => {
  console.log('Container render');
  return (
    <ParentComponent>
      <ChildComponent />
    </ParentComponent>
  )
};
/* Why it works ?
  有问题的写法中
  const ParentComponent = props => {
  const [, forceUpdate] = useReducer(c => c + 1, 0);
  console.log('parent component render');
  return (
    <div style={{ border: '1px solid red', marginTop: 100 }}>
      <div>solution 1: lift content up</div>
      <button onClick={forceUpdate}>click</button>
      <ChildComponent />
    </div>
  )

  <ChildComponent /> 等同于React.createElement(ChildComponent, null, null);
  此对象在每一次parent component render中都new了一次新的对象, 又因为react的diff算法采用shallowEaqual及 Object.is判断两个对象引用是否相同,
  因此这种写法在parent render后造成child render

  对应props.children写法 当parent render时 Container没有render 因此props.children 没有new, children没render
}
*/


/** 方案二 memo包装 */
const ChildComponent2 = React.memo(props => {
  console.log('child component render');
  return (
    <div style={{ border: '1px solid blue' }}>
      i'm child component
    </div>
  )
});

const ParentComponent2 = props => {
  const [, forceUpdate] = useReducer(c => c + 1, 0);
  console.log('parent component render');
  return (
    <div style={{ border: '1px solid red', marginTop: 100 }}>
      <div>solution 2: memo包装</div>
      <button onClick={forceUpdate}>click</button>
      <ChildComponent2 />
    </div>
  )
}

export default Container;