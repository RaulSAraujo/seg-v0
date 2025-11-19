<script lang="ts" setup>
import type { NewPermissions } from "~/interfaces/Group";

defineProps<{
  label: string;
  permission: NewPermissions;
}>();
</script>

<template>
  <v-row dense class="border-b-sm pa-0 ma-0">
    <v-col class="d-flex align-center border-e-sm">
      <span class="text-h6 text-primary font-weight-black ml-2 text-truncate">
        {{ label }}
      </span>
    </v-col>

    <v-col
      v-for="(method, index) in permission.methods"
      :key="index"
      cols="1"
      class="d-flex justify-center align-center"
      :class="index + 1 < permission.methods.length ? 'border-e-sm' : ''"
    >
      <SettingProfileEditLineCategoryCheckbox
        :has-permission="method.has_permission ?? false"
        :permission="permission"
        :method-api="method.name"
        @update="method.has_permission = $event"
      />
    </v-col>
  </v-row>
</template>
