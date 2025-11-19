<script lang="ts" setup>
defineOptions({
  name: "ClientForm",
});

defineProps<{
  title: string;
}>();

defineEmits(["submit"]);

const { value: flagClient } = useField("flag_client");
</script>

<template>
  <v-form @submit.prevent="$emit('submit')">
    <v-toolbar :title="title" rounded="t-xl" class="pr-3">
      <ClientUiFlags v-model="flagClient" />
    </v-toolbar>

    <v-row class="ma-5" dense justify="space-between">
      <v-col cols="9">
        <ClientFormInputName />
      </v-col>

      <v-col cols="3">
        <ClientFormInputGender />
      </v-col>

      <v-col cols="2">
        <ClientFormInputType />
      </v-col>

      <v-col cols="4">
        <ClientFormInputCpfCnpj />
      </v-col>

      <v-col cols="4">
        <ClientFormInputIdentityNumber />
      </v-col>

      <v-col cols="2">
        <ClientFormInputBornDate />
      </v-col>

      <v-col cols="3">
        <ClientFormInputEmail />
      </v-col>

      <v-col cols="3">
        <ClientFormInputNumber1 />
      </v-col>

      <v-col cols="3">
        <ClientFormInputNumber2 />
      </v-col>

      <v-col cols="3">
        <ClientFormInputNumber3 />
      </v-col>

      <v-col cols="12">
        <ClientFormInputObservation />
      </v-col>
    </v-row>

    <v-toolbar title="DADOS DO ENDEREÇO" />

    <v-row class="ma-5" dense>
      <v-col cols="3">
        <ClientFormInputViaCep />
      </v-col>

      <v-col cols="3">
        <ClientFormInputCity />
      </v-col>

      <v-col cols="2">
        <ClientFormInputState />
      </v-col>

      <v-col cols="4">
        <ClientFormInputNeighborhood />
      </v-col>

      <v-col cols="9">
        <ClientFormInputStreet />
      </v-col>

      <v-col cols="3">
        <ClientFormInputNumber />
      </v-col>

      <v-col cols="12">
        <ClientFormInputComplement />
      </v-col>
    </v-row>

    <slot name="expansion" />

    <v-btn
      class="button mr-4 mb-4"
      icon="mdi-content-save"
      color="primary"
      type="submit"
      position="fixed"
      location="bottom end"
    />
  </v-form>
</template>

<style scoped>
.button {
  opacity: 0.2;
  z-index: 99;
}

.button:hover {
  opacity: 0.8;
}
</style>
