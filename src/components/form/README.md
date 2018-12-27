## element二次封装form ##
功能： 将校验集成进入只需要简单配合即可，通过render自定义自己想要组件，通过见得数据配置即可生成自己想要的form表单

ps:校验可以自己定义在validate.js   validate里写入校验规则  messges里是提示内容  需要传参的校验可以 *校验name?key的形式传入 可以参考例子


本地运行 git clone https://github.com/l5275238/- 装好依赖 npm run dev  打开http://localhost:8080/#/dataForm/dataForm
- **传入参数**
>
 | 参数      |     参数类型 |   参数说明   |  默认值    |
| :-------- | :--------| :------ |:------  |
| form|  <mark>Object,必传</mark>| 表单数据源|    |
| vform   | Array 必传| 表单显示内容配置|       |
| formSet   |  Object必传| 表单配置项|       |

| formSet  介绍    |     参数类型 |   参数说明   |  默认值    |
| :-------- | :--------| :------ |:------  |
| isFilterBar   | Boolean | 是否开启单独宽度 默认50% 传入itemWidth有效|       |
| submitShow   | Boolean | 是否显示保存按钮 |       |



| vform  介绍    |     参数类型 |   参数说明   |  默认值    |
| :-------- | :--------| :------ |:------  |
| key   | String 必传| 数据的key|       |
| trigger   | String | 校验触发的状态和element一致|       |
| name   | String 必传| 显示的名字|       |
| itemWidth   | String | 整条记录的宽度|   true     |
| width   | String | label的宽度|   true     |
| validator   | Array | 校验规则如['isNotEmpty'] 需要在validate.js定义好校验名字|       |
| disabled   | Boolean | 是否禁用input|        |
| change   | Function(item,obj) | input发生变化触发  第二个参数包含isSucces 告知是否校验成功 |        |
| render   | Function(h) | 自定义自己想要的组件和内容参考vue render |        |
| isHidden   |  Boolean Function() | 是否不显示 |        |

| 回调    |     作用 |   返回参数   |
| :-------- | :--------| :------ |
| onSubmit   | 表格刷新|  无     |
| select   | 分页发生变化 |  返回page参考传入的page |       |

| 内部方法   |     传入值 |   作用   |    返回值   |
| :-------- | :--------| :------ |:------  |
| onSubmit   |   |  表单校验     |     返回一个Promise  |
| resetField   | 无 |  重置表格  |      |
| clearValidate   | Array [key] 单个可以传入key |  重置某个数据     |        |





