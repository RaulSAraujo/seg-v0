<script lang="ts" setup>
defineEmits(["open"]);
</script>

<template>
  <v-row justify="center" align="center" class="my-16">
    <v-btn height="250" rounded @click="$emit('open')">
      <v-row>
        <v-col cols="12">
          <v-icon size="100">mdi-robot-excited</v-icon>
        </v-col>
        <v-col cols="12">
          <p>Click aqui para iniciar uma automação</p>
        </v-col>
      </v-row>
    </v-btn>
  </v-row>
</template>
