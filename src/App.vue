
<template>
  <div class="h-screen flex flex-col">
    <the-header />

    <main>
      <router-view />
    </main>

    <the-footer class="self-end"/>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'

export default {
  components: {
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
