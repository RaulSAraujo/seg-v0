<script lang="ts" setup>
defineOptions({
  name: "ProductTemplateTable",
});
</script>

<template>
  <UiTable multi-sort :show-expand="true">
    <template #item.action="{ item }">
      <UiDelete :id="item.id" />
    </template>

    <template #item.apparatus="{ item }">
      {{ item.Apparatu?.apparatus_name }}
    </template>

    <template #item.category="{ item }">
      {{ item.CategoryEcom?.category_name }}
    </template>

    <template #expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length" class="pa-0">
          <UiTiptap
            :editable="false"
            :remove-buttons="true"
            :content="item.TemplateEcom.description"
          />
        </td>
      </tr>
    </template>
  </UiTable>
</template>
