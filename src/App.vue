<template>
  <CommentsTree/>
</template>

<script lang="ts">

import Vue from 'vue';
import CommentsTree from './components/CommentsTree.vue';


export default Vue.extend({
  name: 'App',
  components: {
    CommentsTree
  },

});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
