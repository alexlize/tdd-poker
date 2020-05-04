<template>
  <div id="app">
    <label>Hand1</label>
    <input type="text" v-model="hand1">
    <br>
    <br>
    <br>
    <label>Hand2</label>
    <input type="text" v-model="hand2">
    <br>
    <br>
    <input type="button" value="Play" @click="playPoker">

    <br>
    <br>
    Result is: {{ gameResult}}
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import { playGame } from "./functions.js";

export default defineComponent({
  components: {
    //NavigationSideBar
  },
  setup() {
    const hand1 = ref("2S 3C 4C 5C 7C");
    const hand2 = ref("2H 3H 4H 5H 7H");

    let gameResult = playGame([hand1, hand2]);

    const playPoker = () => {
      gameResult = playGame([hand1, hand2]);
    };

    return {
      hand1,
      hand2,
      gameResult,
      playPoker
    };
  }
});
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
</style>
