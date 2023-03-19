import { createContext as createReactContext, useEffect, useRef, useContext, useState, useMemo, useCallback } from 'react';

const ReactContext = createReactContext(null);

const MyProvider = ({ value, children }) => {
  const listeners = useRef([]);
  const valueRef = useRef(value);
  
  // 使用ref存value, 确保value更新时, 所有用useContext的组件不会render
  const contextValue = useRef({
    value: valueRef.current,
    registerListrenrs: listener => listeners.current.push(listener),
  });

  // value更新时, 通知所有订阅的组件调用更新函数
  useEffect(() => {
    // 调用所有更新函数 传入新的value
    listeners.current.forEach(listener => listener(value));
    valueRef.current = value;
  }, [value]);

  return (
    <ReactContext.Provider value={contextValue.current}>
      {children}
    </ReactContext.Provider>
  )
}

const useContextSelector = (context, selector) => {
  const { value, registerListrenrs } = useContext(context);
  // 初始化传函数, 避免每次render都初始化
  const [selectedValue, setSelectedValue] = useState(() => selector(value));
  
  const selectorRef = useRef(selector);

  useEffect(() => {
    selectorRef.current = selector;
  })

  // 由于contextValue用ref存储 每次 context.value更新时  contextValue(ref store)并不会更新因此
  // useContext订阅的方法不会调用, 以下effect只会调用一次, 即初始化 往provider listener订阅更新逻辑
  useEffect(() => {
    // 订阅的更新逻辑, 当context.value更新传入新的value调用
    const updateWhenValueChange = (newValue) => {
      // 更新state以触发render, 若当前state和上一次state相同则不render, 注: 确保订阅的时候 selector(value)不为引用类型否则前后浅比较不同 默认会render
      // e.g 结合src/contextWorks.js调用例子
      // 1. 错误用法 const [, setCount] = useContextSelector(context, state => state.count), state.count为引用类型前后会发生变化, 优化失效
      // 2. 正确用法 const setCount = useContextSelector(context, state => state.count[1]) 此时setCount为 Provider中定义的userState 的setCount, 引用地址不会变, 优化生效
      // selecedValue可能为函数即setCount or someing, 所以采用回调写法
      setSelectedValue(() => selectorRef.current(newValue));
    }
    // 注册订阅更新逻辑
    registerListrenrs(updateWhenValueChange);
  }, [registerListrenrs])

  return selectedValue;
}

export { MyProvider, ReactContext, useContextSelector };
