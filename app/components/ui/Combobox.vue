<script setup lang="ts">
defineProps<{
  alt?: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: Array<any>;
  itemTitle?: string;
  itemValue?: string;
  clearable?: boolean | undefined;
  multiple?: boolean | undefined;
  menuOpenDefault?: boolean | undefined;
  returnObject?: boolean | undefined;
  placeholder?: string | undefined;
  autoSelectFirst?: "exact" | boolean;
  hideDetails?: boolean | "auto" | undefined;
}>();

const valueLocal = ref<unknown>();
</script>

<template>
  <v-combobox
    :id="alt || label"
    density="compact"
    color="primary"
    variant="outlined"
    rounded="lg"
    :label="label"
    :clearable="clearable"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
    :multiple="multiple ?? false"
    :menu="menuOpenDefault"
    :placeholder="placeholder"
    :return-object="returnObject"
    :menu-props="{
      // @ts-ignore
      'max-height': '200',
    }"
    :hide-details="hideDetails || true"
    :auto-select-first="autoSelectFirst"
    @update:model-value="valueLocal = $event"
  >
    <template v-if="multiple" #selection="{ item, index }">
      <span
        v-if="index < 1"
        style="
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        "
        >{{ item.title }}</span
      >

      <span v-if="index === 1" class="text-grey text-caption align-self-center">
        (+{{ ((valueLocal as [])?.length ?? 1) - 1 }})
      </span>
    </template>
  </v-combobox>
</template>

<style>
.v-combobox__selection {
  max-width: 70%;
}
</style>
