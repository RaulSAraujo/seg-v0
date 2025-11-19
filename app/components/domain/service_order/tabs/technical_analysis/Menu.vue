<script lang="ts" setup>
interface Comment {
  id: number;
  user_id: number;
  description: string;
  created_at: Date | string;
}

const comment = useState<Comment | null>("comment", () => null);

const snackbar = useState<boolean>("open-delete-technical", () => false);

const active = useState<boolean>("open-edit-technical", () => false);

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
    :target="[x, y]"
    scroll-strategy="close"
    location-strategy="connected"
  >
    <v-card min-width="300" rounded="xl">
      <v-list>
        <v-list-item
          title="Editar"
          prepend-icon="mdi-pencil"
          :disabled="disabled"
          class="text-primary"
          @click="active = true"
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
