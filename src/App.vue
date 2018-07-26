<template>
  <div class="container">
    <h1>MOVIES</h1>
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" rel="stylesheet/scss">
  html {
    font-size: 100%
  }
  body {
    -webkit-font-smoothing: antialiased;
    padding: 60px 0
  }
  * {
    box-sizing: border-box
  }
  a:hover {
    cursor:pointer !important;
    text-decoration: underline !important
  }
  * html .clearfix {
    height: 1%;
    overflow: visible
  }
  *+html .clearfix {
    min-height: 1%
  }
  .clearfix:after {
    clear: both;
    content: ".";
    display: block;
    height: 0;
    visibility: hidden;
    font-size: 0
  }
  .clr {
    clear: both
  }
  .loading-transition {
    transition: all .3s ease;
    padding: 20px;
    color: #fff;
    background: #5CB85C;
    margin: 20px 0;
    width: 100%
  }
  .loading-enter,
  .loading-leave {
    width: 0
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
