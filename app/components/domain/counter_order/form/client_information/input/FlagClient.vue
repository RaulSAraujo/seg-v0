<script lang="ts" setup>
const counterOrderClientStore = useCounterOrderClientStore();
const { customerData } = storeToRefs(counterOrderClientStore);

const color = computed(() => {
  if (customerData.value.flag_client == 0) return "blue";
  if (customerData.value.flag_client == 1) return "green";
  if (customerData.value.flag_client == 2) return "red";

  return "white";
});
</script>

<template>
  <v-menu location="top" offset="0 18" disabled>
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-circle"
        variant="plain"
        density="comfortable"
        :color="color"
        disabled
      />
    </template>

    <v-sheet class="pa-2 rounded-xl">
      <v-item-group v-model="customerData.flag_client">
        <v-item v-slot="{ toggle }">
          <v-icon
            icon="mdi-circle"
            density="comfortable"
            color="yellow"
            @click="toggle"
          />
        </v-item>

        <v-item v-slot="{ toggle }">
          <v-icon
            icon="mdi-circle"
            density="comfortable"
            color="green"
            @click="toggle"
          />
        </v-item>

        <v-item v-slot="{ toggle }">
          <v-icon
            icon="mdi-circle"
            density="comfortable"
            color="red"
            @click="toggle"
          />
        </v-item>
      </v-item-group>
    </v-sheet>
  </v-menu>
</template>
