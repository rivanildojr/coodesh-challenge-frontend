<template>
  <div class="flex items-center justify-between h-12 bg-brand-gray border border-gray-300 rounded w-full">
    <input
      :value="search"
      type="text"
      name="search"
      id="search-input"
      placeholder="Searching"
      @input="handleChangeSearch"
      class="h-full px-2 py-1 w-11/12 focus:outline-brand-main"
    >

    <span class="h-full px-2 flex justify-center items-center w-20">
      <icon
        name="search"
        size="24"
        :color="iconColor"
      />
    </span>
  </div>
</template>

<script>
import { ref, onUnmounted } from 'vue'

import Icon from '@/components/Icon'
import palette from '../../../palette'

export default {
  components: {
    Icon
  },
  props: {
    search: {
      type: String,
      required: true
    }
  },
  setup (_, { emit }) {
    const timeoutSearch = ref(null)

    onUnmounted(() => {
      clearTimeout(timeoutSearch.value)
    })

    function handleChangeSearch ($event) {
      if (timeoutSearch.value) clearTimeout(timeoutSearch.value)

      timeoutSearch.value = setTimeout(() => {
        emit('update:search', $event.target.value)
      }, 500)
    }

    return {
      handleChangeSearch,
      iconColor: palette.brand.graydark
    }
  }
}
</script>
