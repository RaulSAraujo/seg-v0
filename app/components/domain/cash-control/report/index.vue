<script lang="ts" setup>
import Submit from "./Submit.vue";

defineOptions({
  name: "CashControlReport",
});

const dayjs = useDayjs();

const date = ref("");
const dialog = useState<boolean>("active-report-cash-control", () => false);

const saveDate = (event: string) => {
  date.value = `${dayjs(event[0]).format("DD/MM/YYYY")} - ${dayjs(
    event[event.length - 1]
  ).format("DD/MM/YYYY")}`;
};
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" width="300px">
    <template #default="{ isActive }">
      <v-card title="RELATÓRIO" rounded="xl">
        <template #text>
          <UiDatePicker
            v-model="date"
            label="Informe o período do relatório"
            multiple="range"
            :clearable="false"
            @save="saveDate($event)"
          />
        </template>

        <template #actions>
          <v-spacer />

          <Submit :date="date" @close="isActive.value = false" />

          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
