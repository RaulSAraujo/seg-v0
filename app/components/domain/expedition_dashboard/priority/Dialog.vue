<script lang="ts" setup>
defineProps<{
  prioritySaleIds: number[];
}>();

const dialog = ref(false);
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" width="260px">
    <template #activator="{ props }">
      <v-btn
        v-if="prioritySaleIds.length > 0"
        v-bind="props"
        icon="mdi-open-in-new"
        variant="plain"
        density="compact"
        size="small"
        style="z-index: 999; position: absolute; right: 15px; top: 10px"
      />
    </template>

    <v-card rounded="xl" title="PEDIDOS PRIORITÁRIOS">
      <template #text>
        <v-virtual-scroll :height="300" :items="prioritySaleIds">
          <template #default="{ item }">
            <div class="pa-2 text-center">
              {{ item }}
            </div>

            <v-divider />
          </template>
        </v-virtual-scroll>
      </template>
    </v-card>
  </v-dialog>
</template>
