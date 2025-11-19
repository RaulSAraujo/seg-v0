<script lang="ts" setup>
const { signOut } = useAuth();
</script>

<template>
  <v-list lines="one" density="compact" nav class="rounded-xl">
    <!-- <v-list-item :to="{ name: 'user-notifications' }">
      <template #prepend>
        <v-icon icon="mdi-bell-cog" />
      </template>

      <v-list-item-title class="text-uppercase">
        NOTIFICAÇÕES
      </v-list-item-title>
    </v-list-item> -->

    <v-list-item :to="{ name: 'profile' }">
      <template #prepend>
        <v-icon icon="mdi-account-box" />
      </template>

      <v-list-item-title class="text-uppercase"> PERFIL </v-list-item-title>
    </v-list-item>

    <v-list-item @click="signOut()">
      <template #prepend>
        <v-icon icon="mdi-exit-to-app" />
      </template>

      <v-list-item-title>SAIR</v-list-item-title>
    </v-list-item>
  </v-list>
</template>
