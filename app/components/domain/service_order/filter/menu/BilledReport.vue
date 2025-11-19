<script lang="ts" setup>
const dialog = ref(false);

interface Form {
  date: string;
  technician_name: string | undefined;
}

const form = reactive<Form>({
  date: "",
  technician_name: undefined,
});

const dayjs = useDayjs();

const saveDate = (event: string) => {
  form.date = `${dayjs(event[0]).format("DD/MM/YYYY")} - ${dayjs(
    event[event.length - 1]
  ).format("DD/MM/YYYY")}`;
};

const { $customFetch, $config } = useNuxtApp();

const { databaseDate } = useDateConversion();

const loading = useLoadingIndicator();

const search = async () => {
  try {
    if (!form.date || !form.technician_name)
      return $toast().error("Dados inválidos.");

    loading.start();

    const arrayDate = form.date.split(" - ").map((date) => databaseDate(date));

    const res = await $customFetch<{ filePath: string }>(
      "service-order/billed-report",
      {
        query: {
          start_date: arrayDate[0],
          end_date: arrayDate[1],
          technician_name: form.technician_name,
        },
      }
    );

    loading.finish();

    const link = document.createElement("a");
    link.href = `${$config.public.base_url_local}${res.filePath}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};
</script>

<template>
  <v-dialog v-model="dialog" width="600px">
    <template #activator="{ props: activatorProps }">
      <v-tooltip
        location="top"
        text="RELATÓRIO OS FATURADA"
        content-class="bg-purple"
      >
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="Object.assign({}, tooltip, activatorProps)"
            icon="mdi-file-chart"
            class="text-purple"
          />
        </template>
      </v-tooltip>
    </template>

    <template #default>
      <v-card title="GERAR RELATÓRIO OS FATURADA" rounded="xl">
        <v-card-text>
          <v-row dense>
            <v-col>
              <UiDatePicker
                v-model="form.date"
                label="Informe o período do relatório"
                multiple="range"
                :clearable="false"
                @save="saveDate($event)"
              />
            </v-col>

            <v-col>
              <ServiceOrderInputTechnicianSeg v-model="form.technician_name" />
            </v-col>
          </v-row>

          <div class="d-flex justify-center mt-5">
            <v-btn
              text="GERAR RELATÓRIO"
              base-color="primary"
              @click="search"
            />
          </div>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
