<script lang="ts" setup>
import type {
  ServiceOrder,
  Row,
} from "~/interfaces/ServiceOrder";

const props = defineProps<{
  serial: number | string;
}>();

const { $customFetch, $dayjs } = useNuxtApp();

const orders = ref<Row[]>([]);

const find = async () => {
  const res = await $customFetch<ServiceOrder>("service-order", {
    query: {
      full: false,
      "sort-type": "asc",
      "sort-field": "created_at",
      serial_number: props.serial,
    },
  });

  orders.value = res.rows;
};

const close = () => {};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="90vw"
    @after-leave="close"
  >
    <template #activator="{ props: dialog }">
      <v-tooltip
        location="top"
        text="Visualizar historico do serial"
        content-class="bg-primary"
      >
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="Object.assign({}, dialog, tooltip)"
            icon="mdi-magnify"
            density="compact"
            variant="plain"
            @click="find"
          />
        </template>
      </v-tooltip>
    </template>

    <v-card
      rounded="s-xl e-lg"
      style="
        --width-scrollbar: 5px;
        --track-color: rgba(0, 0, 0, 0);
        --thumb-color: #8080804d;
        --border-color: rgba(0, 0, 0, 0);
        --track-color-hover: #808080a3;
      "
    >
      <template #text>
        <v-timeline density="comfortable" align="center" side="end">
          <v-timeline-item
            v-for="order in orders"
            :key="order.id"
            dot-color="primary"
          >
            <template #opposite>
              <div class="d-flex flex-column align-center">
                <span class="text-primary text-h6 font-weight-bold">
                  OS.{{ order.id }}
                </span>
                <span class="text-grey text-caption">
                  {{ $dayjs(order.created_at).format("DD/MM/YYYY") }}
                </span>
              </div>
            </template>

            <v-card flat style="white-space: pre-line">
              <template #title>
                <span class="text-h6 font-weight-bold text-primary"
                  >DEFEITO</span
                >
              </template>

              <template #text>
                <span class="text-caption">
                  {{ order.defect_description || "Nenhuma defeito informado" }}
                </span>
              </template>
            </v-card>

            <v-card flat style="white-space: pre-line">
              <template #title>
                <span class="text-h6 font-weight-bold text-primary"
                  >SOLUÇÃO</span
                >
              </template>

              <template #text>
                <span class="text-caption">
                  {{
                    order.solution_description || "Nenhuma solução informada"
                  }}
                </span>
              </template>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </template>
    </v-card>
  </v-dialog>
</template>
