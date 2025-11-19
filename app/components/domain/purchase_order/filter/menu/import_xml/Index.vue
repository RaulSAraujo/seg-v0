<script setup lang="ts">
import { purchaseControlPersistXmlFile } from "~/services/purchase-order.service";

const purchaseOrderStore = usePurchaseOrderStore();
const { activeEventSourceXml } = storeToRefs(purchaseOrderStore);

const dialog = ref(false);
const loading = ref(false);
const file = ref<File | null>(null);
const filePath = useState<string>("file-path-purchase-control", () => "");

const importXml = async () => {
  try {
    loading.value = true;

    if (!file.value) {
      $toast().error("Por favor, selecione um arquivo XML.");
      return;
    }

    const res = await purchaseControlPersistXmlFile(file.value);

    filePath.value = res.filePath;

    loading.value = false;

    dialog.value = false;

    activeEventSourceXml.value = true;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.value = false;
  }
};

const close = () => {
  file.value = null;
};
</script>

<template>
  <v-dialog v-model="dialog" width="25vw" @after-leave="close">
    <template #activator="{ props: activatorProps }">
      <v-tooltip location="top" text="IMPORTAÇÃO XML" content-class="bg-purple">
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="Object.assign({}, tooltip, activatorProps)"
            icon="mdi-file-import"
            class="text-purple"
          />
        </template>
      </v-tooltip>
    </template>

    <template #default>
      <v-card title="IMPORTAÇÃO XML" rounded="xl">
        <v-card-text>
          <v-file-input
            v-model="file"
            color="primary"
            label="Adicione o xml"
            accept=".xml"
            placeholder="Selecione seu arquivo"
            prepend-inner-icon="mdi-paperclip"
            prepend-icon=""
            chips
          />

          <div class="d-flex justify-space-around">
            <v-btn
              text="IMPORTAR"
              base-color="primary"
              :disabled="file == undefined"
              :loading="loading"
              @click="importXml"
            />
          </div>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
