<template>
  <button :class="$style.btn">{{ text }}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style module>
  .btn {
    color: #fff;
    background-color: var(--orangeColor);
    padding: 5px 10px;
    border-radius: 3px;
    box-shadow: var(--boxShadow);
  }
</style>