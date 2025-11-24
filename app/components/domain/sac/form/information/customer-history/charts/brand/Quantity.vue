<script lang="ts" setup>
import type { Brand } from "~/interfaces/CustomerHistory";

const props = defineProps<{
  data: Brand[];
}>();

const theme = useTheme();

const computedData = computed(() => {
  return props.data.map((e) => {
    return {
      name: e.brand || "Sem marca",
      y: parseFloat(`${e.quantity_percentage}`),
    };
  });
});

const options = computed(() => ({
  chart: {
    type: "pie",
    backgroundColor: "transparent",
  },
  title: {
    text: "QUANTIDADE",
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
          style: {
            textOutline: "none",
            color: theme.global.current.value.dark ? "white" : "black",
          },
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
