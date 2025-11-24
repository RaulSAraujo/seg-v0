<script setup lang="ts">
import { updateProduct } from "~/services/product.service";

defineOptions({
  name: "ProductFamilyChangeSave",
});

const props = defineProps<{
  produtoChave?: number;
  disabled: boolean;
}>();

const emit = defineEmits(["close"]);

const router = useRouter();
const { params } = useRoute();

const productStore = useProductStore();
const { familyList } = storeToRefs(productStore);

const currentTime = ref(0);
const snackbar = ref<boolean>(false);
const loading = ref<boolean>(false);

const changeFamily = async () => {
  loading.value = true;

  const res = await updateProduct({
    id: parseInt(params.id as string),
    produto_chave: props.produtoChave as number,
  });

  loading.value = false;

  if (res) {
    $toast().success("Familia atualizada com sucesso.");

    // Fecha o modal
    emit("close");

    // Redireciona para a tela de produto
    setTimeout(() => {
      router.push({ name: "product" });
    }, 1000);
  }
};
</script>

<template>
  <v-btn
    width="50%"
    text="SALVAR"
    variant="flat"
    :loading="loading"
    :disabled="disabled"
    :color="disabled ? 'black' : 'primary'"
    @click="familyList.length === 1 ? (snackbar = true) : changeFamily()"
  />

  <v-snackbar
    v-model="snackbar"
    rounded="lg"
    timeout="6000"
    :timer="`${currentTime}`"
    variant="flat"
    color="red"
    location="top"
    content-class="border-thin"
  >
    <div class="text-subtitle-1">
      A familia atual {{ params.type_id }} ficará sem produtos, deseja continuar
      ?
    </div>

    <p class="text-caption text-grey-lighten-2">
      Esta família será deletada e essa ação não poderá ser revertida.
    </p>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false">
        Não
      </v-btn>

      <v-btn color="white" variant="plain" @click="changeFamily()"> Sim </v-btn>
    </template>
  </v-snackbar>
</template>
