# Cards
卡片栅格，每行5列。
[Demo](https://luhaopeng.github.io/html-cards/)

## 快速入门
引入`cards.css`：
```html
<link rel="stylesheet" href="cards.css">
```

添加`iconfont.js`和`cards.min.js`：
```html
<script src="iconfont.js"></script>
<script src="cards.min.js"></script>
```

在`html`中添加一个空的容器元素：
```html
<div id='container'></div>
```
将此元素作为根节点创建`Cards`，并通过`addChild()`添加节点
```js
// 参数类型必须是HTMLDomElement
var cards = new Cards(document.getElementById('container'))
cards.addChild({
  type: 'primary', // 'default', 'primary', 'warning', 'error'
  title: 'My Card',
  contact: '小张'
})
```

## 属性和方法

### **Cards**

属性       |   类型  |     说明
:---------|:------:|:------------
 `.length` |`number`|已添加的`Cards`节点数量
`.selected`|`string`|选中节点的`key`，未选中则返回`null`

例：
```js
var cards = new Cards(someDOM)
cards.addChild({
  key: 'tom'
})
cards.addChild({
  key: 'gary'
})
cards.addChild({
  key: 'peter'
})
console.log(cards.length) // 3
// ...点击第二个card节点
console.log(cards.selected) // 'gary'
```

### **Cards.addChild(options)**
作用：添加一个子节点
返回值：`Cards`实例引用
参数：`options`是一个对象，包含如下属性

参数       |   类型  |     说明      | 默认值
:---------|:------:|:------------|:---:
`type` |`string`|节点类型，可选`'default'`, `'primary'`, `'warning'`, `'error'`|`'default'`
`title`|`string`|节点标题|`'Card'`
`disconnected`|`boolean`|已拉闸|`false`
`contact`|`string`|联系人|`'小张'`
`bodyTitle`|`string`|第二行表头|`'上月用电量'`
`bodyTitle2`|`string`|第三行表头，默认隐藏，非`null`时显示|`null`
`footTitle`|`string`|最后一行表头|`'剩余电量'`
`bodyData`|`string`|第二行数据|`'0.00'`
`bodyData2`|`string`|第三行数据，默认隐藏，非`null`时显示|`null`
`footData`|`string`|最后一行数据|`'0.00'`
`unit`|`string`|数据单位|`'kWh'`
`link`|`function`|第二行`<a>`标签点击回调，参数为`key`|`null`
`key`|`string`|节点key值，可通过`.selected`属性或`link`回调取得|`'key'`

例：
```js
var cards = new Cards(someDOM)
cards.addChild({
  type: 'error', // 'default', 'primary', 'warning', 'error'
  title: '义乌小商品市场10-10-102',
  disconnected: true,
  contact: '小张',
  bodyTitle: '上期电费',
  bodyTitle2: '本期电费',
  footTitle: '账户余额',
  bodyData: '105.02',
  bodyData2: '143.37',
  footData: '24.60',
  unit: '元',
  link: function(key) {
    console.log(key)
  },
  key: '3119' // customerId
})
```

### **Cards.queryChild(number | DOMString)**
作用：获取一个子节点
返回值：子节点DOM
参数：子节点index或DOMString
例：
```js
var cards = new Cards(someDOM)
// ...
cards.queryChild(2) // 取得第三个子节点
cards.queryChild('section div.body') // 取得匹配选择器语句的子节点
```
