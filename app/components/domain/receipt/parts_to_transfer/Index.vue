<script setup lang="ts">
interface Form {
  origin_almox: string | undefined;
  target_almox: string | undefined;
  request_reason: string | undefined;
}

interface Tag {
  id_tag: number;
  erp_product_id: number;
  produto_chave: number;
  name: string;
}

const form = reactive<Form>({
  origin_almox: undefined,
  target_almox: undefined,
  request_reason: undefined,
});

const dialog = ref(false);

const bip = ref("");

const items = ref<{ name: string; id_tag: number }[]>([]);

const errorAudio = "/audio/audioError.mp3";

const add = () => {
  if (bip.value && bip.value.includes("}")) {
    const tag = JSON.parse(bip.value) as Tag;

    const index = items.value.findIndex((e) => e.id_tag == tag.id_tag);

    if (index == -1) {
      items.value.push(tag);

      bip.value = "";
    } else {
      $toast().error("Tag informada ja utilizada.");
    }
  } else {
    const audio = new Audio(errorAudio);

    audio.play();

    $toast().error("Informações invalidas.");

    bip.value = "";
  }
};

const { $customFetch } = useNuxtApp();

const { capitalizeFirstLetter } = useCapitalize();

const loading = ref(false);

const create = async () => {
  try {
    loading.value = true;

    const validated = Object.values(form).every((e) => e == undefined);

    if (validated || items.value.length == 0) {
      loading.value = false;

      return;
    }

    const res = await $customFetch<{ message: string }>(
      "receivement/purchase-control-product/transfer-warehouse",
      {
        method: "POST",
        body: {
          tag_ids: items.value.map((e) => e.id_tag),
          ...form,
        },
      }
    );

    $toast().success(res.message);

    loading.value = false;

    dialog.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${capitalizeFirstLetter(err.data?.error ?? err.statusText)}`);

    loading.value = false;
  }
};

const close = () => {
  form.origin_almox = undefined;
  form.target_almox = undefined;
  form.request_reason = undefined;
  bip.value = "";
  items.value = [];

  loading.value = false;
};
</script>

<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-top-transition"
    width="400px"
    @after-leave="close"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        prepend-icon="mdi-transfer"
        text="PEÇAS A TRANSFERIR"
        stacked
        class="text-teal"
      />
    </template>

    <template #default>
      <v-card rounded="xl" elevation="0">
        <template #title>
          <span class="text-primary">PEÇAS A TRANSFERIR</span>
        </template>

        <template #text>
          <v-card elevation="0">
            <v-row dense class="my-2">
              <v-col cols="12">
                <TransferWarehouseOrigin v-model="form.origin_almox" />
              </v-col>

              <v-col cols="12">
                <TransferWarehouseDestination v-model="form.target_almox" />
              </v-col>

              <v-col cols="12">
                <TransferRequestReasons v-model="form.request_reason" />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="bip"
                  label="Bipar"
                  density="compact"
                  color="primary"
                  variant="outlined"
                  hide-details
                  @keyup.enter="add"
                />
              </v-col>
            </v-row>

            <ReceiptPartsToTransferTable :items="items" />
          </v-card>
        </template>

        <template #actions>
          <v-spacer />

          <v-btn
            color="primary"
            text="SALVAR"
            width="8vw"
            variant="flat"
            :loading="loading"
            @click="create()"
          />

          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
