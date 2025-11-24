<script lang="ts" setup>
import type { GroupID } from "~/interfaces/Group";

defineProps<{
  label: string;
  description: string;
  backUrl: string;
  index: number;
  length: number;
  route: GroupID;
  marginLeft: number;
}>();

const snackbar = ref<boolean>(false);
const currentTime = ref(0);

const handleClick = (event: MouseEvent) => {
  if (event.ctrlKey) {
    snackbar.value = true;
  }
};
</script>

<template>
  <v-row dense class="pa-0 ma-0">
    <v-col tag="div" class="d-flex align-center border-e-sm border-b-sm">
      <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition">
        <div
          :class="`ml-${marginLeft}`"
          :style="`
            white-space: nowrap !important; 
            overflow: hidden !important; 
            text-overflow: ellipsis !important;
            width: 650px;
            `"
        >
          <span @click="handleClick">
            {{ `${label} ${description}` }}
          </span>
        </div>
      </v-lazy>
    </v-col>

    <v-col
      v-for="(method, indexMethod) in route.methods"
      :key="method.id"
      cols="1"
      class="d-flex justify-center align-center border-b-sm"
      :class="`${indexMethod + 1 < route.methods.length ? 'border-e-sm' : ''}`"
    >
      <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition">
        <v-checkbox
          v-if="!method.fake_method"
          v-model="method.has_permission"
          density="compact"
          color="primary"
          base-color="primary"
          hide-details
        />

        <v-icon v-else icon="mdi-block-helper" color="grey" size="20" />
      </v-lazy>
    </v-col>
  </v-row>

  <v-snackbar
    v-model="snackbar"
    rounded="lg"
    timeout="2000"
    :timer="`${currentTime}`"
    variant="flat"
    color="blue"
    location="top"
    content-class="border-thin"
  >
    <div class="text-subtitle-1">Back-url:</div>

    <p class="text-caption text-grey-lighten-2">
      {{ backUrl }}
    </p>
  </v-snackbar>
</template>
