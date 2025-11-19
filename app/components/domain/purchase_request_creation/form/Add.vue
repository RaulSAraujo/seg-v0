<script lang="ts" setup>
import type { Row } from "~/interfaces/Product";
import type { Form } from "~/interfaces/PurchaseRequest";

defineOptions({
  name: "PurchaseRequestCreationFormAdd",
});

const props = defineProps<{
  form: Form;
  product?: Row;
}>();

const formComputed = computed(() => props.form);

const emit = defineEmits(["submit"]);

const add = () => {
  if (formComputed.value.reservation == "") {
    formComputed.value.reservation = "ESTOQUE";
  }

  emit("submit", {
    ...formComputed.value,
    name: props.product?.name ?? "",
    description: props.product?.description ?? "",
  });
};
</script>

<template>
  <v-btn text="ADICIONAR" variant="flat" color="primary" @click="add" />
</template>
