import React from 'react';

const Suggestion = () => {
  return (
    <ul>
      <li>将具有不同更改模式的上下文值移动到单独的上下文中(context尽量拆分的细)</li>
      <li>始终使用稳定上下文值对象引用(memolize)或使用原子类型(非引用类型)</li>
      <li>使使用上下文的组件尽可能小，以便它们的重新渲染速度很快</li>
      <li>
        使用 useContext 将组件拆分为类似 HOC 的包装器，以及包装在 memo() 中的简单渲染器 
        参见option2,3 <a href="https://github.com/facebook/react/issues/15156#issuecomment-474590693">https://github.com/facebook/react/issues/15156#issuecomment-474590693</a>
      </li>
      <li style={{ color: 'red' }}>
        使用useContext插件
         <a href="https://github.com/dai-shi/use-context-selector">https://github.com/dai-shi/use-context-selector</a>
      </li>
      <li style={{ color: 'red', fontSize: 24, fontWeight: 'bold' }}>
        个人建议:
        <div>
          1. context并不是状态管理工具, 状态的存储通常发生在useState或useReducer, 我们通常用到context配合useState做跳过prop-drilling的工作
        </div>
        <div>
          2. 一些复杂的场景并不适合context做状态管理, 建议直接上状态管理工具
          如何定义复杂? 我认为一旦一个组件里面有用到超过2个及以上的context, 那么我们相当于在创建一个新的Redux..
        </div>
        <div>
          3. 如何选择使用context 或者 状态管理工具redux等
          <div>如果我们只想要避免props-drilling将props传给嵌套组件, 那么使用context</div>
          <div>如果有一些适度复杂的状态, 同时不想使用太重的状态管理工具, 那么使用context+useReducer/useState, 性能问题可以使用use-context-selector解决</div>
          <div>如果你想更好地跟踪你的状态随时间的变化，需要确保只有特定的组件在状态变化时重新渲染，需要更强大的管理副作用的能力，或者有其他类似的问题，使用 Redux + React-Redux</div>
        </div>
      </li>
    </ul>
  );
};

export default Suggestion;
