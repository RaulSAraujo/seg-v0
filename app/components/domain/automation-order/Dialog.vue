<script lang="ts" setup>
interface Automation {
  description: string;
  name: string;
  route: string;
}

defineEmits(["close", "snackbar"]);

const selected = ref<Automation>();

const clear = () => {
  selected.value = undefined;
};
</script>

<template>
  <v-dialog width="350" @after-leave="clear">
    <v-card title="INICIAR AUTOMAÇÃO" rounded="lg">
      <template #append>
        <v-tooltip
          location="top"
          :text="selected?.description ?? 'Selecione uma automação'"
          content-class="text-white"
        >
          <template #activator="{ props: tooltip }">
            <V-btn
              v-bind="tooltip"
              variant="plain"
              density="compact"
              icon="mdi-information"
            />
          </template>
        </v-tooltip>
      </template>

      <template #text>
        <v-row dense>
          <v-col cols="12">
            <AutomationOrderInputSelectAutomation v-model="selected" />

            <AutomationOrderStatus
              v-if="selected?.name == 'Status dos Pedidos'"
              @snackbar="$emit('snackbar', $event)"
              @close="$emit('close')"
            />

            <AutomationOrderForceSync
              v-if="selected?.name == 'Forçar dados Fiscais'"
              @close="$emit('close')"
            />
          </v-col>
        </v-row>
      </template>
    </v-card>
  </v-dialog>
</template>
