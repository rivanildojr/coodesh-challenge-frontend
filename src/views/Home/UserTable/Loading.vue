<template>
  <content-loader
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

    <content-loader
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animation-duration="2.2s"
    />

    <content-loader
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animation-duration="2.4s"
    />

    <content-loader
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animation-duration="2.6s"
    />

  </content-loader>
</template>

<script>
import ContentLoader from '@/components/ContentLoader'

export default {
  components: {
    ContentLoader
  }
}
</script>
