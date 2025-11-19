<script lang="ts" setup>
import type { Prompt } from "~/interfaces/Puppeteer";

defineProps<{
  prompts: Prompt[];
}>();

defineEmits(["open-dialog", "stop-sse"]);

const tab = ref<number | null>(null);

const scrollContainer = ref();

defineExpose({ scrollContainer });
</script>

<template>
  <v-sheet rounded="xl" min-height="250" dark>
    <v-container fluid class="mb-n4">
      <v-tabs
        v-model="tab"
        dark
        hide-slider
        active-class="transparent"
        :mobile-breakpoint="0"
      >
        <v-tab
          v-for="(prompt, index) in prompts"
          :key="index"
          active-class="black rounded-t-xl"
          class="rounded-t-xl"
        >
          {{ prompt.title }}

          <v-btn
            small
            icon="mdi-close"
            color="grey"
            class="ml-4"
            variant="plain"
            density="compact"
            @click="$emit('stop-sse', index)"
          />
        </v-tab>

        <v-btn
          class="ml-2 my-auto"
          icon="mdi-plus"
          variant="plain"
          color="white"
          density="compact"
          @click="$emit('open-dialog')"
        />
      </v-tabs>
    </v-container>

    <v-tabs-window v-model="tab" dark class="rounded-b-xl rounded-t-sm">
      <v-tabs-window-item v-for="(prompt, index) in prompts" :key="index">
        <v-sheet
          ref="scrollContainer"
          color="black"
          rounded="t-0 b-xl"
          height="72vh"
          style="overflow-y: scroll"
        >
          <v-container fluid>
            <div v-for="(msg, i) in prompt.sseMessage" :key="i">
              <v-row no-gutters justify="space-between" align="center">
                <span class="cmdText">
                  {{ msg.message }}
                </span>

                <span class="timerText">
                  {{ msg?.timer }}
                </span>
              </v-row>
            </div>

            <PuppeteerAnimationIcon />
          </v-container>
        </v-sheet>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-sheet>
</template>

<style scoped>
.cmdText {
  font-family: "Space Mono";
  font-size: 12px;
  letter-spacing: 1px;
  color: white;
  background-color: black;
}

.timerText {
  font-family: "Space Mono";
  font-size: 12px;
  letter-spacing: 1px;
  color: grey;
  background-color: black;
}

::-webkit-scrollbar {
  width: 0px;
  height: 15px;
  overflow: scroll;
}

::-webkit-scrollbar-track {
  background: #1e1e1e;
  border-left: 1px solid #2c2c2c00;
}

::-webkit-scrollbar-thumb {
  background: #313030;
  border: solid 3px #1e1e1e;
  border-radius: 7px;
}

::-webkit-scrollbar-thumb:hover {
  background: #353535;
}
</style>
