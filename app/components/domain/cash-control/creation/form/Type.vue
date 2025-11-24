<script lang="ts" setup>
defineOptions({
  name: "CashControlType",
});

const types = ref(["ENTRADA", "SAÍDA", "SANGRIA"]);
</script>

<template>
  <UiSelect
    label="Tipo do pagamento"
    :items="types"
    :multiple="false"
    :return-object="false"
    :clearable="true"
  />
</template>
