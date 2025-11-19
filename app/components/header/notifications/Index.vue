<script setup lang="ts">
import type { Notifications } from "~/interfaces/Notifications";

const { data: user } = useAuth();

const { $config } = useNuxtApp();

const notifications = useState<Notifications[]>("Notifications", () => []);

useWebSocket(
  `${$config.public.base_url_web_socket}?user_id=${user.value?.id}&group_id=${user.value?.groupId}`,
  {
    autoReconnect: true,
    onMessage(ws, event) {
      const json = JSON.parse(event.data) as {
        data: Notifications[];
        event: string;
      };

      if (json.event == "previousNotifications") {
        notifications.value = [];

        notifications.value.push(...json.data.sort((a, b) => b.id - a.id));
      }

      if (json.event == "newNotification") {
        notifications.value.splice(0, 0, ...json.data);
      }
    },
  }
);

const { $customFetch } = useNuxtApp();

const readNotifier = (id: number) => {
  $customFetch(`notifications/readed`, {
    baseURL: $config.public.base_url_web_socket,
    method: "PUT",
    body: {
      user_id: user.value?.id,
      notification_id: id,
    },
  });
};
</script>

<template>
  <v-menu
    v-if="notifications.length > 0"
    offset="20 140"
    location="bottom"
    transition="slide-y-transition"
    :close-on-content-click="false"
  >
    <template #activator="{ props }">
      <v-badge
        color="blue"
        bordered
        :content="notifications.length"
        offset-y="10"
        offset-x="10"
      >
        <v-btn v-bind="props" icon="mdi-bell" variant="plain" />
      </v-badge>
    </template>

    <v-sheet width="350px" class="rounded-xl">
      <v-row
        no-gutters
        justify="space-between"
        align="center"
        class="mx-4 my-2"
      >
        <span class="text-body-1">NOTIFICAÇÕES</span>

        <LazyHeaderNotificationsButtonReadAll
          hydrate-on-visible
          @read-notifier="readNotifier($event)"
        />
      </v-row>

      <v-divider />

      <LazyHeaderNotificationsList
        hydrate-on-visible
        @read-notifier="readNotifier($event)"
      />
    </v-sheet>
  </v-menu>

  <v-btn v-else variant="plain" icon="mdi-bell" />
</template>
