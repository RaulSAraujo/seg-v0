<script setup lang="ts">
useHead({
  titleTemplate: `Perfil - %s`,
});

definePageMeta({
  path: "/configuracoes/usuarios/perfil",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">PERFIL</span>

    <UiFilter>
      <template #button-create>
        <SettingProfileCreation />
      </template>
    </UiFilter>

    <UiTable multi-sort>
      <template #item.action="{ item }">
        <SettingProfileEdit :id="item.id" :group-name="item.name" />

        <UiDelete :id="item.id" />
      </template>

      <template #item.access_restriction="{ item }">
        <UiCheckIcon
          :id="item.id"
          :value="item.access_restriction"
          attr="access_restriction"
          @update-value="item.access_restriction = $event"
        />
      </template>

      <template #item.login_time_range="{ item }">
        <SettingProfileLoginTime
          :id-group="item.id"
          :login-time-range="item.login_time_range[0] || {}"
          @update-login-time="item.login_time_range[0] = $event"
        />
      </template>
    </UiTable>
  </div>
</template>
