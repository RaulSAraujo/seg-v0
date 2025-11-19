<script lang="ts" setup>
import Type from "./template/Type.vue";

defineOptions({
  name: "CashControlTable",
});

const { data: user } = useAuth();

const disabledDelete = (paymentId: string, type: string) => {
  if (paymentId != null) return true;

  if (user.value?.groupId == 1) return false;

  if (type == "SANGRIA") return true;

  return false;
};
</script>

<template>
  <UiTable>
    <template #item.action="{ item }">
      <v-btn
        icon="mdi-home-export-outline"
        variant="plain"
        size="small"
        color="blue"
        density="compact"
        :disabled="!item.description.includes('OS.')"
        :to="{
          name: 'service-order-id',
          params: { id: item.description.replace('OS.', '') },
        }"
      />

      <UiDelete
        :id="item.id"
        :disabled="disabledDelete(item.payment_id, item.type)"
      />
    </template>

    <template #item.type="{ item }">
      <Type :type="item.type" />
    </template>

    <template #item.user_id="{ item }">
      <UiTooltip :text="item.User.name" :vw="10" />
    </template>

    <template #item.value="{ item }">
      <UiToLocaleString :value="item.value" />
    </template>

    <template #item.validated="{ item }">
      <UiCheckIcon
        :id="item.id"
        :value="item.validated ?? false"
        attr="validated"
        :enable-alert="false"
        @update-value="item.validated = $event"
      />
    </template>
  </UiTable>
</template>
