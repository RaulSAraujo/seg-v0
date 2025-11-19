import { defineNuxtPlugin } from "#app";
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";

Highcharts.setOptions({
  accessibility: {
    enabled: false,
  },
});

export default defineNuxtPlugin({
  name: "highcharts-vue",
  parallel: true,
  setup(nuxtApp) {
    nuxtApp.vueApp.use(HighchartsVue);
  },
});
