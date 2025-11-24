<script setup lang="ts">
const checkOutStore = useCheckOutStore();
const { ecomOrderId } = storeToRefs(checkOutStore);

const { data: user } = useAuth();

const input = ref();

const counted = ref();

const { $config, $customFetch } = useNuxtApp();

const count = async () => {
  if (!counted.value.includes("}")) {
    $toast().error("Erro, QR code invalido.");

    counted.value = "";

    return;
  }

  interface Tag {
    id_tag: number;
    erp_product_id: number;
    produto_chave: number;
    name: string;
  }

  const tag = JSON.parse(counted.value) as Tag;

  counted.value = "";

  $customFetch(`checkout/in-progress-product-count`, {
    baseURL: $config.public.base_url_web_socket,
    method: "POST",
    query: {
      user_id: user.value?.id,
    },
    body: {
      id_tag: tag.id_tag,
      name: tag.name,
      produto_chave: tag.produto_chave,
      erp_product_id: ecomOrderId.value,
    },
  });

  input.value.focus();
};

// Focar no input de código de fabricante
setTimeout(() => {
  input.value.focus();
}, 200);
</script>

<template>
  <div class="mt-1" style="width: 30vw; margin: auto">
    <v-text-field
      ref="input"
      v-model="counted"
      variant="solo"
      placeholder="INSIRA O CÓDIGO DE FABRICANTE"
      color="primary"
      rounded="lg"
      hide-details
      append-inner-icon="mdi-send"
      @click:append-inner="count"
      @keypress.enter="count"
    />
  </div>
</template>
