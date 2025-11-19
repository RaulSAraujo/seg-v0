<script setup lang="ts">
import BtnPath from "./BtnPath.vue";
import BtnExample from "./BtnExample.vue";
import BtnExtractCode from "./BtnExtractCode.vue";

defineOptions({
  name: "QuotationExportFamily",
});

const filePath = ref("");
const code = ref("ProdutoChave");
const file = ref<File>({} as File);
const codeName = ref([
  { text: "Produto chave", value: "ProdutoChave" },
  { text: "Código erp", value: "ERPCode" },
  { text: "Código fabricante", value: "FabCode" },
]);

const close = () => {
  filePath.value = "";
  file.value = {} as File;
  code.value = "ProdutoChave";
};
</script>

<template>
  <v-dialog width="30vw" @after-leave="close">
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        text="1º EXTRAIR CÓD.FAB FAMILIA"
        color="primary"
        class="mr-2"
      />
    </template>

    <template #default>
      <v-card title="1º EXTRAIR CÓD.FAB FAMILIA" rounded="xl">
        <template #subtitle>
          <BtnExample />
        </template>

        <template #text>
          <v-file-input
            v-model="file"
            color="primary"
            label="Arquivo com códigos na 1º coluna"
            accept=".csv,.xlsx,.xls,.xlsb"
            placeholder="Selecione seu arquivo"
            prepend-inner-icon="mdi-paperclip"
            prepend-icon=""
          />

          <v-select
            v-model="code"
            label="Selecione o tipo de código"
            color="primary"
            :items="codeName"
            item-title="text"
            item-value="value"
          />
        </template>

        <template #actions>
          <div class="d-flex justify-space-around">
            <BtnExtractCode
              :file="file"
              :code="code"
              @file-path="filePath = $event"
            />

            <BtnPath :file-path="filePath" />
          </div>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
