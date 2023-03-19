import React, { useReducer } from 'react';

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
      <button onClick={forceUpdate}>click</button>
      <ChildComponent />
    </div>
  )
}

export default ParentComponent;