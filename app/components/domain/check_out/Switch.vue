<script setup lang="ts">
const { data } = useAuth();

const activeMyPackages = ref(true);

const dayjs = useDayjs();

const tableStore = useTableStore();
const { othersQuery } = storeToRefs(tableStore);

const changeMypackage = () => {
  if (activeMyPackages.value) {
    othersQuery.value = {};
  } else {
    othersQuery.value = {
      user: data.value?.name,
      created_at: dayjs().format("YYYY-MM-DD"),
    };
  }

  tableStore.searchData();
};
</script>

<template>
  <v-switch
    id="switchMyPackages"
    v-model="activeMyPackages"
    inset
    label="MEUS PACOTES"
    color="primary"
    density="compact"
    :base-color="!activeMyPackages ? 'red' : ''"
    class="ml-5"
    hide-details
    @click="changeMypackage"
  />
</template>

<style scoped>
:deep(.v-switch__track) {
  opacity: 1;
}
</style>
