<script setup lang="ts">
const checkOutStore = useCheckOutStore();
const { dateUserAnalysis } = storeToRefs(checkOutStore);

const dayjs = useDayjs();

dateUserAnalysis.value = `${dayjs()
  .subtract(10, "days")
  .format("DD/MM/YYYY")},${dayjs().format("DD/MM/YYYY")}`;

const saveDate = (event: string) => {
  dateUserAnalysis.value = `${dayjs(event[0]).format("DD/MM/YYYY")},${dayjs(
    event[event.length - 1]
  ).format("DD/MM/YYYY")}`;
};
</script>

<template>
  <UiDatePicker
    v-model="dateUserAnalysis"
    label="Informe a data"
    multiple="range"
    :clearable="false"
    @save="saveDate($event)"
  />
</template>
