<script lang="ts" setup>
defineProps<{
  delayedOrders: number[];
}>();

const dialog = ref(false);
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" width="260px">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-open-in-new"
        variant="plain"
        density="compact"
        size="small"
        style="z-index: 999; position: absolute; right: 15px; top: 10px"
      />
    </template>

    <v-card rounded="xl" title="PEDIDOS ATRASADOS">
      <template #text>
        <v-virtual-scroll :height="300" :items="delayedOrders">
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
