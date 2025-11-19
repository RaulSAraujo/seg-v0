<script lang="ts" setup>
defineEmits(["search"]);

interface Form {
  cpf_cnpj: string | undefined;
  name: string | undefined;
  identity_number: string | undefined;
}

const form = reactive<Form>({
  cpf_cnpj: undefined,
  name: undefined,
  identity_number: undefined,
});

const clear = () => {
  form.cpf_cnpj = undefined;
  form.name = undefined;
  form.identity_number = undefined;
};

defineExpose({ clear });
</script>

<template>
  <v-row>
    <v-col>
      <UiTextField
        v-model="form.name"
        label="Nome do cliente"
        @keypress.enter="$emit('search', form)"
      />
    </v-col>
    <v-col>
      <UiTextField
        v-model="form.cpf_cnpj"
        label="CPF/CNPJ"
        @keypress.enter="$emit('search', form)"
      />
    </v-col>
    <v-col>
      <UiTextField
        v-model="form.identity_number"
        label="RG/IE"
        @keypress.enter="$emit('search', form)"
      />
    </v-col>

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
