<script lang="ts" setup>
import type { Event } from "~/interfaces/ServiceOrderSchedule";

defineOptions({
  name: "ScheduleCalendar",
});

const props = defineProps<{
  events: Event[];
  selectedDate: string;
  activeView: "day" | "week";
}>();

const emit = defineEmits([
  "changeSelectedDate",
  "changeActiveView",
  "previousPage",
  "nextPage",
]);

const dayjs = useDayjs();

const compSelectedDate = computed({
  get() {
    return props.selectedDate;
  },
  set(value) {
    emit("changeSelectedDate", dayjs(value).format("YYYY-MM-DD"));
  },
});

const compActiveView = computed({
  get() {
    return props.activeView;
  },
  set(value) {
    emit("changeActiveView", value);
  },
});

const selectedEvent = ref<Event>();

type DeleteEventFunction = () => Promise<void>;

const deleteEventFunction = ref<DeleteEventFunction>();

const scheduleMenu = ref();

const cursorPointer = ref<MouseEvent>();

const { $customFetch } = useNuxtApp();

const onMouseUp = (event: MouseEvent) => {
  cursorPointer.value = event;
};

const activeMenu = () => {
  scheduleMenu.value.contextMenu = false;
  scheduleMenu.value.x = cursorPointer.value!.clientX;
  scheduleMenu.value.y = cursorPointer.value!.clientY;
  scheduleMenu.value.contextMenu = true;
};

const onEventCreate = (event: Event, eventDelete: DeleteEventFunction) => {
  selectedEvent.value = event;

  deleteEventFunction.value = eventDelete;

  return event;
};

const cancelEventCreation = () => {
  closeCreationDialog();

  deleteEventFunction.value!();
};

const closeCreationDialog = () => {
  scheduleMenu.value.contextMenu = false;

  selectedEvent.value = undefined;
};

const eventDelete = async (event: Event) => {
  try {
    interface Response {
      message: string;
      success: boolean;
    }

    const { success, message } = await $customFetch<Response>(
      "service-order-schedule",
      {
        method: "DELETE",
        query: {
          id: event.data.id,
        },
      }
    );

    if (!success) return $toast().error(message);

    $toast().success(message);
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};

watch(
  () => compActiveView.value,
  (value) => {
    if (value == "day") {
      document.documentElement.style.setProperty(
        "--resizing-schedule-color",
        "#1976d257"
      );
    } else {
      document.documentElement.style.removeProperty(
        "--resizing-schedule-color"
      );
    }
  }
);
</script>

<template>
  <vue-cal
    v-model:selected-date="compSelectedDate"
    v-model:active-view="compActiveView"
    :time-from="6 * 60"
    :time-to="20 * 60"
    :time-step="30"
    :snap-to-time="15"
    :events="events"
    :time="true"
    :show-all-day-events="'short'"
    :disable-views="['years', 'year', 'month']"
    locale="pt-br"
    hide-view-selector
    :time-cell-height="30"
    :editable-events="{
      title: true,
      drag: false,
      resize: false,
      delete: true,
      create: true,
    }"
    :on-event-create="onEventCreate"
    @event-drag-create="activeMenu"
    @event-delete="eventDelete"
    @mouseup="onMouseUp"
  >
    <template #title="{ view }">
      <span v-if="view.id === 'week'" class="text-white">
        {{ view.startDate.format("MMMM YYYY") }}
      </span>

      <span v-if="view.id === 'day'" class="text-white">
        {{ view.startDate.format("dddd D MMMM (YYYY)") }}
      </span>
    </template>

    <template #weekday-heading="{ heading }">
      <div class="d-flex flex-column">
        <span
          :class="heading.today ? 'text-h5 font-weight-bold' : 'text-h6'"
          class="text-white"
        >
          {{ heading.label }}
        </span>

        <span
          :class="heading.today ? 'font-weight-bold' : ''"
          class="text-white"
        >
          {{ dayjs(heading.date).format("DD") }}
        </span>
      </div>
    </template>

    <template #arrow-prev>
      <v-btn
        icon="mdi-chevron-left"
        variant="plain"
        density="compact"
        color="white"
        @click="$emit('previousPage')"
      />
    </template>

    <template #arrow-next>
      <v-btn
        icon="mdi-chevron-right"
        variant="plain"
        density="compact"
        color="white"
        @click="$emit('nextPage')"
      />
    </template>

    <template #event="{ event }">
      <v-list-item
        v-if="event.os"
        :title="event.title"
        density="compact"
        class="d-flex justify-start text-caption bg-transparent"
        target="_blank"
        :to="{
          name: 'service-order-id',
          params: { id: event.os },
        }"
      />

      <v-list-item
        v-else
        :title="event.title"
        density="compact"
        class="d-flex justify-start text-caption bg-transparent"
      />
    </template>
  </vue-cal>

  <ScheduleMenu
    v-if="selectedEvent"
    ref="scheduleMenu"
    :event="selectedEvent"
    @close="closeCreationDialog"
    @cancel="cancelEventCreation"
  />
</template>

<style>
:root {
  --resizing-schedule-color: #0000001e;
}

.vuecal__title-bar {
  background-color: transparent;
}

.vuecal__header {
  border-radius: 20px 20px 0px 0px;
  background-color: #1976d2;
}

.vuecal__heading {
  height: 60px;
}

.vuecal__time-column {
  width: 80px;
  justify-items: center;
}

.vuecal__time-cell {
  display: flex;
}

.vuecal__time-cell-label {
  align-content: center;
  color: #1976d2;
}

.vuecal__event {
  color: currentColor;
  background-color: var(--schedule);
  border-left: 1px solid var(--border-schedule-color);
}

.vuecal__all-day {
  border-bottom: 1px solid #ddddddad;
}

.vuecal__all-day-text {
  width: 80px !important;
  height: 30px;
  color: #1976d2;
  border-bottom: 0px solid #dddddd86;
  align-items: center;
  justify-content: center;
}

.vuecal__cell--today {
  background-color: transparent;
}

.vuecal__event--resizing {
  background-color: var(--resizing-schedule-color);
}

.vuecal__cell--selected {
  background-color: #1976d23b;
}
</style>
d
