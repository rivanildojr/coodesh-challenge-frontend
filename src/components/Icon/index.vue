<template>
  <component :is="name" v-bind="$props"/>
</template>

<script>
import Loading from './Loading.vue'
import Search from './Search.vue'
import Filter from './Filter.vue'

export default {
  components: {
    Loading,
    Search,
    Filter
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
