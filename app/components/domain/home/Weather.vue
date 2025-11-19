<script setup lang="ts">
defineOptions({
  name: "HomeWeather",
});

const { data, status } = useWeather({ lazy: true });
</script>

<template>
  <div
    style="
      left: 35px;
      bottom: 35px;
      width: 300px;
      height: 150px;
      position: absolute;
    "
  >
    <v-skeleton-loader
      :loading="status === 'pending'"
      type="image"
      theme="light"
      color="transparent"
    >
      <div class="rounded-xl pa-5" style="background-color: rgba(0, 0, 0, 0.3)">
        <div class="text-center">
          <v-icon class="mr-2" color="white">mdi-map-marker</v-icon>

          <span class="text-h5 text-white font-weight-bold">
            {{ data?.name }}
          </span>
        </div>

        <div class="text-body-2 text-white text-center font-weight-regular">
          <span>{{ data?.temp }} º C</span>
        </div>

        <div class="d-flex flex-row align-center justify-center">
          <span class="text-body-1 text-white">
            {{ data?.description }}
          </span>

          <NuxtImg
            :src="`https://openweathermap.org/img/wn/${data?.icon}.png`"
            format="webp"
            loading="lazy"
          />
        </div>

        <div class="d-flex flex-rows align-center justify-center">
          <div>
            <v-icon class="mr-2" color="white">mdi-water</v-icon>

            <span class="text-overline text-white">
              {{ data?.humidity }}%
            </span>
          </div>

          <div>
            <v-icon class="mr-2" color="white">mdi-weather-windy</v-icon>

            <span class="text-overline text-white">
              {{ data?.speed }}km/h
            </span>
          </div>
        </div>
      </div>
    </v-skeleton-loader>
  </div>
</template>
