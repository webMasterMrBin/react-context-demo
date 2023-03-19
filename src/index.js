import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Demo1 from './demo1';
import Demo2 from './demo2';
import Demo3 from './demo3';
import Demo4 from './demo4';
import Solution1 from './solution1';
import Solution2 from './solution2';
import Solution3 from './solution3';
import Solution4 from './solution4';
import Suggestion from './suggestion';
import ContextWorks from './contextWorks';

const Container = (props) => {
  const [value, setValue] = useState('1');
  const [showAnwser, setShowAnwser] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const demos = {
    1: Demo1,
    2: Demo2,
    3: Demo3,
    4: Suggestion,
    5: Demo4,
  };
  const App = demos[value];
  return (
    <>
      <div>
        <select value={value} onChange={e => {
          setValue(e.target.value);
          setShowAnwser(false);
          setShowSolution(false);
        }}>
          <option value="1">demo1</option>
          <option value="2">demo2</option>
          <option value="3">demo3</option>
          <option value="4">suggestion</option>
          <option style={{ color: 'red' }} value="5">基础知识 re-render after parent component</option>
        </select>
      </div>
      {value === '4' ? <App /> : (
        <>
          <Question showAnwser={showAnwser} setShowSolution={setShowSolution} setShowAnwser={setShowAnwser} value={value} />
          {showSolution ? <Solution value={value} /> : <App />}
        </>
      )}
    </>
  );
}

const Question = props => {
  const { value, showSolution, setShowSolution, showAnwser, setShowAnwser } = props;
  const questions = {
    1: <div>Q: 分别点击change value, change count, render根组件app后, 各组件渲染情况</div>,
    2: <div>Q: 如何解决context按需订阅的state按需更新? </div>,
    3: <div>Q: 大佬们如何解决or更简单的方案</div>,
    5: <div>Q: 为什么子组件会在父组件render后默认render, 以及解决方法</div>  
  };
  const answers = {
    1: (
      <div>
        <div> A: ComponentUsingOnlySetter, ComponentUsingOnlyValue, ComponentUsingOnlySetterCount, ComponentUsingOnlyCount, OtherComponent全部render,</div>
        <div>why?: 强调一下OtherComponent的render原因, OtherComponent解决方案为加一下react.memo, 或者使用props.children,</div>
        <div>
          ComponentUsingOnlySetter, ComponentUsingOnlyValue, ComponentUsingOnlySetterCount, ComponentUsingOnlyCount 由于contextValue 发生了变化
        </div>
        <div>遗留问题: 我们最终想要组件订阅了哪个context中的state后 对应state更新才更新 how? see demo2</div>
      </div>
    ),
    2: (
      <div>
        react useContext设计成 不允许订阅上下值的一部分按需render的需求
        <a href="https://github.com/facebook/react/issues/14110">https://github.com/facebook/react/issues/14110</a>
        但是额外还有一些解决方案 <a href="https://github.com/facebook/react/issues/15156#issuecomment-474590693">https://github.com/facebook/react/issues/15156#issuecomment-474590693</a>
        <div>遗留问题: 使用拆分context方案, 在大的应用太复杂,状态多不好管理, 同时嵌套太多层不够优雅</div>
        <div>状态管理库or其他插件? 大佬们是怎么做的? see demo3</div>
      </div>
    ),
    3: (
      <div>
        社区有很多状态库, redux等等, 这里安利一个 context库 
        <a href="https://github.com/dai-shi/use-context-selector">https://github.com/dai-shi/use-context-selector</a>
      </div>
    ),
    4: <div>建议</div>,
    5: <div>see solution code</div>
  };

  return (
    <div style={{ margin: '50px 0' }}>
      <div>{questions[value]}</div>
      <button onClick={() => setShowAnwser(true)}>show answer</button>
      {showAnwser && <div>{answers[value]}</div>}
      {showAnwser && <button onClick={() => setShowSolution(true)}>show solution</button>}
    </div>
  );
}

const Solution = props => {
  const solutions = {
    1: Solution1,
    2: Solution2,
    3: Solution3,
    5: Solution4,
  }
  const App = solutions[props.value];
  return <App />;
}

ReactDOM.render(
  <Container />,
  document.getElementById('root')
);