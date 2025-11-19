<script lang="ts" setup>
import { useOSScheduleApi } from "~/services/service_order.service/useServiceOrderScheduleApi";

import type { ServiceOrderSchedulesForm } from "~/interfaces/ServiceOrder";

const { $dayjs } = useNuxtApp();

const { params } = useRoute();

const dialog = ref(false);

const form = reactive<ServiceOrderSchedulesForm>({
  technical_id: null,
  date: null,
  weekday: "",
  observation: "",
  motive: "VISITA",
});

const time = ref<string | null>(null);

const loading = useLoadingIndicator();

const { create } = useOSScheduleApi();

const save = async () => {
  try {
    loading.start();

    await create(params.id as string, time.value, form);

    dialog.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
};

const clear = () => {
  form.technical_id = null;
  form.date = null;
  form.weekday = "";
  form.observation = "";
  form.motive = "VISITA";

  time.value = null;
};
</script>

<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-top-transition"
    width="300px"
    @after-leave="clear"
  >
    <template #activator="{ props: activator }">
      <v-btn
        v-bind="activator"
        class="mr-2"
        color="primary"
        text="ADD"
        prepend-icon="mdi-plus"
      />
    </template>

    <template #default>
      <v-card title="NOVO AGENDAMENTO" rounded="xl">
        <template #text>
          <v-row dense>
            <v-col cols="12">
              <ServiceOrderTabsScheduleCreationTechnician
                v-model="form.technical_id"
              />
            </v-col>

            <v-col cols="12">
              <UiDatePicker
                v-model="form.date"
                label="Data"
                :clearable="false"
                :multiple="false"
                @save="form.date = $dayjs($event).format('DD/MM/YYYY')"
              />
            </v-col>

            <v-col cols="12">
              <ServiceOrderTabsScheduleCreationTime
                v-model="time"
                :technical-id="form.technical_id"
                :date="form.date"
              />
            </v-col>

            <v-col cols="12">
              <ServiceOrderTabsScheduleCreationMotive v-model="form.motive" />
            </v-col>

            <v-col cols="12">
              <UiTextField v-model="form.observation" label="Observação" />
            </v-col>
          </v-row>
        </template>

        <template #actions>
          <v-spacer />
          <v-btn
            color="primary"
            text="SALVAR"
            variant="flat"
            width="8vw"
            @click="save()"
          />
          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
