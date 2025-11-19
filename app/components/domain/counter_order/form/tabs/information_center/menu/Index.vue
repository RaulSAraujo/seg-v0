<script lang="ts" setup>
defineOptions({
  name: "CounterOrderInformationCenterMenu",
});

interface Comment {
  id: number;
  user_id: number;
  description: string;
  created_at: Date | string;
}

const comment = useState<Comment | null>("comment", () => null);

const snackbar = useState<boolean>("active-delete", () => false);

const dialog = useState<boolean>("active-edit", () => false);

const contextMenu = ref(false);

const x = ref(0);
const y = ref(0);

const { data } = useAuth();

const dayjs = useDayjs();

const disabled = computed(() => {
  if (data.value?.groupId == 1) return false;

  if (
    comment.value?.user_id == data.value?.id &&
    dayjs().diff(comment.value?.created_at, "minutes") <= 10
  ) {
    return false;
  }

  return true;
});

defineExpose({ contextMenu, x, y });
</script>

<template>
  <v-menu
    v-model="contextMenu"
    location-strategy="connected"
    :target="[x, y]"
    scroll-strategy="close"
  >
    <v-card min-width="300">
      <v-list>
        <v-list-item
          title="Editar"
          prepend-icon="mdi-pencil"
          :disabled="disabled"
          class="text-primary"
          @click="dialog = true"
        />

        <v-list-item
          title="Deletar"
          prepend-icon="mdi-delete"
          :disabled="disabled"
          class="text-red"
          @click="snackbar = true"
        />
      </v-list>
    </v-card>
  </v-menu>
</template>
