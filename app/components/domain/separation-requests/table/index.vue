<script lang="ts" setup>
import Validated from "./template/Validated.vue";
import TableProduct from "../table_product/index.vue";

defineOptions({
  name: "SeparationRequestsTable",
});
</script>

<template>
  <UiTable :show-expand="true" multi-sort>
    <template #item.validated="{ item }">
      <Validated
        :id="item.id"
        :validated="item.validated"
        @update-validated="item.validated = $event"
        @update-validated-at="item.validate_at = $event"
      />
    </template>

    <template #expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length" class="pa-0">
          <TableProduct :items="item.SalesOrdersProductsSeparations" />
        </td>
      </tr>
    </template>
  </UiTable>
</template>
