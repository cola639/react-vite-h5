## **推荐的 React 组件内部代码顺序**

```jsx
function UserProfile({ userId }) {
  /** 1. Props 解构 */
  // 从父组件 props 取数据
  // const { userId, role } = props;

  /** 2. State 声明 */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  /** 3. Refs 声明（如果有） */
  const inputRef = useRef(null);

  /** 4. 常量 / 派生数据（memo、计算变量等） */
  const apiUrl = useMemo(() => `/api/user/${userId}`, [userId]);

  /** 5. 异步函数（数据请求） */
  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl);
      setUser(res.data);
    } finally {
      setLoading(false);
    }
  };

  /** 6. Effect（副作用） */
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  /** 7. 事件处理函数（UI 交互） */
  const handleRefresh = () => {
    fetchUser();
  };

  /** 8. JSX 渲染 */
  return (
    <div className={styles.wrapper}>
      <h1>{user?.name}</h1>
      <button onClick={handleRefresh} disabled={loading}>
        刷新
      </button>
    </div>
  );
}
```

---

### **顺序设计的理由**

1. **Props 解构** → 一眼就知道组件需要什么输入
2. **State** → 清晰列出组件内部维护的状态
3. **Refs** → 提前声明，方便在后面事件或 effect 中使用
4. **常量 / 派生数据** → 比如 `useMemo` 计算得到的值
5. **异步函数** → 数据相关逻辑放在这里，和 UI 事件分开
6. **Effect** → 按需触发副作用（加载、监听等）
7. **事件处理函数** → 用户操作相关的方法
8. **JSX 渲染** → 最后是视觉结构，逻辑和视图分离

---

### 如果要强制执行

- **Hooks 调用顺序** → `eslint-plugin-react-hooks` 可以保证 `useState`、`useEffect` 等不乱放
- **命名规则**（`fetchXxx`、`handleXxx`） → 用 `id-match` 或 `@typescript-eslint/naming-convention`
- **自定义代码块顺序** → 需要写一个 ESLint 自定义规则（能检测 State、Effect、事件的相对位置）

---
