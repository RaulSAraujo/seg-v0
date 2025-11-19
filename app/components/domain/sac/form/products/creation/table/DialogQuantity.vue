<script lang="ts" setup>
const emit = defineEmits(["add", "close"]);

const quantity = ref(1);

function submit() {
  emit("add", quantity.value);

  emit("close");
}
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="300">
    <v-card title="INFORME A QUANTIDADE" rounded="xl">
      <template #text>
        <UiNumberInput v-model="quantity" />
      </template>

      <template #actions>
        <v-spacer />

        <v-btn
          class="mb-2"
          color="primary"
          width="8vw"
          variant="flat"
          text="SALVAR"
          @click="submit"
        />

        <v-spacer />
      </template>
    </v-card>
  </v-dialog>
</template>
