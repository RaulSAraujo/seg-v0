<script setup lang="ts">
useHead({
  titleTemplate: `Sugestão local de armazenagem - %s`,
});

definePageMeta({
  path: "/sugestao-local-armazenagem",
})
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">
      SUGESTÃO DE LOCAL DE ARMAZENAGEM
    </span>

    <UiFilter>
      <template #button-create>
        <SuggestedStorageLocationCreation />
      </template>
    </UiFilter>

    <UiTable>
      <template #item.action="{ item }">
        <UiDelete :id="item.id" />
      </template>

      <template #item.preferential="{ item }">
        <UiCheckIcon
          :id="item.id"
          attr="preferential"
          :value="item.preferential"
          :enable-alert="true"
          @update-value="item.preferential = $event"
        />
      </template>

      <template #item.storage_location="{ item }">
        <UiEditDialogString
          :id="item.id"
          :text="item.storage_location"
          :vw="7"
          attr="storage_location"
          @update-text="item.storage_location = $event"
        />
      </template>
    </UiTable>
  </div>
</template>
