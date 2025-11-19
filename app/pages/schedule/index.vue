<script setup lang="ts">
import type {
  ServiceOrderSchedule,
  Event,
} from "~/interfaces/ServiceOrderSchedule";

useHead({
  titleTemplate: `Agenda - %s`,
});

definePageMeta({
  path: "/agenda",
});

const { $customFetch } = useNuxtApp();

const loading = useLoadingIndicator();

const dayjs = useDayjs();

const date = ref<string>("");

const dateCalendar = ref<string>("");

const activeView = ref<"week" | "day">("week");

const technician = ref<string | undefined>(undefined);

const serviceOrderId = ref<string | undefined>(undefined);

const externalRegion = ref<boolean>(false);

const { capitalizeFirstLetter } = useCapitalize();

const events = ref<Event[]>([]);

const fixedDateFirst = dayjs()
  .startOf("week")
  .add(1, "day")
  .format("YYYY-MM-DD");
const fixedDateLast = dayjs().endOf("week").format("YYYY-MM-DD");

const { databaseDate } = useDateConversion();

const getSchedules = async () => {
  try {
    loading.start();

    activeView.value = "week";

    let newDate = undefined;
    if (date.value?.length != 0) {
      const arrayDate = date.value
        .split(" - ")
        .map((date) => databaseDate(date));

      newDate = `${arrayDate}`;

      if (arrayDate[0] == arrayDate[1]) activeView.value = "day";
    } else {
      newDate = `${[fixedDateFirst, fixedDateLast]}`;
    }

    if (serviceOrderId.value == "") {
      serviceOrderId.value = undefined;
    }

    if (serviceOrderId.value != undefined) {
      newDate = undefined;
    }

    const res = await $customFetch<ServiceOrderSchedule>(
      `service-order-schedule`,
      {
        query: {
          date: newDate,
          technical_id: technician.value,
          service_order_id: serviceOrderId.value,
          external: externalRegion.value,
        },
      }
    );

    const getColorByCategory = (category: string) => {
      if (category == "LINHA BRANCA") return "bg-green";
      if (category == "LINHA MARROM") return "bg-blue";
      if (category == "LINHA A/V") return "bg-gray";
      if (category == "INFORMATICA") return "bg-yellow";
      if (category == "OUTROS") return "bg-orange";

      return "";
    };

    events.value = res.rows
      .map((e) => {
        let title = "";

        if (e.service_order_id) {
          title = `OS.${e.service_order_id}`;
        } else {
          title = capitalizeFirstLetter(e.title || "");
        }

        const motive = capitalizeFirstLetter(e.motive || "");

        const name = capitalizeFirstLetter(e.User?.name || "");

        if (motive && name) {
          title = title.concat(` - ${motive} - ${name}`);
        }

        return {
          title: title,
          motive: e.motive,
          start: dayjs(
            `${dayjs(e.date).format("YYYY-MM-DD")}T${e.start_time}`
          ).toDate(),
          end: dayjs(
            `${dayjs(e.date).format("YYYY-MM-DD")}T${e.end_time}`
          ).toDate(),
          technical: `${e.User?.name || ""}`,
          os: e.service_order_id,
          observation: e.observation,
          data: e,
          allDay: e.all_day,
          class: getColorByCategory(e.ServiceOrder?.apparatus_category ?? ""),
        };
      })
      .sort((a, b) => a.start.getTime() - b.start.getTime());

    if (serviceOrderId.value != undefined) {
      const index = events.value.length - 1;

      const day = dayjs(events.value[index]?.start.toDateString()).format(
        "YYYY-MM-DD"
      );

      dateCalendar.value = day;
    } else {
      dateCalendar.value = newDate!.split(",")[0] || "";
    }

    loading.finish();
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);

    loading.finish();
  }
};

const previousPage = () => {
  if (date.value == "") {
    const start = dayjs()
      .startOf("week")
      .subtract(1, "week")
      .add(1, "day")
      .format("DD/MM/YYYY");
    const end = dayjs().endOf("week").subtract(1, "week").format("DD/MM/YYYY");

    date.value = `${start} - ${end}`;
  } else {
    const arrayDate = date.value.split(" - ").map((date) => databaseDate(date));

    const start = dayjs(arrayDate[0])
      .startOf("week")
      .subtract(1, "week")
      .add(1, "day")
      .format("DD/MM/YYYY");
    const end = dayjs(arrayDate[1])
      .endOf("week")
      .subtract(1, "week")
      .format("DD/MM/YYYY");

    date.value = `${start} - ${end}`;
  }

  getSchedules();
};

const nextPage = () => {
  if (date.value == "") {
    const start = dayjs()
      .startOf("week")
      .add(1, "week")
      .add(1, "day")
      .format("DD/MM/YYYY");
    const end = dayjs().endOf("week").add(1, "week").format("DD/MM/YYYY");

    date.value = `${start} - ${end}`;
  } else {
    const arrayDate = date.value.split(" - ").map((date) => databaseDate(date));

    const start = dayjs(arrayDate[0])
      .startOf("week")
      .add(1, "week")
      .add(1, "day")
      .format("DD/MM/YYYY");
    const end = dayjs(arrayDate[1])
      .endOf("week")
      .add(1, "week")
      .format("DD/MM/YYYY");

    date.value = `${start} - ${end}`;
  }

  getSchedules();
};

const saveDate = (event: string) => {
  date.value = `${dayjs(event[0]).format("DD/MM/YYYY")} - ${dayjs(
    event[event.length - 1]
  ).format("DD/MM/YYYY")}`;
};

const clear = () => {
  dateCalendar.value = dayjs().format("YYYY-MM-DD");

  date.value = "";

  technician.value = undefined;

  serviceOrderId.value = undefined;

  getSchedules();
};

getSchedules();
</script>

<template>
  <div class="mx-5 mt-5">
    <span class="ml-5 text-h6 text-primary">AGENDA DE SERVIÇOS</span>

    <v-row dense class="my-2">
      <v-col cols="2">
        <UiDatePicker
          v-model="date"
          label="Informe o período"
          multiple="range"
          :clearable="false"
          @save="saveDate($event)"
        />
      </v-col>

      <v-col cols="2">
        <UiTextField v-model="serviceOrderId" label="Numero da ordem" />
      </v-col>

      <v-col cols="2">
        <ServiceOrderTabsScheduleCreationTechnician v-model="technician" />
      </v-col>

      <v-col cols="2">
        <ScheduleFilterExternalRegion v-model="externalRegion" />
      </v-col>
    </v-row>

    <div class="d-flex align-center justify-end mr-5 mb-5">
      <div>
        <ScheduleCreation @add="events.push($event)" />

        <v-btn class="mr-2" color="primary" @click="getSchedules">
          BUSCAR
        </v-btn>

        <v-btn class="mr-2" variant="outlined" color="primary" @click="clear">
          Limpar Filtros
        </v-btn>
      </div>
    </div>

    <ClientOnly>
      <ScheduleCalendar
        :events="events"
        :selected-date="dateCalendar"
        :active-view="activeView"
        @change-selected-date="dateCalendar = $event"
        @change-active-view="activeView = $event"
        @previous-page="previousPage"
        @next-page="nextPage"
      />
    </ClientOnly>
  </div>
</template>
