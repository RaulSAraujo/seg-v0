<script lang="ts" setup>
import Card from "./Card.vue";
import Input from "./Input.vue";
import { useInformationCenter } from "~/composables/counter_order/useInformationCenter";

defineOptions({
  name: "CounterOrderInformationCenter",
});

const { params } = useRoute();

if (params.id) {
  useHead({
    titleTemplate: `PED.${params.id} - Central de informações - %s`,
  });
}

const { $config } = useNuxtApp();

const infCenterStore = useCounterOrderInfCenterStore();
const { informationCenter } = storeToRefs(infCenterStore);

const { data, status } = useInformationCenter({ lazy: true });

watch(
  () => status.value,
  (value) => {
    if (value == "success" && data.value) {
      informationCenter.value = data.value;
    }
  }
);

onMounted(() => {
  if (status.value == "success" && data.value) {
    informationCenter.value = data.value;
  }
});
</script>

<template>
  <v-timeline side="end" truncate-line="both" class="my-5">
    <Input />

    <template v-if="status === 'success'">
      <v-timeline-item
        v-for="obs in informationCenter"
        :key="obs.id"
        width="90vw"
        size="large"
      >
        <template #icon>
          <v-img
            :src="`${$config.public.base_url_file_manager}/user-photos?userId=${obs.user_id}&type=image`"
            aspect-ratio="1"
            rounded="xl"
            cover
          />
        </template>

        <Card
          :comment-id="obs.id"
          :name="obs.User.name"
          :user-id="obs.User.id"
          :created-at="obs.created_at"
          :description="obs.description"
        />
      </v-timeline-item>
    </template>

    <v-timeline-item v-else dot-color="primary">
      <v-skeleton-loader type="image" width="89vw" color="transparent" />
    </v-timeline-item>
  </v-timeline>
</template>
