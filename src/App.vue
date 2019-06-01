<script>
import Hello from './components/Hello.vue'
export default {
  
  components:{
    Hello
  },
  render(){
    return(
      <div className="app">
        <Hello msg='Welcome to YouVue.js App' />
      </div>
    )
  }
}
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>