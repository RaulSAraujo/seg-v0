<script lang="ts" setup>
import { reprintTagById } from "~/services/warranty.service";

import type {
  WarrantyRmaProduct,
  Tag,
} from "~/interfaces/Warranty";

defineOptions({
  name: "WarrantyProducts",
});

const props = defineProps<{
  warrantyRmaProducts: WarrantyRmaProduct[];
  valorTotal: string;
  disabled?: boolean;
}>();

const loading = useLoadingIndicator();

const warrantyRmaProductsComp = computed(() => props.warrantyRmaProducts || []);

const warrantyRmaProductsSelectedComp = computed(() =>
  warrantyRmaProductsComp.value.filter((e) => e.selected)
);

const reprintTag = async (tag: Tag) => {
  try {
    if (!tag.active) return;

    loading.start();

    await reprintTagById(tag.id);

    $toast().success("Etiqueta gerada com sucesso.");
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
};
</script>

<template>
  <div class="my-2 d-flex justify-space-between">
    <span class="text-h6">PRODUTOS</span>

    <div class="d-flex">
      <span class="mr-2">TOTAL: </span>

      <UiToLocaleString :value="valorTotal" />
    </div>
  </div>

  <div class="d-flex justify-center mt-3">
    <div style="max-width: 90%">
      <v-btn
        v-for="(item, i) in warrantyRmaProductsComp"
        :key="i"
        rounded
        class="ma-1"
        variant="outlined"
        density="comfortable"
        :disabled="disabled"
        :color="item.selected ? 'blue' : ''"
        @click="item.selected = !item.selected"
      >
        <v-expand-x-transition>
          <v-icon v-if="item.selected">mdi-check</v-icon>
        </v-expand-x-transition>

        <span class="mx-2">
          {{
            item.codfabricante != null ? item.codfabricante : item.produto_chave
          }}
        </span>
      </v-btn>
    </div>
  </div>

  <v-list bg-color="transparent">
    <v-list-item
      v-for="item in warrantyRmaProductsSelectedComp"
      :key="item.id"
      :prepend-avatar="item.image"
    >
      <template #default>
        <v-row dense class="mt-1">
          <v-col cols="2">
            <UiTextField
              v-model="item.codfabricante"
              label="Código fabricante"
              :alt="`${item.id}_cod_fabricante`"
              disabled
            />
          </v-col>

          <v-col cols="4">
            <UiTextField
              v-model="item.descricao_produto"
              label="Descrição produto"
              :alt="`${item.id}_descricao_produto`"
              disabled
            />
          </v-col>

          <v-col cols="2">
            <UiNumberInput
              v-model="item.quantidade"
              label="Quantidade vendida"
              :alt="`${item.id}_quantidade`"
              :disabled="true"
            />
          </v-col>

          <v-col cols="2">
            <UiNumberInput
              v-model="item.quantidade_devolvida"
              label="Quantidade devolvida"
              :alt="`${item.id}_quantidade_devolvida`"
              :min="0"
              :max="parseInt(`${item.quantidade}`)"
              :disabled="disabled"
            />
          </v-col>

          <v-col cols="2">
            <UiCurrencyField
              v-model="item.valor_unitario"
              label="Valor unitário"
              :alt="`${item.id}_valor_unitario`"
              disabled
            />
          </v-col>
        </v-row>

        <div>
          <span class="text-button mr-2">TAGS:</span>

          <v-btn-toggle density="compact">
            <v-btn
              v-for="(tag, i) in item.tags"
              :key="i"
              size="small"
              variant="plain"
              :disabled="!tag.active"
              :base-color="tag.active ? 'blue' : ''"
              @click="disabled ? reprintTag(tag) : (tag.active = !tag.active)"
            >
              <v-expand-x-transition>
                <v-icon v-if="tag.active" x-small class="mr-1">
                  mdi-check
                </v-icon>
              </v-expand-x-transition>

              <span>
                {{ tag?.id }}
              </span>
            </v-btn>
          </v-btn-toggle>
        </div>
      </template>
    </v-list-item>
  </v-list>

  <v-sheet
    v-if="warrantyRmaProductsComp.length == 0"
    width="100%"
    height="100"
    color="transparent"
    class="d-flex justify-center align-center"
  >
    <h3>NENHUMA PRODUTO ENCONTRADO</h3>
  </v-sheet>
</template>
