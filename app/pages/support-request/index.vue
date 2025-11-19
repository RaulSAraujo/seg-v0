<script setup lang="ts">
useHead({
  titleTemplate: `Chamados - %s`,
});

definePageMeta({
  path: "/chamados",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">CHAMADOS</span>

    <UiFilter hide-excel>
      <template #button-create>
        <v-btn
          class="mr-2"
          text="CRIAR"
          rounded="lg"
          color="primary"
          :to="{
            name: 'support-request-creation',
          }"
        />
      </template>
    </UiFilter>

    <UiTable>
      <template #item.action="{ item }">
        <v-btn
          icon="mdi-pencil"
          variant="plain"
          size="small"
          color="primary"
          :to="{
            name: 'support-request-id',
            params: { id: item.id },
          }"
        />

        <UiDelete :id="item.id" />
      </template>

      <template #item.user_id="{ item }">
        <span>{{ item.User.name.toUpperCase() }}</span>
      </template>

      <template #item.classification="{ item }">
        <SupportRequestTemplateClassification
          :classification="item.classification"
        />
      </template>

      <template #item.priority="{ item }">
        <SupportRequestTemplatePriority
          :priority="item?.priority || 0"
          icon-or-text="icon"
        />
      </template>

      <template #item.days_since_opened="{ item }">
        <span>{{ item.days_since_opened }}</span>
      </template>
    </UiTable>
  </div>
</template>
