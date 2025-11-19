<script lang="ts" setup>
const clientStore = useServiceOrderClientStore();
const { clientData } = storeToRefs(clientStore);

const color = computed(() => {
  if (clientData.value.flag_client == 0) return "blue";
  if (clientData.value.flag_client == 1) return "green";
  if (clientData.value.flag_client == 2) return "red";

  return "white";
});
</script>

<template>
  <v-menu location="top" offset="0 18">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-circle"
        variant="plain"
        density="comfortable"
        :color="color"
      />
    </template>

    <v-sheet class="pa-2 rounded-xl">
      <v-item-group v-model="clientData.flag_client">
        <v-item v-slot="{ toggle }">
          <v-icon
            icon="mdi-circle"
            density="comfortable"
            color="yellow"
            @click="toggle"
          />
        </v-item>

        <v-item v-slot="{ toggle }">
          <v-icon icon="mdi-circle" density="comfortable" color="green" @click="toggle" />
        </v-item>

        <v-item v-slot="{ toggle }">
          <v-icon icon="mdi-circle" density="comfortable" color="red" @click="toggle" />
        </v-item>
      </v-item-group>
    </v-sheet>
  </v-menu>
</template>
