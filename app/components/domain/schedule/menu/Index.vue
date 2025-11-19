<script lang="ts" setup>
import type { Event } from "~/interfaces/ServiceOrderSchedule";

defineOptions({
  name: "ScheduleMenu",
});

const props = defineProps<{
  event: Event;
}>();

const emit = defineEmits(["close", "cancel"]);

const eventComp = computed(() => props.event);

const clickOnSave = ref(false);

const contextMenu = ref(false);

const x = ref(0);
const y = ref(0);

watch(
  () => [contextMenu.value, clickOnSave.value],
  () => {
    if (clickOnSave.value == true) return emit("close");

    if (contextMenu.value == false) emit("cancel");
  }
);

defineExpose({ contextMenu, x, y });
</script>

<template>
  <v-menu
    v-model="contextMenu"
    location-strategy="connected"
    :target="[x, y]"
    scroll-strategy="close"
    :close-on-content-click="false"
  >
    <v-card width="350" rounded="xl">
      <v-sheet color="primary" class="pa-5">
        <UiTextField
          v-model="eventComp.title"
          v-maska="'Ax'"
          label="Titulo"
          variant="solo"
          bg-color="white"
        />
      </v-sheet>

      <div class="pa-1">
        <ScheduleMenuTime
          :start="`${eventComp?.start ?? ''}`"
          :end="`${eventComp?.end ?? ''}`"
        />

        <v-row dense class="pa-5">
          <v-col cols="12">
            <ServiceOrderTabsScheduleCreationTechnician
              v-model="eventComp.technical"
            />
          </v-col>

          <v-col cols="12">
            <ServiceOrderTabsScheduleCreationMotive
              v-model="eventComp.motive"
            />
          </v-col>

          <v-col cols="12">
            <UiTextField v-model="eventComp.observation" label="Observação" />
          </v-col>
        </v-row>
      </div>

      <template #actions>
        <v-spacer />

        <ScheduleMenuButtonSave :event="eventComp" @save="clickOnSave = true" />

        <v-spacer />
      </template>
    </v-card>
  </v-menu>
</template>
