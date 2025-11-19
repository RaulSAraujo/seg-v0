<script lang="ts" setup>
import type { Row } from "~/interfaces/Client";
defineProps<{
  items: Row[];
  loading: boolean;
}>();

defineEmits(["add"]);

interface Headers {
  title: string;
  key: string;
  width?: number;
  align?: "start" | "center" | "end";
}

const headers = ref<Headers[]>([
  { title: "Ações", key: "actions" },
  { title: "Nome", key: "name" },
  { title: "Gênero", key: "gender" },
  { title: "Rg", key: "identity_number" },
  { title: "Cpf/Cnpj", key: "cpf_cnpj" },
  { title: "Telefone 1", key: "number1" },
  { title: "Telefone 2", key: "number2" },
  { title: "Telefone 3", key: "number3" },
]);

const currentTime = ref(0);
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    items-per-page="-1"
    hide-default-footer
    disable-sort
  >
    <template #item.actions="{ item }">
      <v-snackbar
        rounded="lg"
        variant="flat"
        timeout="6000"
        :timer="`${currentTime}`"
        color="primary"
        location="top"
        content-class="border-thin"
      >
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-plus"
            variant="plain"
            size="small"
            color="primary"
            density="comfortable"
          />
        </template>

        <div class="text-subtitle-1">Deseja alterar o cliente ?</div>

        <template #actions="{ isActive }">
          <v-btn color="white" variant="plain" @click="isActive.value = false">
            Não
          </v-btn>

          <v-btn
            color="white"
            variant="plain"
            @click="
              $emit('add', item);

              isActive.value = false;
            "
          >
            Sim
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </v-data-table>
</template>
