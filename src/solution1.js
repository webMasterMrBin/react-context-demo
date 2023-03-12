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

/* 1. 使用memo */
// const App = () => {
//   const [value, setValue] = useState("Initial value");
//   const [count, setCount] = useState(0);
//   const [, forceUpdate] = useReducer((c) => c + 1, 0);
//   /** contextvValue 推荐使用useMemo记忆一下, contextvalue只跟 context中的state绑定, 确保像强制render button这种渲染不会影响到contextvalue */
//   const contextValue = useMemo(() => ({ value, setValue, count, setCount }), [value, count]);

//   return (
//     <div style={{ width: 600, height: 600, border: '1px solid red' }}>
//        span
//       <MyContextValue.Provider value={contextValue}>
//         <ComponentUsingOnlySetter />
//         <ComponentUsingOnlyValue />
//         <ComponentUsingOnlySetterCount />
//         <ComponentUsingOnlyCount />
//         <OtherComponent />
//         <button onClick={forceUpdate}>render 根组件app</button>
//       </MyContextValue.Provider>
//     </div>
//   );
// };

/** 2. 推荐写法 props.children */
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
      <span>this is solution!</span>
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
