<script setup lang="ts">
import type {} from "~/interfaces/ServiceOrder";

useHead({
  titleTemplate: `Gestão de coletas - %s`,
});

definePageMeta({
  path: "/gestao-coletas",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary"> GESTÃO DE COLETAS </span>

    <UiFilter>
      <template #button-create>
        <v-btn
          class="mr-2"
          text="CRIAR"
          rounded="lg"
          color="primary"
          :to="{
            name: 'parts-collection-management-creation',
          }"
        />
      </template>
    </UiFilter>

    <UiTable>
      <template #item.action="{ item }">
        <div class="d-flex flex-row">
          <v-btn
            icon="mdi-pencil"
            variant="plain"
            size="small"
            density="comfortable"
            color="blue"
            :to="{
              name: 'parts-collection-management-id',
              params: {
                id: item.id,
              },
            }"
          />

          <UiDelete :id="item.id" />
        </div>
      </template>
    </UiTable>
  </div>
</template>
