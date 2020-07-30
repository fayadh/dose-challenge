<template>
  <div id="app">
    <div id="content">
      <Widget class="demo-widget" />
      <Reviews class="demo-widget" />
    </div>
  </div>
</template>

<script>
import Widget from "./components/Widget.vue";
import Reviews from "./components/Reviews.vue";

export default {
  name: "App",
  components: {
    Widget,
    Reviews,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-sizing: border-box;
  padding: 8px;
  height: 100vh;
  width: 100vw;
}

#content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  vertical-align: middle;
  align-items: center;
  height: 100%;
}

.demo-widget {
  margin: 8px;
}
</style>
