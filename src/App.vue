<template>
  <Home />
</template>

<script>
import Home from './views/Home'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
  :root {
    --orangeColor: rgb(240,143,81);
    --boxShadow: 0 4px 12px rgb(0 0 0 / 8%), 0 0 1px rgb(1 0 0 / 10%);
  }
</style>