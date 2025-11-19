<script lang="ts" setup>
defineOptions({
  name: 'SupplierTable',
});
</script>

<template>
  <UiTable show-select multi-sort>
    <template #item.action="{ item }">
      <UiDelete :id="item.id" />
    </template>

    <template #item.active="{ item }">
      <UiCheckIcon
        :id="item.id"
        :value="item.active ?? false"
        attr="active"
        :enable-alert="true"
        @update-value="item.active = $event"
      />
    </template>

    <template #item.name="{ item }">
      <UiEditDialogString
        :id="item.id"
        :text="item.name ?? ''"
        attr="name"
        :vw="8"
        @update-text="item.name = $event"
      />
    </template>

    <template #item.virtual_quantity="{ item }">
      <UiEditDialogNumber
        :id="item.id"
        :value="item.virtual_quantity ?? 0"
        attr="virtual_quantity"
        @update-text="item.virtual_quantity = $event"
      />
    </template>

    <template #item.lead_time="{ item }">
      <UiEditDialogNumber
        :id="item.id"
        :value="item.lead_time ?? 0"
        attr="lead_time"
        @update-text="item.lead_time = $event"
      />
    </template>
  </UiTable>
</template>
