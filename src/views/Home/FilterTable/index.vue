<template>
  <div class="flex flex-col gap-2 bg-white rounded p-4 shadow-lg w-full z-10">
    <div
      class="flex items-center gap-2 w-full"
      v-for="item in items"
      :key="item"
    >
      <input
        type="radio"
        :id="item"
        :value="item"
        v-model="inputRadio"
      >

      <label
        :for="item"
        class="text-gray-800 font-regular"
      >
        {{ item }}
      </label>
    </div>

    <button
      @click="handleClearFilter"
      class="bg-brand-main text-white py-1 px-4 rounded focus:outline-none cursor-pointer hover:brightness-95"
    >
      Clear
    </button>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup (_, { emit }) {
    const inputRadio = ref('')

    function handleClearFilter () {
      inputRadio.value = ''
    }

    watch(inputRadio, () => {
      emit('select', inputRadio.value)
    })

    return {
      inputRadio,
      handleClearFilter
    }
  }
}
</script>
