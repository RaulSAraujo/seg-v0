<script lang="ts" setup>
import type {
  Puppeteer,
  Automation,
} from "~/interfaces/Puppeteer";

const emit = defineEmits(["new", "close"]);

const selectedGroup = ref<Puppeteer | null>(null);

const selectedAutomation = ref<Automation | null>(null);

const file = ref<File | null>(null);

const computedQuery = computed(() => {
  if (
    selectedAutomation.value?.type == "input" ||
    selectedAutomation.value?.type == "checkbox" ||
    selectedAutomation.value?.type == "file/input"
  ) {
    const newQuery = Object.entries(selectedAutomation.value?.query || {}).map(
      ([key, value]) => {
        return { label: key, value };
      }
    );
    return newQuery;
  }

  return null;
});

const save = () => {
  emit("close");

  emit("new", {
    automation: selectedAutomation.value,
    file: file.value,
    query: computedQuery.value
      ?.map((param) => (param.value ? `${param.label}=${param.value}` : ""))
      .join("&"),
  });
};
</script>

<template>
  <v-dialog width="500" persistent>
    <v-card title="NOVA AUTOMAÇÃO" rounded="lg">
      <template #text>
        <v-row dense>
          <v-col cols="12">
            <PuppeteerInputSelectGroup v-model="selectedGroup" />
          </v-col>

          <v-col v-if="selectedGroup" cols="12">
            <v-expand-transition>
              <PuppeteerInputSelectAutomation
                v-model="selectedAutomation"
                :automations="selectedGroup.automations"
              />
            </v-expand-transition>
          </v-col>

          <v-col
            v-if="
              (selectedAutomation != null &&
                selectedAutomation.type == 'file') ||
              (selectedAutomation != null &&
                selectedAutomation.type == 'file/input')
            "
            cols="12"
          >
            <PuppeteerInputSelectFiles v-model="file" />
          </v-col>

          <v-col
            v-if="
              (selectedAutomation != null &&
                selectedAutomation.type == 'input') ||
              (selectedAutomation != null &&
                selectedAutomation.type == 'file/input')
            "
            cols="12"
          >
            <UiTextField
              v-for="(query, index) in computedQuery"
              :key="index"
              v-model="query.value"
              :label="query.label"
            />
          </v-col>

          <v-col
            v-if="
              selectedAutomation != null &&
              selectedAutomation.type == 'checkbox'
            "
            cols="12"
          >
            <UiSwitch
              v-for="(query, index) in computedQuery"
              :key="index"
              v-model="query.value"
              :label="query.label"
            />
          </v-col>
        </v-row>

        <PuppeteerExample
          :excel-route-param="selectedAutomation?.excel_route_param"
        />
      </template>

      <template #actions>
        <v-spacer />

        <v-btn
          class="mb-2"
          base-color="red"
          text="CANCELAR"
          @click="$emit('close')"
        />

        <v-btn class="mb-2" base-color="primary" text="INICIAR" @click="save" />
      </template>
    </v-card>
  </v-dialog>
</template>
