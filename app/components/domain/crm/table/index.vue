<script lang="ts" setup>
defineOptions({
  name: "CrmTable",
});

const { $dayjs } = useNuxtApp();

const status = ["CONCLUIDO", "PENDENTE", "PROBLEMA", "EM REPARO"];

const itemRowBackground = (audit_status: string) => {
  if (audit_status == "CONCLUIDO") {
    return "crm-highlight-row-concluded";
  }

  if (audit_status == "PENDENTE") {
    return "crm-highlight-row-pending";
  }

  if (audit_status == "PROBLEMA") {
    return "crm-highlight-row-problem";
  }

  if (audit_status == "EM REPARO") {
    return "crm-highlight-row-repair";
  }
};
</script>

<template>
  <UiTable show-select>
    <template #item.action="{ item }">
      <ClientOnly>
        <v-btn
          icon="mdi-home-export-outline"
          variant="plain"
          size="small"
          color="blue"
          density="compact"
          :to="{
            name: 'service-order-id',
            params: { id: item.service_order_id },
          }"
        />
      </ClientOnly>
    </template>

    <template #item.audit_status="{ item }">
      <UiEditDialogObject
        :id="item.id"
        :items="status"
        attr="audit_status"
        :value="item.audit_status"
        @update-text="
          item.audit_status = $event;

          item.audit_date =
            $event == 'CONCLUIDO' ? $dayjs().format() : item.audit_date;
        "
      >
        <template #default="props">
          <span
            v-if="!!item.audit_status"
            v-bind="props"
            :class="itemRowBackground(item.audit_status)"
            >{{ item.audit_status }}</span
          >

          <v-btn v-else v-bind="props" variant="plain" block />
        </template>
      </UiEditDialogObject>
    </template>

    <template #item.observation="{ item }">
      <UiEditDialogString
        :id="item.id"
        :text="item.observation"
        :vw="5"
        attr="observation"
        @update-text="item.observation = $event"
      />
    </template>

    <template #item.user="{ item }">
      <UiTooltip :text="item.User?.name" :vw="5" />
    </template>

    <template #item.created_at="{ item }">
      <UiDateString
        :date="item.created_at"
        format-for="DD/MM/YYYY HH:mm:ss"
        format-from="YYYY-MM-DDTHH:mm:ss"
      />
    </template>
  </UiTable>
</template>

<style scoped>
.crm-highlight-row-concluded {
  color: green;
}

.crm-highlight-row-pending {
  color: yellow;
}

.crm-highlight-row-problem {
  color: red;
}

.crm-highlight-row-repair {
  color: blue;
}
</style>
