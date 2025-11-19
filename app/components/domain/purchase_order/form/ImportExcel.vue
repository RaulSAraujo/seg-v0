<script lang="ts" setup>
const emit = defineEmits(["add"]);

const dialog = ref(false);

const file = ref();

const loading = ref(false);

const { $customFetch, $config } = useNuxtApp();

interface ExcelProps {
  codigo_fabricante: string;
  custo_compra: string;
  custo_fornecedor: string;
  finalidade: string;
  quantidade_compra: string;
  quantidade_final: string;
}

const importExcel = async () => {
  try {
    loading.value = true;

    const formData = new FormData();
    formData.append("file", file.value);

    const res = await $customFetch<ExcelProps[]>("spread-sheet/extract-data-file", {
      method: "POST",
      body: formData,
    });

    res.forEach((e) => {
      const newObject = {
        name: e.codigo_fabricante,
        description: null,
        erp_product_id: null,
        produto_chave: null,
        quantity_purchased: parseInt(e.quantidade_compra || "0"),
        quantity_reserved: parseInt(e.quantidade_final || "0"),
        supplier_cost: parseFloat(e.custo_fornecedor || "0.0"),
        purchase_cost: parseFloat(e.custo_compra || "0.0"),
        reservation: e.finalidade,
      };

      emit("add", newObject);
    });

    dialog.value = false;

    loading.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);

    loading.value = false;
  }
};

const clear = () => {
  file.value = undefined;
};

const exampleWorksheet = async () => {
  try {
    const formData = new FormData();
    formData.append("file", file.value);

    const res = await $customFetch<{ filePath: string }>(
      "purchase-control/purchase-control-product/spreadsheet-example"
    );

    const link = document.createElement("a");
    link.href = `${$config.public.base_url_local}${res.filePath}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};
</script>

<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-top-transition"
    width="20VW"
    @after-leave="clear"
  >
    <template #activator="{ props: activator }">
      <v-btn
        v-bind="activator"
        text="Importação excel"
        append-icon="mdi-table-arrow-left"
        variant="plain"
        color="green"
      />
    </template>

    <template #default>
      <v-card title="IMPORTAÇÃO EXCEL" rounded="xl">
        <template #append>
          <v-tooltip location="top" text="Planilha de exemplo" content-class="bg-green">
            <template #activator="{ props: tooltip }">
              <v-btn
                v-bind="tooltip"
                icon="mdi-file-excel"
                variant="plain"
                density="compact"
                class="text-green"
                @click="exampleWorksheet"
              />
            </template>
          </v-tooltip>
        </template>

        <v-card-text>
          <v-file-input
            v-model="file"
            color="primary"
            label="Adicione sua planilha"
            accept=".xlsx"
            placeholder="Selecione seu arquivo"
            prepend-inner-icon="mdi-paperclip"
            prepend-icon=""
          />

          <div class="d-flex justify-space-around">
            <v-btn
              text="IMPORTAR"
              base-color="primary"
              :disabled="file == undefined"
              :loading="loading"
              @click="importExcel"
            />
          </div>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
