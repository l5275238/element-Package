## element二次封装tabel ##
依赖element-ui tabel  lang.js 报错请看清楚引用模块是否有问题
- **传入参数**
>
 | 参数      |     参数类型 |   参数说明   |  默认值    |
| :-------- | :--------| :------ |:------  |
| obj|  <mark>Object,必传</mark>| isLoading:Boolean遮罩层开关;list:Array数据源；page{page:1,rows:10,totalCount:总条数}分页参数|    |
| hasAll   | Boolean 非必传| 是否显示合计|  默认false     |
| allcolumns   | Array 非必传| 合计显示内容|       |
| allObj   | Array 源| 合计数据|  默认false     |
| showSelect   | Boolean 非必传| 选择框打开|  默认false     |
| keyId   | String 非必传| 需要记忆选择内容分页时候每条记录的主键|       |
| columns   | Array 必传| 表格设置和element-ui columns类似新增加一些字段|       |

| columns  介绍    |     参数类型 |   参数说明   |  默认值    |
| :-------- | :--------| :------ |:------  |
| prop   | String 必传| 数据的key|       |
| label   | String 必传| 显示的名字|       |
| isShow   | Boolean | 是否显示|   true     |
| filter   | Function(item) | 过滤的方法 返回值为显示的内容|       |
| widthNAuto   | Boolean | 是否自动计算表格宽度 |   true     |
| width   | String '80px' | 宽度 widthNAuto=false 生效 |   true     |
| render   | Function(h,prams) | vue render自定义组件 |        |

| 回调    |     作用 |   返回参数   |
| :-------- | :--------| :------ |:------  |
| refresh   | 表格刷新|  无     |
| select   | 分页发生变化 |  返回page参考传入的page |       |

| 内部方法   |     传入值 |   作用   |    返回值   |
| :-------- | :--------| :------ |:------  |  :------       |
| filterList   | (Function(item) ) |  过滤数据（前端筛选）     |
| selectRow   | 无 |  返回page参考传入的page |   返回选择数据列    |
| dele   | item 某条记录  |  删除表格记忆的数据     |





