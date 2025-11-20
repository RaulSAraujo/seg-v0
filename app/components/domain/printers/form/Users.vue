<script lang="ts" setup>
defineOptions({
  name: "PrintersUsers",
});

const { data, status } = useUsers({ lazy: true });
</script>

<template>
  <UiCombobox
    v-if="status === 'success' && data"
    label="Usuário"
    :items="data.rows ?? []"
    item-title="name"
    item-value="name"
  />
</template>
