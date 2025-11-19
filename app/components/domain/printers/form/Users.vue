<script lang="ts" setup>
import { useUsers } from "../../composables/useUsers";

defineOptions({
  name: "PrintersUsers",
});

const { data } = useUsers({ lazy: true });
</script>

<template>
  <UiCombobox
    label="Usuário"
    :items="data ?? []"
    item-title="name"
    item-value="name"
  />
</template>
