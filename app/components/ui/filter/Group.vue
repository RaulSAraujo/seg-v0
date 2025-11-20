<script setup lang="ts">
import type { Filter } from "~/interfaces/Filter";

const props = defineProps<{
  filters?: Filter | null;
}>();

const filterStore = useFilterStore();
const { availableFilter, changeValuesFilter } = storeToRefs(filterStore);

const { findModelName } = useModelStore();
const model = findModelName() ?? "";

if (props.filters) {
  if (props.filters.resultCount > 0) {
    filterStore.set(props.filters);
  } else {
    await filterStore.create(model);
  }
}

const { searchData } = useTableStore();

const dayjs = useDayjs();

const saveDate = (event: string, multiple: boolean | string) => {
  if (!multiple) return dayjs(event).format("DD/MM/YYYY");

  return `${dayjs(event[0]).format("DD/MM/YYYY")} - ${dayjs(
    event[event.length - 1]
  ).format("DD/MM/YYYY")}`;
};
</script>

<template>
  <div class="filter-group-wrapper">
    <v-row dense class="pa-5">
      <v-col
        v-for="(item, index) of availableFilter"
        :key="item.attribute"
        :cols="12"
        :md="(item.layout_filters?.size ?? 2) + 4"
        :lg="(item.layout_filters?.size ?? 2) + 1"
        :style="{ '--filter-index': index }"
        class="filter-item"
      >
      <LazyUiTextField
        v-if="item.type == 'STRING'"
        v-model="item.value"
        hydrate-on-visible
        :label="item.label"
        :alt="`search-${item.label.toLocaleLowerCase()}`"
        aria-id="textfield"
        :clearable="item.layout_filters?.clearable"
        :placeholder="
          item.layout_filters?.approximate
            ? 'Digite o valor aproximado'
            : 'Digite o valor exato'
        "
        :hide-details="true"
        @update:model-value="changeValuesFilter = true"
        @enter="searchData"
      />

      <LazyUiTextField
        v-if="item.type == 'FLOAT' || item.type == 'INTEGER'"
        v-model="item.value"
        v-maska="'+'"
        hydrate-on-visible
        :label="item.label"
        :alt="`search-${item.label.toLocaleLowerCase()}`"
        aria-id="textfield"
        :clearable="item.layout_filters?.clearable"
        :placeholder="
          item.layout_filters?.approximate
            ? 'Digite o valor aproximado'
            : 'Digite o valor exato'
        "
        :hide-details="true"
        @update:model-value="changeValuesFilter = true"
        @enter="searchData"
      />

      <LazyUiSelect
        v-if="item.type == 'ARRAY' && !item.layout_filters?.comboBox"
        v-model="item.value"
        hydrate-on-visible
        :label="item.label"
        :alt="`search-${item.label.toLocaleLowerCase()}`"
        :items="item.association_data?.rows ?? []"
        :item-title="item.item_name ?? ''"
        :item-value="item.item_value ?? ''"
        :clearable="item.layout_filters?.clearable"
        :multiple="item.layout_filters?.multiple"
        @change="changeValuesFilter = true"
        @like="item.value = $event"
      />

      <LazyUiCombobox
        v-if="item.type == 'ARRAY' && item.layout_filters?.comboBox"
        v-model="item.value"
        hydrate-on-visible
        :label="item.label"
        :alt="`search-${item.label.toLocaleLowerCase()}`"
        :items="item.association_data?.rows ?? []"
        :item-title="item.item_name ?? ''"
        :item-value="item.item_value ?? ''"
        :clearable="item.layout_filters?.clearable"
        :multiple="item.layout_filters?.multiple"
        @change="changeValuesFilter = true"
      />

      <LazyUiDatePicker
        v-if="item.type == 'DATE'"
        v-model="item.value"
        hydrate-on-visible
        :label="item.label"
        :alt="`search-${item.label.toLocaleLowerCase()}`"
        :multiple="item.layout_filters?.range ? 'range' : false"
        :clearable="item.layout_filters?.clearable"
        @save="
          item.value = saveDate(
            $event,
            item.layout_filters?.range ? 'range' : false
          )
        "
        @change="changeValuesFilter = true"
      />

      <LazyUiSwitchLock
        v-if="item.type == 'BOOLEAN'"
        v-model="item.value"
        hydrate-on-visible
        :value="item.value == null ? null : !!item.value"
        :alt="`search-${item.label.toLocaleLowerCase()}`"
        :label="item.label"
        @switch="item.value = ''"
        @change="changeValuesFilter = true"
      />
    </v-col>

      <slot name="extra-filter" />
    </v-row>
  </div>
</template>

<style scoped>
.filter-group-wrapper {
  overflow: hidden;
}

.filter-item {
  animation: filterFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: calc(var(--filter-index, 0) * 0.05s);
  opacity: 0;
  transform: translateY(10px);
}

@keyframes filterFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transição suave para mudanças nos campos */
:deep(.v-field),
:deep(.v-input),
:deep(.v-select),
:deep(.v-text-field) {
  transition: all 0.2s ease;
}

:deep(.v-field:hover),
:deep(.v-input:hover),
:deep(.v-select:hover),
:deep(.v-text-field:hover) {
  transform: translateY(-1px);
}
</style>
