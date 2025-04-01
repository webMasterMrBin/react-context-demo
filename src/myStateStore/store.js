import { useEffect, useReducer, useRef } from 'react';

/* 
  自定义状态store (无context)
  原理 消费的react组件订阅 更新逻辑 store中setState 通知所有订阅的组件 触发更新
  订阅的组件中listener逻辑 判断更新前后状态是否变化 只有变化的才触发 render
*/
function createStore(initialState = {}) {
  let state = initialState;
  const listeners = new Set();
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const notify = () => {
    listeners.forEach(listener => {
      listener(state);
    })
  };

  const setState = (newState) => {
    if (typeof newState === 'function') {
      state = newState(state);
    } else {
      state = newState;
    }
   
    notify(state);
  };

  const getState = () => {
    return state;
  };

  return {
    subscribe,
    getState,
    setState,
  };
}

// [state, setState] = useStore(state => state.a);

const { getState, subscribe, setState } = createStore({ app1: false, app2: false });

// 组件调用hook const selector = state = > state.xxx
function useStore(selector) {
  const [, forceUpdate] = useReducer(count => count + 1, 0);
  const state = selector(getState());

  const stateRef = useRef(state);

  useEffect(() => {
    const listener = (newAllState) => {
      const newState = selector(newAllState);

      if (stateRef.current !== newState) {
        forceUpdate();
        stateRef.current = newState;
      }
    };

    const unsubscribe = subscribe(listener);

    return () => {
      unsubscribe();
    };
  }, [])

  return [state, setState];
}

export { useStore };
