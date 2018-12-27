export default {

  name: 'render',
  functional: true,
  props:{
    render: Function,
    params:null,
  },
  watch:{
    params:function (n) {
      console.log(n);
    }
  },
  render:(h,ctx)=>{
    const params = ctx.props.params

    return ctx.props.render(h, params);
}


}
