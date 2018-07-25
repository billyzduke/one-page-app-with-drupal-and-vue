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
  .movie-item {
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    padding: 10px
  }
  .movie-item img {
    max-width: 100%;
    height: auto
  }
  .movie-item h4 {
    margin-top: 0
  }
  .filter {
    padding: 40px;
    background: #efefef;
    margin-bottom: 40px
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

  .spinner {
    margin: 100px auto 0;
    width: 70px;
    text-align: center;
  }

  .spinner > div {
    width: 18px;
    height: 18px;
    background-color: #333;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }

</style>
