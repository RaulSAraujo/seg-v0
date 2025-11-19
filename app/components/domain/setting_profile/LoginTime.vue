<script setup lang="ts">
import type {
  Row,
  LoginTimeRange,
  Day,
} from "~/interfaces/Group";

const props = defineProps<{
  idGroup: number;
  loginTimeRange: LoginTimeRange;
}>();

const emit = defineEmits(["updateLoginTime"]);

const dialog = ref(false);

const days = ref([]);

const loginTime = ref("");

const logoutTime = ref("");

type Schedule = {
  [key: string]: {
    day: string;
    login_time: string;
    logout_time: string;
  };
};

const login_time_range = ref<Schedule>({
  Monday: {
    day: "Segunda-feira",
    login_time: "00:00",
    logout_time: "00:00",
  },
  Tuesday: {
    day: "Terça-feira",
    login_time: "00:00",
    logout_time: "00:00",
  },
  Wednesday: {
    day: "Quarta-feira",
    login_time: "00:00",
    logout_time: "00:00",
  },
  Thursday: {
    day: "Quinta-feira",
    login_time: "00:00",
    logout_time: "00:00",
  },
  Friday: {
    day: "Sexta-feira",
    login_time: "00:00",
    logout_time: "00:00",
  },
  Saturday: {
    day: "Sábado",
    login_time: "00:00",
    logout_time: "00:00",
  },
});

Object.entries(props.loginTimeRange).forEach(([key, value]) => {
  if (login_time_range.value[key]) {
    login_time_range.value[key].login_time = (value as Day).login_time;
    login_time_range.value[key].logout_time = (value as Day).logout_time;
  }
});

const { $customFetch } = useNuxtApp();

const loading = useLoadingIndicator();

const save = async () => {
  days.value.forEach((day: string) => {
    if (login_time_range.value[day]) {
      login_time_range.value[day].login_time = `${loginTime.value}:00`;
      login_time_range.value[day].logout_time = `${logoutTime.value}:00`;
    }
  });

  loading.start();

  try {
    const { result } = await $customFetch<{ result: Row[] }>("group", {
      method: "PUT",
      body: {
        id: props.idGroup,
        login_time_range: [login_time_range.value],
      },
    });

    $toast().success("Registro atualizado com sucesso.");

    emit("updateLoginTime", result[0]?.login_time_range[0]);

    dialog.value = false;
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  }

  loading.finish();
};

const close = () => {
  days.value = [];

  loginTime.value = "";

  logoutTime.value = "";
};
</script>

<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-top-transition"
    width="600px"
    @after-leave="close"
  >
    <template #activator="{ props: activator }">
      <v-btn
        v-bind="activator"
        icon="mdi-clock-edit-outline"
        variant="plain"
        size="small"
        density="comfortable"
      />
    </template>

    <v-card rounded="xl" title="INTERVALO DE LOGIN">
      <template #text>
        <v-row>
          <v-col cols="12">
            <v-btn-toggle
              v-model="days"
              density="compact"
              multiple
              color="blue"
            >
              <v-btn
                v-for="(day, index) in login_time_range"
                :key="index"
                :value="index"
              >
                {{ day.day.replace("-feira", "") }}
              </v-btn>
            </v-btn-toggle>
          </v-col>

          <v-col cols="6">
            <UiTextField
              v-model="loginTime"
              v-maska="'##:##'"
              label="Horário de inicio"
              placeholder="__:__"
              prepend-inner-icon="mdi-clock"
            />
          </v-col>

          <v-col cols="6">
            <UiTextField
              v-model="logoutTime"
              v-maska="'##:##'"
              label="Horário de fim"
              placeholder="__:__"
              prepend-inner-icon="mdi-clock"
            />
          </v-col>

          <v-list>
            <v-list-item
              v-for="item of login_time_range"
              :key="item.day"
              :title="item.day"
              :subtitle="`${item.login_time} - ${item.logout_time}`"
            />
          </v-list>
        </v-row>
      </template>

      <template #actions>
        <v-spacer />

        <v-btn
          class="mb-2"
          color="primary"
          width="8vw"
          variant="flat"
          text="SALVAR"
          @click="save"
        />
        <v-spacer />
      </template>
    </v-card>
  </v-dialog>
</template>
