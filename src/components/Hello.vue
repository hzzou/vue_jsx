<script>
export default {
  name:'hello',
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
      </div>
    )
  }
}
</script>

<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>