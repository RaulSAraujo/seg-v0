<script setup lang="ts">
const { handleSubmit } = useForm({
  validationSchema: {
    username(value: string) {
      if (value?.length > 0) return true;

      return "Username required.";
    },
    password(value: string) {
      if (value?.length > 0) return true;

      return "Password required.";
    },
  },
});

const username = useField("username");
const password = useField("password");
const showPassaword = ref(false);

const loading = ref(false);

const { signIn } = useAuth();
const submit = handleSubmit(async (values) => {
  try {
    loading.value = true;

    await signIn(values, {
      callbackUrl: "/inicio",
      redirect: true,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    $toast().error(`Erro ao efetuar login, tente novamente.`);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-form class="mt-8" @submit.prevent="submit">
    <v-text-field
      v-model="username.value.value"
      label="Usuario:"
      outlined
      :error-messages="username.errorMessage.value"
      required
      dark
      color="primary"
    />

    <v-text-field
      v-model="password.value.value"
      label="Senha:"
      outlined
      :error-messages="password.errorMessage.value"
      required
      dark
      color="primary"
      :type="showPassaword ? 'text' : 'password'"
      :append-inner-icon="showPassaword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="showPassaword = !showPassaword"
    />

    <v-row no-gutters justify="center" class="mx-10 mt-6">
      <v-btn block height="35" color="primary" type="submit" :loading="loading">
        ENTRAR
      </v-btn>
    </v-row>
  </v-form>
</template>
