<script lang="ts" setup>
import { useSupplierPasswordLogs } from "../composables/useSupplierPasswordLogs";

defineOptions({
  name: "SupplierPasswordTimeline",
});

const props = defineProps<{
  idSupplier: string;
}>();

const { $config, $dayjs } = useNuxtApp();

const { data } = await useSupplierPasswordLogs(props.idSupplier, {
  lazy: true,
});
</script>

<template>
  <v-timeline density="comfortable" align="center" side="end">
    <v-timeline-item v-for="item in data" :key="item.id" dot-color="primary">
      <template #icon>
        <v-img
          :src="`${$config.public.base_url_file_manager}/user-photos?userId=${item.user_id}&type=image`"
          aspect-ratio="1"
          rounded="xl"
          cover
        />
      </template>

      <v-card
        flat
        style="white-space: pre-line"
        variant="outlined"
        rounded="xl"
        width="90vw"
        class="border-thin"
      >
        <template #title>
          <span class="text-h6 font-weight-bold text-primary">
            {{ item.description }}
          </span>
        </template>

        <template #subtitle>
          <span class="text-caption"> {{ item.User.name }} </span>
        </template>

        <template #text>
          <span class="text-body-2"> {{ item.old_value }} </span>

          <v-icon
            v-if="item.old_value || item.new_value"
            icon="mdi-arrow-right-thin"
          />

          <span class="text-body-2"> {{ item.new_value }} </span>
        </template>

        <template #append>
          <span class="text-overline">
            {{
              $dayjs(item.created_at).format("D [de] MMMM [de] YYYY [ás] HH:mm")
            }}
          </span>
        </template>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
