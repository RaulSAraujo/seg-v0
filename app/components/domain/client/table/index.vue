<script lang="ts" setup>
import { CpfOrCnpj, FlagClient, RgOrIe, Gender } from "./templates";

defineOptions({
  name: "ClientTable",
});

const formatNumber = (value: string) => {
  return value?.replace(/^([0-9]{2})([0-9]{4,5})([0-9]{4})$/, "($1) $2-$3");
};
</script>

<template>
  <UiTable
    show-select
    multi-sort
    :others-query="{
      full: true,
    }"
  >
    <template #item.action="{ item }">
      <v-btn
        icon="mdi-pencil"
        variant="plain"
        size="small"
        color="blue"
        :to="{
          name: 'client-id',
          params: { id: item.id },
        }"
      />
    </template>

    <template #item.cpf_cnpj="{ item }">
      <CpfOrCnpj :value="item.cpf_cnpj" />
    </template>

    <template #item.identity_number="{ item }">
      <RgOrIe :value="item.identity_number" />
    </template>

    <template #item.flag_client="{ item }">
      <FlagClient :value="item.flag_client" />
    </template>

    <template #item.gender="{ item }">
      <Gender :gender="item.gender" />
    </template>

    <template #item.type="{ item }">
      <span>{{ item.type == false ? "FÍSICO" : "JURÍDICO" }}</span>
    </template>

    <template #item.number1="{ item }">
      <UiTooltip :text="formatNumber(item.number1)" :vw="5" />
    </template>

    <template #item.number2="{ item }">
      <UiTooltip :text="formatNumber(item.number2)" :vw="5" />
    </template>

    <template #item.number3="{ item }">
      <UiTooltip :text="formatNumber(item.number3)" :vw="5" />
    </template>

    <template #item.phone_mercado_pago="{ item }">
      <UiTooltip :text="formatNumber(item.phone_mercado_pago)" :vw="5" />
    </template>
  </UiTable>
</template>
