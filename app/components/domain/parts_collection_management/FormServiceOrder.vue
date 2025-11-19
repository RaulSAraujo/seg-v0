<script lang="ts" setup>
import type { ServiceOrder } from "~/interfaces/PartsCollectionManagement";

defineProps<{
  methodRest: "POST" | "PUT";
}>();

const partsCollection = usePartsCollectionStore();
const { form, products } = storeToRefs(partsCollection);

const typeToLabelMap: { [key: number]: string } = {
  1: "ORÇAMENTO",
  3: "FORA DE GARANTIA",
  6: "GARANTIA ESTENDIDA",
  11: "GARANTIA FABRICANTE",
  12: "REINGRESSO GAR. FAB.",
  13: "REINGRESSO FOR. GAR.",
  14: "REINGRESSO GAR. EST.",
  15: "COMPROVANTE ANTIGO",
  16: "COMPROVANTE ENTRADA",
  17: "APARELHO DELTA",
};

const { isDate, brDate, databaseDate } = useDateConversion();

const dayjs = useDayjs();

const update = (event: ServiceOrder) => {
  form.value.service_order_id = event.id;
  form.value.collection_date_os = dayjs().format("DD/MM/YYYY");
  form.value.os_supplier = event.os_supplier;
  form.value.end_date_os = brDate(`${event.apparatus_delivery_at ?? ""}`);
  form.value.model = event.model;
  form.value.apparatus = event.apparatus;
  form.value.serial_number = event.serial_number;
  form.value.version = event.version;
  form.value.brand = event.supplier;
  form.value.type_warranty = typeToLabelMap[event.type] ?? "";
  form.value.warranty_supplier = convertTypeWarranty(event);
  form.value.type = event.type;
  form.value.defect = event.defect_description;
  form.value.limit_date_storage = setLimitDate(
    event.type,
    form.value.end_date_os
  );

  products.value = event.ServiceOrderProducts;
};

const convertTypeWarranty = (event: ServiceOrder) => {
  if (event.type == 6) return event.extended_warranty;
  if (event.type == 11) return event.supplier;

  return "";
};

const setLimitDate = (type: number, endDateOS: string) => {
  if (!type || !endDateOS) return "";

  if (!isDate(endDateOS)) return "";

  if (products.value.length == 0) {
    if (type == 3) return addMonths(endDateOS, 1);
    if (type == 6) return addMonths(endDateOS, 4);
    if (type == 11) return addMonths(endDateOS, 4);
  } else {
    if (type == 3) return addMonths(endDateOS, 1);
    if (type == 6) return addMonths(endDateOS, 1);
    if (type == 11) return addMonths(endDateOS, 4);
  }

  return "";
};

const addMonths = (endDateOS: string, add: number) => {
  return dayjs(databaseDate(endDateOS)).add(add, "month").format("DD/MM/YYYY");
};
</script>

<template>
  <v-row dense>
    <v-col cols="2">
      <PartsCollectionManagementInputSearchServiceOrder
        v-if="methodRest == 'POST'"
        @search="update($event)"
      />

      <UiTextField
        v-else
        v-model="form.service_order_id"
        label="Ordem de serviço"
        disabled
      />
    </v-col>

    <v-col cols="2">
      <UiTextField v-model="form.os_supplier" label="Os parceiro" disabled />
    </v-col>

    <v-col cols="2">
      <UiTextField
        v-model="form.type_warranty"
        label="Tipo da garantia"
        disabled
      />
    </v-col>

    <v-col cols="2">
      <UiTextField
        v-model="form.warranty_supplier"
        label="Fornecedor da garantia"
        disabled
      />
    </v-col>

    <v-col cols="1">
      <UiTextField
        v-model="form.end_date_os"
        label="Data da finalização os"
        :disabled="methodRest == 'PUT'"
      />
    </v-col>

    <v-col cols="1">
      <UiTextField
        v-model="form.limit_date_storage"
        label="Data limite armazenagem"
        disabled
      />
    </v-col>

    <v-col cols="2">
      <UiTextField
        v-model="form.storage_location"
        v-maska="'##-##-##-##-##'"
        label="Local de armazenagem"
      />
    </v-col>
  </v-row>
</template>
