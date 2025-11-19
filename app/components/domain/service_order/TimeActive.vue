<script lang="ts" setup>
const snackbar = ref(false);

const router = useRouter();
const timeoutDuration = 300; // Tempo em segundos
const timeLeft = ref(timeoutDuration);
let timeout: NodeJS.Timeout;
let countdownInterval: NodeJS.Timeout;

const redirectToService = () => {
  router.push({
    name: "service-order",
  });
};

const resetTimer = () => {
  clearTimeout(timeout);

  clearInterval(countdownInterval);

  timeLeft.value = timeoutDuration;

  timeout = setTimeout(redirectToService, timeoutDuration * 1000); // 4 minutos em milissegundos

  countdownInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value -= 1; // Reduz um segundo do contador
    }
  }, 1000);
};

const events = [
  "click",
  "mousemove",
  "mousedown",
  "scroll",
  "keypress",
  "load",
];

onMounted(() => {
  events.forEach((event) => window.addEventListener(event, resetTimer));

  // Inicia o timer na primeira vez
  resetTimer();
});

// Limpa os event listeners e timers quando o componente é destruído
onUnmounted(() => {
  events.forEach((event) => window.removeEventListener(event, resetTimer));

  clearTimeout(timeout);

  clearInterval(countdownInterval);
});

watch(
  () => timeLeft.value,
  (value) => {
    if (value < 60) {
      snackbar.value = true;
    } else {
      snackbar.value = false;
    }
  }
);
</script>

<template>
  <v-snackbar
    v-model="snackbar"
    rounded="lg"
    variant="flat"
    location="top"
    color="red"
    :timeout="-1"
  >
    Você esta ai ? Em {{ timeLeft }} você será redirecionado.
  </v-snackbar>
</template>
