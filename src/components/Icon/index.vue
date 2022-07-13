<template>
  <component :is="name" v-bind="$props"/>
</template>

<script>
import Loading from './Loading.vue'
import Search from './Search.vue'

export default {
  components: {
    Loading,
    Search
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
