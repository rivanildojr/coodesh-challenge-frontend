<template>
  <table class="border border-gray-800 w-full">
    <thead class="table-people_thead">
      <tr class="border-b border-gray-800">
        <th
          v-for="name in tableHead"
          :key="name"
          class="bg-brand-graydark text-white py-2 px-6 border border-gray-800 text-center"
        >
          {{ name }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="patient in patients"
        :key="patient.id.value"
      >
        <td class="item-table">{{ fullName(patient.name) }}</td>
        <td class="item-table">{{ patient.gender }}</td>
        <td class="item-table" >{{ patient.registered.age }}</td>
        <td class="item-table">
          <button
            @click="handleClickShowDetails(patient.id)"
            class="rounded-md bg-brand-main text-white font-regular py-1 px-2 focus:outline-none cursor-pointer hover:brightness-95"
          >
            Details
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref } from 'vue'

import { TABLE_HEAD } from '../constants'

export default {
  props: {
    patients: {
      type: Array,
      default: () => []
    }
  },
  setup (_, { emit }) {
    const tableHead = ref(TABLE_HEAD)

    function fullName (name) {
      return `${name.title} ${name.first} ${name.last}`
    }

    function handleClickShowDetails ({ value }) {
      emit('show-details', value)
    }

    return {
      tableHead,
      handleClickShowDetails,
      fullName
    }
  }
}
</script>
<style lang="postcss" scoped>
.item-table {
  @apply text-xs sm:text-base font-medium text-gray-800 text-center border border-gray-800 p-1;
}

.item-table:first-child {
  @apply text-left text-ellipsis
}
</style>
