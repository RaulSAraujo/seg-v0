<script lang="ts" setup>
import type { Row } from "~/interfaces/ClassificationApparatus";

defineOptions({
  name: "ApparatusTable",
});

defineProps<{
  classification: Row[];
}>();
</script>

<template>
  <UiTable show-select multi-sort>
    <template #item.action="{ item }">
      <UiDelete :id="item.id" />
    </template>

    <template #item.apparatus_name="{ item }">
      <UiEditDialogString
        :id="item.id"
        :text="item.apparatus_name ?? ''"
        attr="apparatus_name"
        :vw="10"
        @update-text="item.apparatus_name = $event"
      />
    </template>

    <template #item.classification_apparatus_id="{ item }">
      <UiEditDialogObject
        :id="item.id"
        attr="classification_apparatus_id"
        :value="item.classification_apparatus_id"
        :items="classification"
        item-title="name"
        item-value="id"
        @update-text="item.classification_apparatus_id = $event"
      >
        <template #default="props">
          <span v-if="!!item.ClassificationApparatu" v-bind="props">
            {{ item.ClassificationApparatu!.name?.toUpperCase() }}
          </span>

          <div v-else v-bind="props">
            <v-label />
          </div>
        </template>
      </UiEditDialogObject>
    </template>
  </UiTable>
</template>
