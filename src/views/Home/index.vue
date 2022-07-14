
<template>
  <div class="p-5 sm:p-10 w-full flex flex-col justify-center items-center">
    <div class="flex flex-col justify-center items-center w-full sm:w-9/12 max-w-5xl">
      <h1 class="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
        Company patient list
      </h1>

      <div class="mb-10 w-full flex gap-2 relative">
        <search
          v-model:search="search"
        />

        <button
          class="bg-brand-main w-max px-4 flex items-center justify-center rounded-sm text-white font-medium focus:outline-none cursor-pointer hover:brightness-95"
          @click="handleToggleFilter"
        >
          Filter
        </button>

        <filter-table
          v-show="showFilter"
          :items="itemsFilter"
          @select="handleSelectFilter"
          class="absolute top-12 right-0 bg-white flex items-center justify-center rounded-sm z-10"
        />
      </div>

      <user-loading v-if="state.isLoading && !patientsStore.length" />

      <p
        v-else-if="state.hasError"
        class="text-lg font-medium text-gray-800 text-center"
      >
        There was an error loading Patient data
      </p>

      <user-table
        id="user-table"
        v-else
        class="w-full"
        :patients="filterListPatients"
        @show-details="handleShowDetailsPatients"
      />

      <user-loading
        v-if="state.isLoading && patientsStore.length"
        class="mt-5"
      />

      <button
        v-show="filterListPatients.length"
        class="flex justify-center items-center gap-2 mt-5 focus:outline-none p-2 cursor-pointer ease-in duration-500"
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
  </div>
</template>

<script>
import { onMounted, reactive, ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'
import { useRouter, useRoute } from 'vue-router'

import useModal from '@/hooks/useModal'

import Search from '@/components/Search'
import Icon from '@/components/Icon'
import UserTable from './UserTable'
import UserLoading from './UserTable/Loading.vue'
import FilterTable from './FilterTable'

import { FILTER_NAME, FIELD_NAME } from './constants'

import services from '@/services'

const DEFAULT_PAGE = 0
const MAX_LIMIT = 50

export default {
  components: {
    Search,
    UserTable,
    UserLoading,
    Icon,
    FilterTable
  },
  setup () {
    const state = reactive({
      isLoading: false,
      hasError: false,
      pagination: {
        page: DEFAULT_PAGE,
        results: MAX_LIMIT
      },
      seed: null
    })
    const search = ref('')
    const showFilter = ref('')
    const filterSearch = ref('')

    const store = useStore()
    const toast = useToast()
    const modal = useModal()
    const router = useRouter()
    const route = useRoute()

    onMounted(async () => {
      await getPatients()
    })

    watch(() => route.params.id, () => {
      if (!route.params.id) return

      openModal()
    }, { immediate: true })

    const patientsStore = computed(() => {
      return store.state.patient.patients
    })

    const filterListPatients = computed(() => {
      if (!search.value) return patientsStore.value

      switch (filterSearch.value) {
        case 'name':
          return filterName()
        case 'nat':
          return filterNationality()
        default:
          return filterName()
      }
    })

    async function getPatients () {
      try {
        state.isLoading = true
        const { data } = await services.patient.getAll({
          ...state.pagination
        })

        if (data?.results.length) {
          const newResults = data?.results.map((patient) => ({ ...patient, page: state.pagination.page, seed: data?.info?.seed }))
            .filter((patient) => patient?.id?.value)
          store.dispatch('patient/addPatients', newResults)
        }

        state.pagination.page = ++state.pagination.page
        state.seed = data?.info?.seed
      } catch (error) {
        handleError(error)
      } finally {
        state.isLoading = false
      }
    }

    function handleError (error) {
      state.hasError = !!error
      toast.error('An error occurred while loading patients.')
    }

    function handleShowDetailsPatients (patient) {
      const newID = patient.id.value.replace(/ /g, '')

      if (route.params.id === newID) {
        openModal()
        return
      }

      router.push({
        name: 'patients',
        params: {
          page: patient.page,
          seed: patient.seed,
          id: newID
        }
      })
    }

    function handleSelectFilter (value) {
      if (!value) return

      filterSearch.value = value === FIELD_NAME ? 'name' : 'nat'
    }

    function handleToggleFilter () {
      showFilter.value = !showFilter.value
    }

    function filterName () {
      return patientsStore.value.filter((patient) => {
        const fullName = `${patient.name.title} ${patient.name.first} ${patient.name.last}`

        return fullName.toLowerCase().includes(search.value.trim().toLowerCase())
      })
    }

    function filterNationality () {
      return patientsStore.value.filter((patient) => {
        return patient.nat.toLowerCase().includes(search.value.trim().toLowerCase())
      })
    }

    function openModal () {
      modal.open({
        component: 'ModalUser'
      })
    }

    return {
      state,
      search,
      patientsStore,
      filterListPatients,
      showFilter,
      itemsFilter: FILTER_NAME,
      handleShowDetailsPatients,
      getPatients,
      handleSelectFilter,
      handleToggleFilter
    }
  }
}
</script>
