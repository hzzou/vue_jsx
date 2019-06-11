<script>
import Child from './Child.vue';  
export default {
  name:'hello',
  components:{
    Child
  },
  props:{
    msg:String
  },
  render(){
    const msg = this.msg;
    console.log(msg)
    return(
      <div className="hello">
        12333
        <div>{msg}</div>
        <Child/>
      </div>
    )
  }
}
</script>

<style scoped lang="scss">
  
</style>