<script setup lang="ts">
import {
  createPurchaseControl,
  creationPurchaseControlProduct,
  updatePurchaseControl,
  updatePurchaseControlProduct,
} from "~/services/purchase-order.service";

import type { FetchError } from "ofetch";
import type { Form } from "~/interfaces/PurchaseControl";
import type { Row } from "~/interfaces/PurchaseControlProduct";

const props = defineProps<{
  form: Form;
  products: Row[];
  methodRest: "POST" | "PUT";
}>();

const emit = defineEmits(["loading", "set-value-loading", "errors"]);

const { back } = useRouter();
const { params } = useRoute();
const { data: user } = useAuth();

const submit = async () => {
  if (!props.form.supplier) {
    return $toast().error("Informe os dados do fornecedor.");
  }

  if (props.form.erp_order.length < 4) {
    return $toast().error("Pedido ERP inválido.");
  }

  if (props.products.length == 0) {
    return $toast().error("Insira produtos ao pedido.");
  }

  emit("loading", true);

  if (props.methodRest == "POST") {
    await creation();
  }

  if (props.methodRest == "PUT") {
    await update();
  }

  emit("loading", false);
};

const creation = async () => {
  try {
    const res = await createPurchaseControl({
      ...props.form,
      user: user.value?.username || "",
    });

    if (!res.id) return;

    const errors = await creationOrUpdateProducts(res.id);

    if (errors.length > 0) {
      $toast().success("Pedido criado parcialmente.");
    } else {
      $toast().success("Sucesso criar pedido.");
    }

    if (errors.length == 0) {
      back();
    }
  } catch (error) {
    const err = error as FetchError;

    $toast().error(`${err.data.data.message ?? err.statusText}`);
  }
};

const update = async () => {
  const res = await updatePurchaseControl(props.form);

  await creationOrUpdateProducts(res.id);

  $toast().success("Sucesso ao editar o pedido.");
};

const creationOrUpdateProducts = async (id: number) => {
  const errors = [];

  for (let index = 0; index < props.products.length; index++) {
    emit("set-value-loading", ((index + 1) * 100) / props.products.length);

    const product = { ...props.products[index] } as Row;

    try {
      if (!product.id) {
        product.order_id = id || parseInt(`${params.id}`);
        product.block = false;
        product.child = null;
        product.invoice_cost = "0.00";
        product.partial = false;
        product.observation_purchase = props.form.observation;

        await creationPurchaseControlProduct({ create_erp: true, ...product });
      } else {
        await updatePurchaseControlProduct(product);
      }
    } catch (error) {
      const err = error as FetchError;

      $toast().error(`${err.data.data.message ?? err.statusText}`);

      errors.push(product);
    }
  }

  return errors;
};
</script>

<template>
  <v-fab
    icon="mdi-content-save"
    color="primary"
    class="button"
    style="position: fixed; bottom: 30px; right: 15px"
    @click="submit"
  />
</template>

<style scoped>
.button {
  opacity: 0.2;
}

.button:hover {
  opacity: 0.8;
}
</style>
