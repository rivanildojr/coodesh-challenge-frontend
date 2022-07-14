<template>
  <p
    :class="{'text-lg font-bold text-gray-800 text-center': message}"
  >
    <template v-if="message">{{ message }}</template>
    <slot v-else />
  </p>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    }
  }
}
</script>
