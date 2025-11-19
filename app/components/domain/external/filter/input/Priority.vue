<script setup lang="ts">
const props = defineProps<{
  status: number[];
}>();

const emit = defineEmits(["priority"]);

const activePriority = ref(false);

const statusPriority = ref([2, 4, 10, 13, 18, 21, 22, 30]);

const changePriority = (value: boolean | null) => {
  if (value == false) {
    emit("priority", []);
  }

  if (value == true) {
    emit("priority", statusPriority.value);
  }
};

watch(
  () => props.status,
  () => {
    let activeStatus = props.status;

    if (activeStatus) {
      activeStatus = activeStatus.sort((a, b) => a - b);
    }

    if (activeStatus.join(",") == statusPriority.value.join(",")) {
      activePriority.value = true;
    } else {
      activePriority.value = false;
    }
  }
);
</script>

<template>
  <v-switch
    id="switchPriority"
    v-model="activePriority"
    inset
    label="PRIORIDADE"
    color="primary"
    density="compact"
    :base-color="!activePriority ? 'red' : ''"
    class="ml-5"
    hide-details
    @update:model-value="changePriority($event)"
  />
</template>

<style scoped>
:deep(.v-switch__track) {
  opacity: 1;
}
</style>
