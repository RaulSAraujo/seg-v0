<script lang="ts" setup>
const { params } = useRoute();

useHead({
  titleTemplate: `OS.${params.id} - histórico - %s`,
});

definePageMeta({
  path: "/ordem-servico/:id/historico",
});

const { $dayjs } = useNuxtApp();

const historyStore = useServiceOrderHistoryStore();
const { history } = storeToRefs(historyStore);
</script>

<template>
  <div>
    <v-timeline
      v-if="history.length > 0"
      density="comfortable"
      align="center"
      side="end"
    >
      <v-timeline-item
        v-for="order in history"
        :key="order.id"
        dot-color="primary"
      >
        <template #opposite>
          <div class="d-flex flex-column align-center">
            <div class="d-flex">
              <span class="text-primary text-h6 font-weight-bold">
                OS.{{ order.id }}
              </span>

              <v-btn
                icon="mdi-open-in-new"
                variant="plain"
                size="small"
                density="compact"
                color="primary"
                class="mt-n3"
                :disabled="!order.erp_client_id"
                target="_blank"
                :to="{
                  name: 'service-order-id',
                  params: { id: order.id },
                }"
              />
            </div>

            <span class="text-grey text-caption">
              {{ $dayjs(order.created_at).format("DD/MM/YYYY") }}
            </span>
          </div>
        </template>

        <v-card flat style="white-space: pre-line">
          <template #title>
            <span class="text-h6 font-weight-bold text-primary">DEFEITO</span>
          </template>

          <template #text>
            <span class="text-caption">
              {{ order.defect_description || "Nenhuma defeito informado" }}
            </span>
          </template>
        </v-card>

        <v-card flat style="white-space: pre-line">
          <template #title>
            <span class="text-h6 font-weight-bold text-primary">SOLUÇÃO</span>
          </template>

          <template #text>
            <span class="text-caption">
              {{ order.solution_description || "Nenhuma solução informada" }}
            </span>
          </template>
        </v-card>
      </v-timeline-item>
    </v-timeline>

    <!-- Empty State -->
    <v-card v-else class="text-center my-5" height="150" elevation="0">
      <v-card-title class="text-primary">
        <v-icon class="me-2">mdi-file-outline</v-icon>
        Nenhum histórico encontrado
      </v-card-title>

      <v-card-text>
        <span class="text-body-2 text-medium-emphasis">
          Nenhum histórico foi encontrado para essa ordem de serviço
        </span>
      </v-card-text>
    </v-card>
  </div>
</template>
