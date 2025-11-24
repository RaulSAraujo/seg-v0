<script setup lang="ts">
const emit = defineEmits(["save"]);

const menu = ref<boolean>(false);
const date = ref<string[] | null>(null);

const dayjs = useDayjs();

const save = (selectDate: unknown) => {
  const daysOfWeek = getWeekDays(`${selectDate}`);

  menu.value = false;

  emit(
    "save",
    `${dayjs(daysOfWeek[0]).format("DD/MM/YYYY")} - ${dayjs(
      daysOfWeek[daysOfWeek.length - 1]
    ).format("DD/MM/YYYY")}`
  );
};

const getWeekDays = (selectedDate: string): string[] => {
  const startOfWeek = dayjs(selectedDate).startOf("week"); // Início da semana
  const weekDays: string[] = [];

  for (let i = 0; i < 7; i++) {
    weekDays.push(startOfWeek.add(i, "day").format("YYYY-MM-DD")); // Obtém o nome do dia
  }

  return weekDays;
};
</script>

<template>
  <v-text-field
    id="daysOfWeekInput"
    v-maska="'##/##/#### - ##/##/####'"
    density="compact"
    color="primary"
    variant="outlined"
    label="Selecione um dia da semana"
    clearable
    hide-details
    @click="menu = true"
  >
    <template #prepend-inner>
      <v-menu v-model="menu" :close-on-content-click="false">
        <template #activator="{ props }">
          <v-icon color="primary" v-bind="props">mdi-calendar</v-icon>
        </template>

        <v-confirm-edit v-model="date" @save="save">
          <template #default="{ model: proxyModel, actions }">
            <v-date-picker v-model="proxyModel.value" rounded="xl">
              <template #actions>
                <component :is="actions" />
              </template>
            </v-date-picker>
          </template>
        </v-confirm-edit>
      </v-menu>
    </template>
  </v-text-field>
</template>
