<script setup lang="ts">
import type { AddUserActive } from "~/interfaces/ServiceOrder";

useHead({
  titleTemplate: `Ordem de serviço - %s`,
});

definePageMeta({
  path: "/ordem-servico",
});

const snackbar = ref<boolean>(false);

const userActive = ref({
  id: 0,
  userName: "",
  timeActive: "",
  next: false,
});

onBeforeRouteLeave(async (to, from, next) => {
  if (to.name === "service-order-id") {
    const { $customFetch } = useNuxtApp();

    const res = await $customFetch<AddUserActive>(
      "service-order/add-user-active",
      {
        method: "POST",
        body: {
          id: to.params.id,
        },
      }
    );

    if (res.result[0] === 1) {
      if (userActive.value.next) {
        next();
      }

      snackbar.value = true;
      userActive.value.id = parseInt(to.params.id as string);
      userActive.value.userName = res.user_name;
      userActive.value.timeActive = res.time_active;

      next(false);
    } else {
      next();
    }
  } else {
    next();
  }
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">ORDEM DE SERVIÇO</span>

    <ServiceOrderFilter />

    <ServiceOrderTable />

    <ServiceOrderUserActive
      v-model="snackbar"
      :params-id="userActive.id"
      :user-name="userActive.userName"
      :time-active="userActive.timeActive"
      @close="snackbar = false"
      @next="userActive.next = true"
    />
  </div>
</template>
