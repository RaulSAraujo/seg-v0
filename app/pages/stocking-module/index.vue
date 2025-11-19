<script setup lang="ts">
useHead({
  titleTemplate: `Log de estocagem - %s`,
});

definePageMeta({
  path: "/log-estocagem",
})
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">LOG DE ESTOCAGEM</span>

    <UiFilter />

    <UiTable>
      <template #item.user_id="{ item }">
        <UiTooltip :text="item.User.name" :vw="5" />
      </template>

      <template #item.created_at="{ item }">
        <UiDateString
          :date="item.created_at"
          format-for="DD/MM/YYYY HH:mm:ss"
          format-from="YYYY-MM-DDTHH:mm:ss"
        />
      </template>
    </UiTable>
  </div>
</template>
