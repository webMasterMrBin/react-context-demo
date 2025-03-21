/*
  背景
  A.tsx const { stateA, setStateA } = useContext();
  B.tsx const { setStateA } = useContext();
  如上B组件中调用setStateA更新全局状态stateA, A组件中使用stateA render展示,
  问题 更新stateA后 A组件和B组件都会render, 和预期不符(我们只要用到了 stateA的A组件render即可, B组件做了多余render)

  useWatchProvdierValue旨在实现如上按需render的需求
*/
function useWatchProvdierValue(value) {
  const valueRef = useRef(value);

  const listenersRef = useRef(new Set());

  const contextValueRef = useRef({
    value: valueRef.current,
    subscribe: listener => {
      listenersRef.current.add(listener);
      return () => listenersRef.current.delete(listener);
    },
  })

  useEffect(() => {
    // 找出触发render的变化的keys
    const changedProperties = Object.keys(value).filter(
      key => valueRef.current[key] !== value[key]
    );

    // 全局state value(需要确保value是memo过的)更新后 触发所有订阅更新
    listenersRef.current.forEach(listener => listener(value, changedProperties))
    // 手动同步valueRef;
    valueRef.current = value;
  }, [value])

  return contextValueRef.current;
}

function createProxy(state, listenedStateProps) {
  const result = {};

  for (const propertyName in state) {
    Object.defineProperty(result, propertyName, {
      get() {
        listenedStateProps[propertyName] = true;
        return state[propertyName];
      }
    });
  }

  return result;
};

/** 加强版useContext 结合 useWatchProviderValue实现按需render */
function usePerformanceContext(context) {
  const listenedStateProps = useRef({});

  const { value, subscribe } = useContext(context);

  const [newValue, setNewValue] = useState(value);

  useEffect(() => {
    const listener = (stateValue, changedProperties) => {
      // 触发render的keys包含 当前hook订阅的key则 触发组件render
      if (changedProperties.some(key => listenedStateProps.current[key])) {
        const targetValue = Object.keys(stateValue).reduce(
          (acc, key) => (listenedStateProps.current[key] ? { ...acc, [key]: stateValue[key] } : acc),
          {},
        );

        setNewValue(pre => ({
          ...pre,
          ...targetValue,
        }))
      }
    };

    const unsubscribe = subscribe(listener);

    return () => {
      unsubscribe();
    }
  }, [subscribe])

  return useMemo(() => createProxy(newValue, listenedStateProps.current), [newValue]);
}

