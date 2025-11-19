<script lang="ts" setup>
import type { Automation } from "~/interfaces/Puppeteer";

defineProps<{
  automations: Automation[];
}>();
</script>

<template>
  <UiCombobox
    label="Selecione a automação"
    :items="automations ?? []"
    item-title="name_automation"
    item-value="name_automation"
    :multiple="false"
    :clearable="true"
    prepend-icon="mdi-robot-confused"
    return-object
  />
</template>
