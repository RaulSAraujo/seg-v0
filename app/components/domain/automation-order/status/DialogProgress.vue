<script lang="ts" setup>
defineProps<{
  progress: string;
}>();
</script>

<template>
  <v-dialog width="250" persistent>
    <v-card rounded="xl">
      <div class="pa-5 d-flex flex-column justify-center align-center">
        <v-progress-circular
          :model-value="progress"
          :rotate="360"
          :size="100"
          :width="15"
          color="teal"
        >
          <template #default> {{ progress }} % </template>
        </v-progress-circular>

        <span class="mt-2 text-caption">Carregando, aguarde...</span>
      </div>
    </v-card>
  </v-dialog>
</template>
