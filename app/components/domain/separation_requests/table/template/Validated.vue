<script lang="ts" setup>
defineOptions({
  name: "SeparationRequestsTemplateValidated",
});

const props = defineProps<{
  id: number;
  validated: boolean;
}>();

const emit = defineEmits(["updateValidated", "updateValidatedAt"]);

const dayjs = useDayjs();

const validatedComp = computed({
  get: () => {
    return props.validated;
  },
  set: (newValue) => {
    emit("updateValidated", newValue);

    emit("updateValidatedAt", newValue ? dayjs().format() : null);
  },
});
</script>

<template>
  <UiCheckIcon
    :id="id"
    :value="validatedComp"
    url="sales-orders-separation"
    attr="validated"
    :enable-alert="true"
    :body="{
      validate_at: !validatedComp ? dayjs().format() : null,
    }"
    @update-value="validatedComp = $event"
  />
</template>
