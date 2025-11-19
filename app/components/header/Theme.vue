<script setup lang="ts">
const theme = useTheme();
const { data: user } = useAuth();
const { $customFetch } = useNuxtApp();

async function toggleTheme() {
  try {
    theme.toggle();

    // Atualiza no banco de dados
    await $customFetch("/user/theme", {
      method: "PUT",
      body: {
        id: user.value?.id,
        theme: !theme.current.value.dark,
      },
    });

    // Atualiza no auth interno da sessão do usuário
    await $api("/api/auth/session", {
      method: "PUT",
      body: {
        id: user.value?.id,
        theme: !theme.current.value.dark,
      },
    });

    // Atualiza o cookie
    const userCookie = useCookie("auth.theme");
    userCookie.value = `${theme.current.value.dark}`;

    // Atualiza os estilos globais do css
    if (!theme.current.value.dark) {
      document.documentElement.style.setProperty("--track-color", "#ffffff");
      document.documentElement.style.setProperty(
        "--track-color-hover",
        "#b7b4b4"
      );
      document.documentElement.style.setProperty("--thumb-color", "#d6d5d5");
      document.documentElement.style.setProperty("--border-color", "#ffffff");
      document.documentElement.style.setProperty("--schedule", "#ffffff30");
      document.documentElement.style.setProperty(
        "--border-schedule-color",
        "#e5e5e5"
      );
    } else {
      document.documentElement.style.removeProperty("--track-color");
      document.documentElement.style.removeProperty("--track-color-hover");
      document.documentElement.style.removeProperty("--thumb-color");
      document.documentElement.style.removeProperty("--border-color");
      document.documentElement.style.removeProperty("--schedule");
      document.documentElement.style.removeProperty("--border-schedule-color");
    }
  } catch (error) {
    const err = error as { statusText: string; message: string };

    return $toast().error(`${err.statusText ?? err.message}`);
  }
}

onMounted(() => {
  // Verifica e ja altera para o tema do usuário
  theme.change(user.value?.theme ? "light" : "dark");

  // Atualiza os estilos globais do css
  if (!theme.current.value.dark) {
    document.documentElement.style.setProperty("--track-color", "#ffffff");
    document.documentElement.style.setProperty(
      "--track-color-hover",
      "#b7b4b4"
    );
    document.documentElement.style.setProperty("--thumb-color", "#d6d5d5");
    document.documentElement.style.setProperty("--border-color", "#ffffff");
    document.documentElement.style.setProperty("--schedule", "#ffffff30");
    document.documentElement.style.setProperty(
      "--border-schedule-color",
      "#e5e5e5"
    );
  } else {
    document.documentElement.style.removeProperty("--track-color");
    document.documentElement.style.removeProperty("--track-color-hover");
    document.documentElement.style.removeProperty("--thumb-color");
    document.documentElement.style.removeProperty("--border-color");
    document.documentElement.style.removeProperty("--schedule");
    document.documentElement.style.removeProperty("--border-schedule-color");
  }
});
</script>

<template>
  <v-btn
    icon="mdi-weather-night"
    :color="!theme.global.current.value.dark ? '' : 'blue'"
    variant="plain"
    @click="toggleTheme()"
  />
</template>
