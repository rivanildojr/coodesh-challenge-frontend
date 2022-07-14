<template>
  <transition name="fade" mode="out-in">
    <feedback-user
      v-if="!patients.length"
      message="Could not find any results!"
    />

    <table
      v-else
      class="border border-gray-800 w-full"
    >
      <thead class="table-people_thead">
        <tr class="border-b border-gray-800">
          <th
            v-for="column in tableHead"
            :key="column.name"
            class="bg-brand-graydark text-white py-1 px-6 border border-gray-800 text-center text-xs sm:text-base relative"
          >
            <span>{{ column.name }}</span>

            <div v-if="column.filter">
              <button
                class="absolute top-0 right-0 h-full w-4 sm:w-8 bg-white flex items-center justify-center rounded-sm"
                @click="handleToggleFilter"
              >
                <icon
                  name="filter"
                  color="#333"
                  size="15"
                />
              </button>

              <filter-table
                v-show="showFilter"
                :items="setItemsFilter(column.field)"
                @select="handleSelectFilter($event, column.field)"
                class="absolute top-10 right-0 bg-white flex items-center justify-center rounded-sm z-10"
              />
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="patient in newListPatients"
          :key="patient.id.value"
          class="ease-in duration-300"
        >
          <td class="item-table">{{ fullName(patient.name) }}</td>
          <td class="item-table">{{ patient.gender }}</td>
          <td class="item-table" >{{ birthDate(patient.dob.date) }}</td>
          <td class="item-table">
            <button
              @click="handleClickShowDetails(patient.id)"
              class="rounded-md bg-brand-main text-white font-regular py-1 px-2 focus:outline-none cursor-pointer hover:brightness-95"
            >
              View
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </transition>
</template>

<script>
import { reactive, ref, computed } from 'vue'

import Icon from '@/components/Icon'
import FeedbackUser from '@/components/FeedbackUser'
import FilterTable from '../FilterTable'

import { TABLE_HEAD } from '../constants'

export default {
  components: {
    Icon,
    FeedbackUser,
    FilterTable
  },
  props: {
    patients: {
      type: Array,
      default: () => []
    }
  },
  setup (props, { emit }) {
    const tableHead = ref(TABLE_HEAD)
    const showFilter = ref(false)
    const filterValue = reactive({
      columnName: '',
      value: ''
    })

    const newListPatients = computed(() => {
      if (!filterValue.value) {
        return props.patients
      }

      return props.patients.filter((patients) => patients[filterValue.columnName] === filterValue.value)
    })

    function fullName (name) {
      return `${name.title} ${name.first} ${name.last}`
    }

    function birthDate (date) {
      const birth = new Date(date)

      return `${birth.getMonth()}/${birth.getDay()}/${birth.getFullYear()}`
    }

    function handleClickShowDetails ({ value }) {
      emit('show-details', value)
    }

    function handleSelectFilter (value, columnName) {
      filterValue.columnName = columnName
      filterValue.value = value
    }

    function handleToggleFilter () {
      showFilter.value = !showFilter.value
    }

    function setItemsFilter (columnName) {
      const listColumn = props.patients.map((patient) => patient[columnName])
      return [...new Set(listColumn)]
    }

    return {
      tableHead,
      showFilter,
      newListPatients,
      fullName,
      birthDate,
      handleClickShowDetails,
      handleSelectFilter,
      handleToggleFilter,
      setItemsFilter
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
