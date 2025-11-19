<script lang="ts" setup>
import type { ServiceOrderSchedules } from "~/interfaces/ServiceOrder";

defineOptions({
  name: "ScheduleCreation",
});

const emit = defineEmits(["add"]);

const dialog = ref(false);

interface Form {
  title: string;
  technical_id: number | null;
  date: string | null;
  weekday: string;
  observation: string;
  motive: string | null;
}

const form = reactive<Form>({
  technical_id: null,
  title: "",
  date: null,
  weekday: "",
  observation: "",
  motive: null,
});

const time = ref<string | null>(null);

const { $customFetch } = useNuxtApp();

const loading = useLoadingIndicator();

const dayjs = useDayjs();

const { isDate, databaseDate } = useDateConversion();

const { capitalizeFirstLetter } = useCapitalize();

const save = async () => {
  try {
    loading.start();

    const newForm = { ...form };

    if (isDate(newForm.date!)) {
      newForm.date = databaseDate(newForm.date!);
    }

    if (!time.value) {
      loading.finish();

      return $toast().info("Informe o horário.");
    }

    const times = time.value!.split(" - ");

    const res = await $customFetch<ServiceOrderSchedules>(
      "service-order-schedule",
      {
        method: "POST",
        body: {
          service_order_id: null,
          start_time: times[0],
          end_time: times[1],
          ...newForm,
        },
      }
    );

    let title = "";

    if (res.service_order_id) {
      title = `OS.${res.service_order_id}`;
    } else {
      title = capitalizeFirstLetter(res.title || "");
    }

    const motive = capitalizeFirstLetter(res.motive || "");

    const name = capitalizeFirstLetter(res.User?.name || "");

    if (motive && name) {
      title = title.concat(` - ${motive} - ${name}`);
    }

    emit("add", {
      title: title,
      motive: res.motive,
      start: dayjs(
        `${dayjs(res.date).format("YYYY-MM-DD")}T${res.start_time}`
      ).toDate(),
      end: dayjs(
        `${dayjs(res.date).format("YYYY-MM-DD")}T${res.end_time}`
      ).toDate(),
      technical: `${res.technical_name || ""}`,
      os: res.service_order_id,
      observation: res.observation,
      data: res,
      allDay: res.all_day,
    });

    dialog.value = false;

    loading.finish();
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);

    loading.finish();
  }
};

const clear = () => {
  form.title = "";
  form.technical_id = null;
  form.date = null;
  form.weekday = "";
  form.observation = "";
  form.motive = null;

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
        text="CRIAR"
        rounded="lg"
        color="primary"
      />
    </template>

    <template #default>
      <v-card width="350" rounded="xl">
        <v-sheet color="primary" class="pa-5">
          <UiTextField
            v-model="form.title"
            v-maska="'Ax'"
            label="Titulo"
            variant="solo"
            bg-color="white"
          />
        </v-sheet>

        <div class="pa-1">
          <v-row dense class="pa-5">
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
                @save="form.date = dayjs($event).format('DD/MM/YYYY')"
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
        </div>

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
