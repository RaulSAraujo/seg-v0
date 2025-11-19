<script lang="ts" setup>
const counterOrderStore = useCounterOrderStore();
const { attendanceTypesList, loadingAttendanceTypes } = storeToRefs(counterOrderStore);

onMounted(() => {
  counterOrderStore.fetchAttendanceTypes();
});
</script>

<template>
  <UiCombobox
    v-if="!loadingAttendanceTypes"
    label="Atendimento"
    :items="attendanceTypesList ?? []"
    item-title="name"
    item-value="id"
    :multiple="false"
    :clearable="true"
  />

  <v-skeleton-loader v-else type="text" />
</template>
