<template>
  <div>
    <div class="backdrop"></div>
    <div class="container">
      <h1>Ultimate Chalet Calculator</h1>
      <div id="app"><Calculator /></div>
    </div>
  </div>
</template>

<script>
import Calculator from "./components/Calculator";

export default {
  name: "App",
  components: {
    Calculator
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  margin-top: 1em;
}
.backdrop {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.85);
}
.container {
  text-align: center;
}
</style>
