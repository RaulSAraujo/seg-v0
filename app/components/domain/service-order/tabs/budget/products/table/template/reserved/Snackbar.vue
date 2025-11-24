<script lang="ts" setup>
defineEmits(["close", "update"]);

const currentTime = ref(0);
</script>

<template>
  <v-snackbar
    rounded="lg"
    timeout="6000"
    :timer="`${currentTime}`"
    variant="flat"
    color="blue"
    location="top"
    content-class="border-thin"
  >
    <div class="text-subtitle-1">Deseja atualizar ?</div>

    <template #actions>
      <v-btn color="white" variant="plain" @click="$emit('close')"> Não </v-btn>

      <v-btn
        color="white"
        variant="plain"
        @click="
          $emit('update');

          $emit('close');
        "
      >
        Sim
      </v-btn>
    </template>
  </v-snackbar>
</template>
