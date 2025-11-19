<script lang="ts" setup>
import { useOSTechnicalObservationsApi } from "../../../api/useServiceOrderTechnicalObsApi";
// components
import Card from "./Card.vue";
import Input from "./Input.vue";
import DialogEdit from "./Edit.vue";
import DialogDelete from "./Delete.vue";

const { params } = useRoute();
const { $config } = useNuxtApp();

const techObsStore = useServiceOrderTechObsStore();
const { technicalObservations } = storeToRefs(techObsStore);

const { get } = useOSTechnicalObservationsApi();

const { data, status } = get(params.id as string, { lazy: true });

onMounted(() => {
  if (status.value == "success" && data.value) {
    technicalObservations.value = data.value;
  }
});
</script>

<template>
  <v-card
    rounded="xl"
    elevation="0"
    min-height="100%"
    class="pa-3 border-md border-primary"
  >
    <template #title>
      <span class="text-primary">TÉCNICAS</span>
    </template>

    <template #append>
      <Input />
    </template>

    <v-card-text>
      <v-timeline
        side="end"
        size="large"
        align="start"
        density="compact"
        truncate-line="both"
        :hide-opposite="true"
      >
        <v-timeline-item
          v-for="obs in technicalObservations"
          :key="obs.id"
          width="100%"
        >
          <template #icon>
            <v-img
              :src="`${$config.public.base_url_file_manager}/user-photos?userId=${obs.user}&type=image`"
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
      </v-timeline>

      <v-card
        v-if="technicalObservations.length === 0"
        class="text-center"
        elevation="0"
      >
        <template #title>
          <span class="text-primary">
            Nenhuma observação técnica adicionada
          </span>
        </template>

        <template #text>
          <span class="text-caption">
            Adicione uma observação técnica para este serviço.
          </span>
        </template>
      </v-card>

      <DialogEdit />

      <DialogDelete />
    </v-card-text>
  </v-card>
</template>
