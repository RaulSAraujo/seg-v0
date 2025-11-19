<script setup lang="ts">
const props = defineProps<{
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
  itemTitle?: string;
  itemValue?: string;
  clearable?: boolean | undefined;
  multiple?: boolean | undefined;
  returnObject?: boolean | undefined;
  alt?: string;
  maxHeightMenu?: string | null;
  placeholder?: string | undefined;
}>();

const valueLocal = ref<unknown>();

const likesAll = computed(
  () => (valueLocal.value as [])?.length === props.items.length
);

const likesSome = computed(
  () => valueLocal.value != null && (valueLocal.value as []).length > 0
);

const emit = defineEmits(["like"]);

const toggle = () => {
  if (likesAll.value) {
    valueLocal.value = [];

    emit("like", []);
  } else {
    const map = useArrayMap(props.items, (item) => item[props.itemValue!]);

    valueLocal.value = map.value;

    emit("like", map.value);
  }
};
</script>

<template>
  <v-select
    :id="alt || label"
    density="compact"
    color="primary"
    variant="outlined"
    rounded="lg"
    :label="label"
    :multiple="multiple ?? false"
    :clearable="clearable"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
    :placeholder="placeholder"
    :return-object="returnObject"
    :menu-props="{
      // @ts-ignore
      'max-height': maxHeightMenu ?? '200',
    }"
    hide-details
    @update:model-value="valueLocal = $event"
  >
    <template v-if="multiple" #prepend-item>
      <v-list-item title="Select All" @click="toggle">
        <template #prepend>
          <v-checkbox-btn
            :color="likesSome ? 'indigo-darken-4' : undefined"
            :indeterminate="likesSome && !likesAll"
            :model-value="likesAll"
          />
        </template>
      </v-list-item>

      <v-divider />
    </template>

    <template v-if="multiple" #selection="{ item, index }">
      <span
        v-if="index < 1"
        style="
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        "
      >
        {{ item.title }}
      </span>

      <span v-if="index === 1" class="text-grey text-caption align-self-center">
        (+{{ ((valueLocal as [])?.length ?? 1) - 1 }})
      </span>
    </template>
  </v-select>
</template>

<style>
.v-select__selection {
  max-width: 70%;
}
</style>
