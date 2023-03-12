import React, {
  useState,
  useContext,
  createContext,
  memo,
  useMemo,
  useReducer
} from "react";

const MyContextValue = createContext();

const ComponentUsingOnlySetter = () => {
  const { setValue } = useContext(MyContextValue);
  console.log("setter value render");
  return (
    <button type="button" onClick={() => setValue(`${Math.random()}`)}>
      Change value
    </button>
  );
};

const ComponentUsingOnlyValue = () => {
  const { value } = useContext(MyContextValue);
  console.log("get value render");
  return <p>The value is: {value}</p>;
};

const ComponentUsingOnlySetterCount = () => {
  const { setCount } = useContext(MyContextValue);
  console.log("setter count render");
  return (
    <button type="button" onClick={() => setCount(`${Math.random()}`)}>
      Change count
    </button>
  );
};

const ComponentUsingOnlyCount = () => {
  const { count } = useContext(MyContextValue);
  console.log("get count render");
  return <p>The count is: {count}</p>;
};

const OtherComponent = () => {
  console.log("oh no! 我歇逼了");
  return <div>无关context, 纯展示</div>;
};

const MyProvider = (props) => {
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(0);
  const contextValue = useMemo(() => ({ value, setValue, count, setCount }), [value, count]);
  const [, forceUpdate] = useReducer((c) => c + 1, 0);

  return (
    <MyContextValue.Provider value={contextValue}>
      {props.children}
      <button onClick={forceUpdate}>render 根组件app</button>
    </MyContextValue.Provider>
  );
}

const App2 = () => {
  return (
    <div style={{ width: 600, height: 600, border: '1px solid red' }}>
      <MyProvider>
        <ComponentUsingOnlySetter />
        <ComponentUsingOnlyValue />
        <ComponentUsingOnlySetterCount />
        <ComponentUsingOnlyCount />
        <OtherComponent />
      </MyProvider>
    </div>
  )
}

export default App2;
