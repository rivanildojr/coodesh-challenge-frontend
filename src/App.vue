
<template>
  <modal-factory />

  <div class="h-screen flex flex-col">
    <the-header />

    <main>
      <router-view />
    </main>

    <the-footer class="self-end"/>
  </div>
</template>

<script>
import ModalFactory from '@/components/ModalFactory'
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'

export default {
  components: {
    ModalFactory,
    TheHeader,
    TheFooter
  },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
