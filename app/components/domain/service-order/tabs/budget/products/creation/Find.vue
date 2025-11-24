<script lang="ts" setup>
defineEmits(["search"]);

const apparatusStore = useServiceOrderApparatusStore();
const { apparatusData } = storeToRefs(apparatusStore);

interface Form {
  name?: string;
  produto_chave?: string;
  model?: string;
  description?: string;
}

const form = reactive<Form>({
  name: undefined,
  produto_chave: undefined,
  model: undefined,
  description: undefined,
});

const { copy } = useClipboard();

const clear = () => {
  form.name = undefined;
  form.produto_chave = undefined;
  form.model = undefined;
  form.description = undefined;
};
</script>

<template>
  <v-row dense>
    <v-col cols="2">
      <UiTextField
        v-model="form.name"
        label="Código de fabricante"
        @keypress.enter="$emit('search', form)"
      />
    </v-col>

    <v-col cols="2">
      <UiTextField
        v-model="form.produto_chave"
        label="Código auxiliar"
        @keypress.enter="$emit('search', form)"
      />
    </v-col>

    <v-col cols="2">
      <UiTextField
        v-model="form.model"
        label="MODELO"
        :placeholder="apparatusData.model ?? ''"
        persistent-placeholder
        append-inner-icon="mdi-content-copy"
        @click:append-inner="copy(apparatusData.model ?? '')"
        @keypress.enter="$emit('search', form)"
      />
    </v-col>

    <v-col cols="2">
      <UiTextField
        v-model="form.description"
        label="Descrição"
        @keypress.enter="$emit('search', form)"
      />
    </v-col>

    <v-spacer />

    <v-col cols="2">
      <div class="d-flex">
        <v-btn
          color="primary"
          text="Limpar"
          variant="outlined"
          class="mr-2"
          @click="clear"
        />

        <v-btn
          color="primary"
          text="BUSCAR"
          variant="flat"
          @click="$emit('search', form)"
        />
      </div>
    </v-col>
  </v-row>
</template>
