<script lang="ts" setup>
defineOptions({
  name: "ClientInputCpfCnpj",
});

defineProps<{
  disabled?: boolean;
}>();

const { value: type } = useField<boolean>("type");

const { value: cpfCnpj, errorMessage: error } = useField<string | undefined>(
  "cpf_cnpj"
);
</script>

<template>
  <UiTextField
    v-model="cpfCnpj"
    v-maska="!type ? '###.###.###-##' : '##.###.###/####-##'"
    label="Cpf/Cnpj"
    hide-details="auto"
    :placeholder="!type ? '___.___.___-__' : '__.___.___/____-__'"
    :disabled="(type != false && type != true) || disabled"
    :error-messages="error"
  />
</template>
