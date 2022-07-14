<template>
  <content-loader
    v-if="isLoading"
    class="flex flex-col items-center rounded"
    width="80%"
    height="300px"
  >
    <content-loader
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animation-duration="2s"
    />
  </content-loader>

  <p
    v-else-if="!patient"
    class="text-lg font-bold text-gray-800 text-center"
  >
    Could not find any results!
  </p>

  <div v-else>
    <div class="flex items-center justify-center absolute -top-10 left-1/2 -translate-x-1/2 rounded-full bg-brand-gray shadow-md">
      <img
        :src="patient.picture.medium"
        alt="user photo"
        lazy="load"
        decode="async"
        class="object-cover rounded-full"
      >
    </div>

    <div class="flex mb-2">
      <span class="text-lg font-bold">FullName:</span>
      <span class="text-lg font-regular ml-2">{{ fullName }}</span>
    </div>

    <div class="flex mb-2">
      <span class="text-lg font-bold">Email:</span>
      <span class="text-lg font-regular ml-2">{{ patient.email }}</span>
    </div>

    <div class="flex mb-2">
      <span class="text-lg font-bold">Birth date:</span>
      <span class="text-lg font-regular ml-2">{{ birthDate }}</span>
    </div>

    <div class="flex mb-2">
      <span class="text-lg font-bold">Phone:</span>
      <span class="text-lg font-regular ml-2">{{ patient.phone }}</span>
    </div>

    <div class="flex mb-2">
      <span class="text-lg font-bold">Nationality:</span>
      <span class="text-lg font-regular ml-2">{{ patient.nat }}</span>
    </div>

    <div class="flex mb-2">
      <span class="text-lg font-bold">Address:</span>
      <span class="text-lg font-regular ml-2">{{ address }}</span>
    </div>

    <div class="flex mb-2">
      <span class="text-lg font-bold">ID:</span>
      <span class="text-lg font-regular ml-2">{{ patient.id.value }}</span>
    </div>

    <div class="flex mb-2">
      <span class="text-lg font-bold">URL:</span>
      <span
        class="text-lg font-regular ml-2 underline text-ellipsis overflow-hidden cursor-pointer"
        @click="handleCopyUrl"
      >
        {{ url }}
      </span>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

import ContentLoader from '@/components/ContentLoader'

import services from '@/services'

const MAX_LIMIT = 50

export default {
  components: {
    ContentLoader
  },
  setup () {
    const isLoading = ref(false)

    const store = useStore()
    const route = useRoute()
    const toast = useToast()

    onMounted(async () => {
      await getPatients()
    })

    const patientsStore = computed(() => {
      return store.state.patient.patients
    })

    const patient = computed(() => {
      if (!patientsStore.value.length) return null

      return patientsStore.value.find((patient) => {
        let newID = ''
        if (patient?.id?.value) newID = patient.id.value.replace(/ /g, '')

        return newID === route.params?.id
      })
    })

    const fullName = computed(() => {
      if (!patient.value) return ''

      return `${patient.value.name.title} ${patient.value.name.first} ${patient.value.name.last}`
    })

    const birthDate = computed(() => {
      if (!patient.value) return ''

      const date = new Date(patient.value.dob.date)
      return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`
    })

    const address = computed(() => {
      if (!patient.value) return ''

      return `${patient.value.location.state},${patient.value.location.city} - ${patient.value.location.street.name} - ${patient.value.location.street.number}`
    })

    const url = computed(() => {
      return window.location.href
    })

    async function handleCopyUrl () {
      toast.clear()
      try {
        await navigator.clipboard.writeText(url.value)
        toast.success('copied!')
      } catch (error) {
        toast.error('Could not copy!')
      }
    }

    async function getPatients () {
      try {
        isLoading.value = true
        if (patient.value) return

        const { data } = await services.patient.getAll({
          page: route.params.page,
          results: MAX_LIMIT,
          seed: route.params.seed
        })

        if (data?.results.length) store.dispatch('patient/addPatients', data?.results)
      } catch (error) {
        toast.error('An error occurred while loading patient.')
      } finally {
        isLoading.value = false
      }
    }

    return {
      isLoading,
      patient,
      fullName,
      birthDate,
      address,
      url,
      handleCopyUrl
    }
  }
}
</script>
