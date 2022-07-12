
<template>
  <div class="flex flex-col p-10 justify-center items-center">
    <h1 class="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
      Company patient list
    </h1>

    <user-loading v-if="state.isLoading && !state.patients.length" />

    <p
      v-else-if="state.hasError"
      class="text-lg font-medium text-gray-800 text-center"
    >
      There was an error loading Patient data
    </p>

    <user-table
      v-else
      class="max-w-xl"
      :patients="state.patients"
      @show-details="handleShowDetailsPatients"
    />

    <user-loading
      v-if="state.isLoading && state.patients.length"
      class="mt-5"
    />

    <button
      class="flex justify-center items-center gap-2 mt-5 focus:outline-none p-2 cursor-pointer"
      @click="getPatients"
      :disabled="state.isLoading"
    >
      <Icon
        name="loading"
        size="24"
        color="#333"
      />

      <span class="text-gray-800 font-regular">
        Loading more...
      </span>
    </button>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'

import Icon from '@/components/Icon'
import UserTable from './UserTable/index.vue'
import UserLoading from './UserTable/Loading.vue'

import services from '@/services'

const DEFAULT_PAGE = 0
const MAX_LIMIT = 50

export default {
  components: {
    UserTable,
    UserLoading,
    Icon
  },
  setup () {
    const state = reactive({
      patients: [],
      isLoading: false,
      hasError: false,
      pagination: {
        page: DEFAULT_PAGE,
        results: MAX_LIMIT
      }
    })

    onMounted(async () => {
      await getPatients()
    })

    async function getPatients () {
      try {
        state.isLoading = true
        const { data } = await services.patient.getAll({
          ...state.pagination
        })

        if (data?.results.length) state.patients.push(...data?.results)

        state.pagination.page = ++state.pagination.page
      } catch (error) {
        handleError(error)
      } finally {
        state.isLoading = false
      }
    }

    function handleError (error) {
      state.hasError = !!error
    }

    function handleShowDetailsPatients (id) {
      console.log({ id })
    }

    return {
      state,
      handleShowDetailsPatients,
      getPatients
    }
  }
}
</script>
