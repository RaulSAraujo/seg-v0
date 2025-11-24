<script lang="ts" setup>
import type { Pages } from "~/interfaces/Group";

defineProps<{
  label: string;
  page: Pages;
}>();
</script>

<template>
  <v-row dense class="border-b-sm pa-0 ma-0">
    <v-col class="d-flex align-center border-e-sm">
      <span class="text-body-1 ml-5 text-truncante">
        {{ label }}
      </span>
    </v-col>

    <v-col
      v-for="(method, indexMethod) in page.methods"
      :key="indexMethod"
      cols="1"
      class="d-flex justify-center align-center"
      :class="indexMethod + 1 < page.methods.length ? 'border-e-sm' : ''"
    >
      <SettingProfileEditLinePageCheckbox
        :routes="page.routes"
        :method-api="method.name"
        @update="method.has_permission = $event"
      />
    </v-col>
  </v-row>
</template>
