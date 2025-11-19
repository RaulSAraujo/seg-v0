<script setup lang="ts">
import { createDefaultSupportRequest } from "~/factories/supportRequestFactory";

import type {
  SupportRequest,
  Row,
} from "~/interfaces/SupportRequest";

const { params } = useRoute();

useHead({
  titleTemplate: `Chamado #${params.id} - %s`,
});

definePageMeta({
  path: "/chamados/:id",
});

const { go } = useRouter();
const { $config } = useNuxtApp();
const { brDateWithTime } = useDateConversion();

const supportRequest = ref<Row>(createDefaultSupportRequest());

const { data } = await $api<Row>(`support-request`, {
  key: `SupportRequest`,
  query: {
    id: params.id,
  },
  transform: (fetchData) => {
    const row = (fetchData as unknown as SupportRequest).rows[0];

    return row || createDefaultSupportRequest();
  },
});

supportRequest.value = createDefaultSupportRequest(data.value);

const destroy = (id: number) => {
  const index = supportRequest.value!.SupportRequestLogs.findIndex(
    (e) => e.id == id
  );

  supportRequest.value?.SupportRequestLogs.splice(index, 1);
};
</script>

<template>
  <div class="my-5 mx-2">
    <div class="mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para chamados"
        :to="{
          name: 'support-request',
        }"
      />
    </div>

    <v-sheet class="mx-2" rounded="xl" elevation="5">
      <SupportRequestHeader
        :id="supportRequest.id"
        :classification="supportRequest.classification"
        :priority="supportRequest.priority"
        :title="supportRequest.title"
        :status="supportRequest.status"
        :module="supportRequest.module"
        :screen="supportRequest.screen"
        @update-status="supportRequest.status = $event"
      />

      <v-timeline side="end">
        <SupportRequestInputTimeline
          :request-id="`${params.id}`"
          @new="supportRequest.SupportRequestLogs.splice(0, 0, $event)"
        />

        <v-timeline-item
          v-for="item in supportRequest.SupportRequestLogs"
          :key="item.id"
          fill-dot
          dot-color="primary"
          size="large"
          width="90vw"
        >
          <template #icon>
            <v-img
              :src="`${$config.public.base_url_file_manager}/user-photos?userId=${item.user_id}&type=image`"
              aspect-ratio="1"
              rounded="xl"
              cover
            />
          </template>

          <v-card
            :subtitle="brDateWithTime(`${item.created_at}`)"
            variant="outlined"
            rounded="xl"
            class="border-sm"
          >
            <template #append>
              <SupportRequestButtonEdit
                :id-support="item.id"
                :created-at="item.created_at"
                :user-id="item.user_id"
                :comment="item.comment ?? ''"
                @update-comment="go(0)"
              />

              <SupportRequestButtonDelete
                :id-support="item.id"
                :created-at="item.created_at"
                :user-id="item.user_id"
                @destroy="destroy($event)"
              />
            </template>

            <template #title>
              <span class="text-primary">{{ item.User.name }}</span>
            </template>

            <template #text>
              <UiTiptap
                :editable="false"
                :remove-buttons="true"
                :content="item.comment ?? ''"
              />

              <SupportRequestFiles
                v-if="item.file_paths"
                :values="item.file_paths"
              />
            </template>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-sheet>
  </div>
</template>

<style>
.divTipTap {
  border: 1px solid rgb(25, 118, 210);
  border-radius: 20px;
}

.fileImage {
  display: block;
}

.fileImage .v-icon {
  width: 100%;
  position: absolute;
  opacity: 0;
}
</style>
