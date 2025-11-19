<script lang="ts" setup>
import Submit from "./Submit.vue";
import SincTray from "./SincTray.vue";
import BudgetForm from "./BudgetForm.vue";

defineOptions({
  name: "SacGroupFloating",
});

defineProps<{
  methodRest: "POST" | "PUT";
}>();
</script>

<template>
  <div>
    <Submit :method-rest="methodRest" />

    <BudgetForm v-if="methodRest === 'PUT'" />

    <SincTray v-if="methodRest === 'PUT'" />
  </div>
</template>
