<script setup lang="ts">
const { params } = useRoute();

const historyStore = useServiceOrderHistoryStore();
const { history } = storeToRefs(historyStore);
</script>

<template>
  <v-tabs
    fixed-tabs
    mandatory
    hide-slider
    :mobile="false"
    class="mt-12"
    density="comfortable"
    selected-class="bg-primary rounded-t-xl"
  >
    <v-tab
      text="Central de informações"
      class="rounded-t-xl"
      :to="{
        name: 'service-order-id',
        params: { id: params.id },
      }"
    />

    <v-tab
      text="Orçamento"
      class="rounded-t-xl"
      :to="{
        name: 'service-order-id-budget',
        params: { id: params.id },
      }"
    />

    <v-tab
      text="Agenda"
      class="rounded-t-xl"
      :to="{
        name: 'service-order-id-schedule',
        params: { id: params.id },
      }"
    />

    <v-tab
      text="Arquivos"
      class="rounded-t-xl"
      :to="{
        name: 'service-order-id-files',
        params: { id: params.id },
      }"
    />

    <v-tab
      text="CRM"
      class="rounded-t-xl"
      :to="{
        name: 'service-order-id-crm',
        params: { id: params.id },
      }"
    />

    <ClientOnly>
      <v-tab
        text="Histórico"
        class="rounded-t-xl"
        :to="{
          name: 'service-order-id-history',
          params: { id: params.id },
        }"
      >
        <template #append>
          <v-badge
            color="primary"
            bordered
            floating
            :content="history.length || 0"
          />
        </template>
      </v-tab>

      <template #fallback>
        <v-skeleton-loader color="transparent" type="heading" />
      </template>
    </ClientOnly>

    <v-tab
      text="Logs"
      class="rounded-t-xl"
      :to="{
        name: 'service-order-id-logs',
        params: { id: params.id },
      }"
    />
  </v-tabs>
</template>
