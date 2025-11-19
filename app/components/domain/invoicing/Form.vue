<script lang="ts" setup>
import type { Form } from "~/interfaces/InvoiceRule";

defineProps<{
  title: string;
}>();

defineEmits(["save"]);

const form = reactive<Form>({
  erp_company_id: undefined,
  parameter: "INDICADOR",
  value: undefined,
  label_value: "",
  route: "",
});

const erpBrand = ref();
const indicators = ref();

watch(
  () => form.parameter,
  () => {
    form.value = undefined;

    form.label_value = "";

    if (erpBrand.value) {
      erpBrand.value.select = null;
    }

    if (indicators.value) {
      indicators.value.select = null;
    }
  }
);

defineExpose({ form });
</script>

<template>
  <v-card rounded="xl" :title="title">
    <template #text>
      <v-row dense>
        <v-col cols="12">
          <InvoicingCompanies v-model="form.erp_company_id" />
        </v-col>

        <v-col cols="12">
          <InvoicingParameter v-model="form.parameter" />
        </v-col>

        <v-col cols="12">
          <InvoicingErpBrand
            v-if="form.parameter == 'INDICADOR'"
            ref="erpBrand"
            @update-value="form.value = $event"
            @update-label="form.label_value = $event"
          />

          <InvoicingIndicators
            v-if="form.parameter == 'MARCA'"
            ref="indicators"
            @update-value="form.value = $event"
            @update-label="form.label_value = $event"
          />
        </v-col>

        <v-col cols="12">
          <UiTextField v-model="form.route" label="Rota" />
        </v-col>
      </v-row>
    </template>

    <template #actions>
      <v-spacer />

      <v-btn
        class="mb-2"
        color="primary"
        width="8vw"
        variant="flat"
        text="SALVAR"
        @click="$emit('save', form)"
      />
      <v-spacer />
    </template>
  </v-card>
</template>
