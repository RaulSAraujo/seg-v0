<script lang="ts" setup>
import type { Device } from "~/interfaces/CustomerHistory";

const props = defineProps<{
  data: Device[];
}>();

const computedData = computed(() => {
  return props.data.map((e) => {
    return {
      name: e.device || "Sem aparelho",
      y: parseFloat(`${e.value_percentage}`),
    };
  });
});

const theme = useTheme();

const options = computed(() => ({
  chart: {
    type: "pie",
    backgroundColor: "transparent",
  },
  title: {
    text: "VALOR",
    style: {
      color: theme.global.current.value.dark ? "white" : "#5097dd",
      fontSize: "1.0em",
      opacity: 0.7,
    },
  },
  tooltip: {
    valueSuffix: "%",
  },
  plotOptions: {
    series: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: [
        {
          enabled: true,
          distance: 20,
          textOutline: "none",
          color: theme.global.current.value.dark ? "white" : "black",
        },
        {
          enabled: true,
          distance: -40,
          format: "{point.percentage:.1f}%",
          style: {
            fontSize: "1.2em",
            textOutline: "none",
            opacity: 0.7,
          },
          filter: {
            operator: ">",
            property: "percentage",
            value: 10,
          },
        },
      ],
    },
  },
  series: [
    {
      name: "Percentage",
      colorByPoint: true,
      data: computedData.value,
    },
  ],
}));
</script>

<template>
  <div>
    <highcharts :options="options" />
  </div>
</template>
