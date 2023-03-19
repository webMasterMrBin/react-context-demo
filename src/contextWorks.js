import React, { useState, useReducer, useMemo, } from 'react';
import { MyProvider, useContextSelector, ReactContext } from './myUseContextSelector/createContext';

const ContextWorks = () => {
  return (
    <Provider>
      <Count />
      <CountSetter />
      <Age />
      <AgeSetter />
    </Provider>
  );
};

const Provider = ({ children }) => {
  const [count, setCount] = useState('');
  const [age, setAge] = useState('');
  const contextValue = useMemo(() => ({ count: [count, setCount], age: [age, setAge] }), [age, count])

  return (
    <MyProvider value={contextValue}>
      {children}
    </MyProvider>
  );
}

const Count = () => {
  const count = useContextSelector(ReactContext, state => state.count[0]);
  console.log(' render count', count);
  return (
    <div className="test">
      count:{count}
    </div>
  )
}

const CountSetter = () => {
  const setCount = useContextSelector(ReactContext, state => state.count[1]);
  console.log('render count setter');
  return (
    <div className="test">
      <button onClick={() => setCount(c => c + 1)}>click count</button>
    </div>
  )
};

const Age = () => {
  const age = useContextSelector(ReactContext, state => state.age[0]);
  console.log('render age', age);
  return (
    <div className="test">
      age: {age}
      {/* <button onClick={() => setAge(c => c + 1)}>click age</button> */}
    </div>
  )
}

const AgeSetter = () => {
  const setAge = useContextSelector(ReactContext, state => state.age[1]);
  console.log('render age setter');
  return (
    <div className="test">
      <button onClick={() => setAge(c => c + 1)}>click age</button>
    </div>
  )
}

export default ContextWorks