<script setup lang="ts">
defineProps<{
  label: string;
  clearable: boolean | undefined;
  alt?: string;
  hideDetails?: boolean | "auto" | undefined;
}>();

const emit = defineEmits(["date", "clearDate"]);

const month = ref<string | null>(null);

const menu = ref<boolean>(false);

const viewMode = ref<"year" | "month" | "months" | undefined>("year");
const selectedYear = ref();
const selectedMonth = ref();

const selectedDate = computed(() => {
  return selectedYear.value !== undefined && selectedMonth.value !== undefined
    ? new Date(selectedYear.value, selectedMonth.value)
    : null;
});

function updateViewMode(mode: string) {
  viewMode.value = mode === "year" ? "year" : "months";
}

function updateYear(year: string) {
  selectedYear.value = year;
}

function updateMonth(month: string) {
  selectedMonth.value = month;
}

const dayjs = useDayjs();

watch(
  () => selectedDate.value,
  () => {
    const first = dayjs(selectedDate.value).startOf("month").format("YYYY-MM-DD");
    const end = dayjs(selectedDate.value).endOf("month").format("YYYY-MM-DD");

    month.value = dayjs(selectedDate.value).format("MMMM/YYYY");

    emit("date", [first, end]);
  }
);

watch(
  () => month.value,
  (value) => {
    if (!value) {
      month.value = null;

      emit("clearDate");
    }
  }
);

defineExpose({ month });
</script>

<template>
  <v-text-field
    :id="alt || label"
    v-model="month"
    density="compact"
    color="primary"
    variant="outlined"
    :label="label"
    :clearable="clearable"
    :hide-details="hideDetails || true"
    readonly
    @click="menu = true"
  >
    <template #prepend-inner>
      <v-menu v-model="menu" :close-on-content-click="false">
        <template #activator="{ props }">
          <v-icon color="primary" v-bind="props">mdi-calendar</v-icon>
        </template>

        <v-date-picker
          rounded="xl"
          :view-mode="viewMode"
          hide-header
          @update:year="updateYear"
          @update:view-mode="updateViewMode"
          @update:month="updateMonth"
        />
      </v-menu>
    </template>
  </v-text-field>
</template>
