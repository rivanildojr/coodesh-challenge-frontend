<template>
  <header class="w-full flex justify-between items-center bg-brand-main p-8">
    <div class="flex items-center gap-2">
      <img
        src="@/assets/images/logo.png"
        alt="Logo"
        class="w-14 lg:w-16"
        lazy="load"
        defer="async"
      />

      <h1 class="text-lg md:text-2xl font-bold text-gray-800">
        Pharma Inc
      </h1>
    </div>

    <h2 class="text-base md:text-lg font-medium text-gray-800">
      Patients
    </h2>
  </header>
</template>

<script>
export default {
  setup () {
    return {}
  }
}
</script>
