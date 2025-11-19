<script setup lang="ts">
const productStore = useProductStore();
const { product, productSell } = storeToRefs(productStore);
</script>

<template>
  <v-row dense>
    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <UiTextField
        v-model="product.type"
        label="Familia ou kit"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <UiTextField
        v-model="product.name"
        label="Código de fabricante"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <UiTextField
        v-model="product.produto_chave"
        label="Código auxiliar"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <UiTextField
        v-model="product.brand"
        label="Marca"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <UiTextField
        v-model="product.apparatus"
        label="Aparelho"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <UiTextField
        v-model="product.erp_category"
        label="Categoria"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
  </v-row>

  <v-row dense>
    <v-col cols="12" sm="12" md="12" lg="8" xl="8">
      <UiTextField v-model="product.description" label="Descrição" :hide-details="true" />
    </v-col>

    <v-col cols="12" sm="6" md="6" lg="2" xl="2">
      <UiTextField
        v-model="product.ean"
        label="Codigo ean"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="6" md="6" lg="2" xl="2">
      <UiTextField
        v-model="product.erp_color"
        label="Cor"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
  </v-row>

  <v-row dense>
    <v-col>
      <UiTextArea
        v-model="product.model"
        label="Modelos"
        rows="1"
        :auto-grow="true"
        :hide-details="true"
        @update:model-value="product.model = $event.toUpperCase()"
      />
    </v-col>
  </v-row>

  <v-row dense>
    <v-col cols="12" sm="6" md="3" lg="3">
      <div class="d-flex flex-row justify-center border-sm rounded-lg">
        <UiSwitch
          :model-value="productSell.syncecom"
          label="Sincronizado ecom"
          :readonly="true"
          :hide-details="true"
        />
      </div>
    </v-col>

    <v-col cols="12" sm="6" md="3" lg="3">
      <div class="d-flex flex-row justify-center border-sm rounded-lg">
        <UiSwitch
          v-model="product.active"
          label="Ativo"
          :readonly="true"
          :hide-details="true"
        />
      </div>
    </v-col>

    <v-col cols="12" sm="6" md="3" lg="3">
      <div class="d-flex flex-row justify-center border-sm rounded-lg">
        <UiSwitch v-model="product.image" label="Imagem" :hide-details="true" />
      </div>
    </v-col>

    <v-col cols="12" sm="6" md="3" lg="3">
      <div class="d-flex flex-row justify-center border-sm rounded-lg">
        <UiSwitch v-model="product.support" label="Suporte" :hide-details="true" />
      </div>
    </v-col>
  </v-row>
</template>
