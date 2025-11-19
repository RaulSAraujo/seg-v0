<script setup>
defineOptions({
  name: "HomeClock",
});

const now = useNow({ interval: 1000 });
const clock = computed(() => useDayjs(now.value).utc().local().format("HH:mm"));
</script>

<template>
  <ClientOnly>
    <div class="d-flex flex-column justify-center align-center">
      <span class="text-h1 text-white">
        {{ clock }}
      </span>

      <span class="text-overline text-white">
        {{ $dayjs().format("dddd Dº MMMM") }}
      </span>
    </div>
  </ClientOnly>
</template>
