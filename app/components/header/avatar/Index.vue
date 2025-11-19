<script setup lang="ts">
const { data: user } = useAuth();

const { $config } = useNuxtApp();
</script>

<template>
  <v-menu location="bottom" transition="slide-y-transition" offset="12 20">
    <template #activator="{ props }">
      <ClientOnly>
        <v-avatar
          v-bind="props"
          :image="`${$config.public.base_url_file_manager}/user-photos?userId=${user?.id}&type=image`"
          size="50"
          class="mx-5"
          color="grey-darken-1"
          style="cursor: pointer"
        />

        <template #fallback>
          <v-skeleton-loader
            width="50px"
            color="transparent"
            type="avatar"
            class="ml-4 mr-6"
          />
        </template>
      </ClientOnly>
    </template>

    <LazyHeaderAvatarList hydrate-on-visible />
  </v-menu>
</template>
