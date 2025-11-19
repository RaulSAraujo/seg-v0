<script setup lang="ts">
defineOptions({
  name: "ClientGender",
});
</script>

<template>
  <UiRadioGroup hide-details="auto" prepend-icon="mdi-gender-transgender">
    <template #default>
      <v-radio id="MASCULINO" name="MASCULINO" label="Masculino" value="M" />
      <v-radio id="FEMININO" name="FEMININO" label="Feminino" value="F" />
      <v-radio id="OUTROS" name="OUTROS" label="Outros" value="O" />
    </template>
  </UiRadioGroup>
</template>
