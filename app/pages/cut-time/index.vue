<script setup lang="ts">
useHead({
  titleTemplate: `Horário de corte - %s`,
});

definePageMeta({
  path: "/horario-corte",
})
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">HORÁRIO DE CORTE</span>

    <UiFilter>
      <template #button-create>
        <CutTimeCreation />
      </template>
    </UiFilter>

    <UiTable multi-sort>
      <template #item.active="{ item }">
        <UiCheckIcon
          :id="item.id"
          :value="item.active"
          attr="active"
          @update-value="item.active = $event"
        />
      </template>

      <template #item.collection_time_to="{ item }">
        <UiEditDialogString
          :id="item.id"
          :text="item.collection_time_to"
          :vw="5"
          attr="collection_time_to"
          @update-text="item.collection_time_to = $event"
        />
      </template>

      <template #item.collection_time_from="{ item }">
        <UiEditDialogString
          :id="item.id"
          :text="item.collection_time_from"
          :vw="5"
          attr="collection_time_from"
          @update-text="item.collection_time_from = $event"
        />
      </template>

      <template #item.cutoff_time="{ item }">
        <UiEditDialogString
          :id="item.id"
          :text="item.cutoff_time"
          :vw="5"
          attr="cutoff_time"
          @update-text="item.cutoff_time = $event"
        />
      </template>

      <template #item.collection="{ item }">
        <UiEditDialogNumber
          :id="item.id"
          :value="item.collection"
          :vw="5"
          attr="collection"
          @update-text="item.collection = $event"
        />
      </template>

      <template #item.company="{ item }">
        <UiEditDialogString
          :id="item.id"
          :text="item.company"
          :vw="10"
          attr="company"
          @update-text="item.company = $event"
        />
      </template>
    </UiTable>
  </div>
</template>
