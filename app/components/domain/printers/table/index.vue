<script lang="ts" setup>
defineOptions({
  name: "PrintersTable",
});

defineProps<{
  listPrinters: string[];
}>();
</script>

<template>
  <UiTable multi-sort>
    <template #item.action="{ item }">
      <UiDelete :id="item.id" />
    </template>

    <template #item.printer="{ item }">
      <UiEditDialogObject
        :id="item.id"
        attr="printer"
        :items="listPrinters"
        :value="item.printer"
        @update-text="item.printer = $event"
      >
        <template #default="props">
          <span v-bind="props">{{ item.printer }}</span>
        </template>
      </UiEditDialogObject>
    </template>
  </UiTable>
</template>
