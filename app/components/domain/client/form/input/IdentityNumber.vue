<script lang="ts" setup>
defineOptions({
  name: "ClientInputIdentityNumber",
});

const { value: identityNumber, errorMessage: error } = useField<string | undefined>(
  "identity_number"
);
const { value: type } = useField<boolean>("type");
</script>

<template>
  <UiTextField
    v-model="identityNumber"
    v-maska="!type ? '##.###.###-##' : '##.###.###-X'"
    label="Rg/ie"
    hide-details="auto"
    :placeholder="!type ? '__.___.___-__' : '__.___.___-_'"
    :disabled="type != false && type != true"
    :error-messages="error"
  />
</template>
