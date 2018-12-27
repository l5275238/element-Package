## element二次封装tabel ##
依赖element-ui tabel  lang.js 报错请看清楚引用模块是否有问题

功能： 集成了分页，自动计算高度，自动计算宽度，分页选择记忆功能，自定义表格内容，数据过滤
- **传入参数**
>
 | 参数      |     参数类型 |   参数说明   |  默认值    |
| :-------- | :--------| :------ |:------  |
| obj|  <mark>Object,必传</mark>| 表格配置项|    |
| columns   | Array 必传| 表格设置和element-ui columns类似新增加一些字段|       |

| obj  介绍    |     参数类型 |   参数说明   |  默认值    |
| :-------- | :--------| :------ |:------  |
| isLoading   | Boolean | 打开遮盖层|       |
| autoHeight   | Boolean | 自动计算高度|       |
| name   | String | 记录拖拽表格Key|        |
| hasAll   | Boolean | 是否开启合计|       |
| autoAll   | Boolean | 是否自动合计|       |
| allObj   | Object | 手动传入合计数据|       |
| showNum   | Boolean | 打开序号|       |
| showSelect   | Boolean | 开启选择|       |
| keyId   | Boolean) | 分页记录每条bean的唯一key 主键|       |
| drag   | Boolean | 开启拖拽 |      |
| hasPage   | Boolean | 开启分页 |      |
| checkModelShow   | Boolean | 开启表头筛选 |      |
| list   | Array 必传|  数据源 |        |
| page   | Object |{page:1,rows:10,totalCount:100}分页参数 |        |

| columns  介绍    |     参数类型 |   参数说明   |  默认值    |
| :-------- | :--------| :------ |:------  |
| prop   | String 必传| 数据的key|       |
| allProp   | String | 自动合计时数据的key(自动合计时allProp=prop 手动合计时根据返回的key如果与prop相同可以不定义)|       |
| label   | String 必传| 显示的名字|       |
| isShow   | Boolean | 是否显示|   true     |
| filter   | Function(item) | 过滤的方法 返回值为显示的内容|       |
| widthNAuto   | Boolean | 是否自动计算表格宽度 |   true     |
| width   | String '80px' | 宽度 widthNAuto=false 生效 |   true     |
| render   | Function(h,prams) | vue render自定义组件 |        |

| 回调    |     作用 |   返回参数   |
| :-------- | :--------| :------ |
| refresh   | 表格刷新|  无     |
| select   | 分页发生变化 |  返回page参考传入的page |       |

| 内部方法   |     传入值 |   作用   |    返回值   |
| :-------- | :--------| :------ |:------  |
| filterList   | (Function(item) ) |  过滤数据（前端筛选）     |
| selectRow   | 无 |  返回选择数据列  |      |
| dele   | item 某条记录  |  删除表格记忆的数据     |        |





