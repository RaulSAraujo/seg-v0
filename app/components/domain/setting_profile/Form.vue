<script lang="ts" setup>
defineProps<{
  title: string;
}>();

defineEmits(["save"]);

const form = reactive({
  name: "",
  description: "",
});

defineExpose({ form });
</script>

<template>
  <v-card rounded="xl" :title="title">
    <template #text>
      <v-row dense>
        <v-col cols="12">
          <UiTextField v-model="form.name" label="Nome" />
        </v-col>

        <v-col cols="12">
          <UiTextField v-model="form.description" label="Descrição" />
        </v-col>
      </v-row>
    </template>

    <template #actions>
      <v-spacer />

      <v-btn
        class="mb-2"
        color="primary"
        width="8vw"
        variant="flat"
        text="SALVAR"
        @click="$emit('save', form)"
      />
      <v-spacer />
    </template>
  </v-card>
</template>
