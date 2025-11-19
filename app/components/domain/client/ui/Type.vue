<script setup lang="ts">
defineOptions({
  name: "ClientType",
});
</script>

<template>
  <UiRadioGroup hide-details="auto" prepend-icon="mdi-clipboard-account">
    <template #default>
      <v-radio id="FISICO" name="FISICO" label="Fisico" :value="false" />
      <v-radio id="JURIDICO" name="JURIDICO" label="Juridico" :value="true" />
    </template>
  </UiRadioGroup>
</template>
