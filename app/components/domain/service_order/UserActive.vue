<script lang="ts" setup>
const props = defineProps<{
  paramsId: number;
  userName: string;
  timeActive: string;
}>();

const currentTime = ref(0);

const { push } = useRouter();

const disabledSave = useState<boolean>("disabled-save-os", () => false);

function submit() {
  disabledSave.value = true;

  emit("next");

  push({
    name: "service-order-id",
    params: { id: props.paramsId },
  });
}

const emit = defineEmits(["close", "next"]);
</script>

<template>
  <v-snackbar
    rounded="lg"
    timeout="6000"
    :timer="`${currentTime}`"
    variant="flat"
    color="red"
    location="top"
    content-class="border-thin"
  >
    <div class="text-subtitle-1">
      Usuário(a) {{ userName.substring(0, 20) }}... esta ativo(a) há
      {{ Math.ceil(parseFloat(timeActive)) }} min
    </div>

    <p class="text-caption text-grey-lighten-2">
      Algumas funcionalidades podem estar indisponíveis, deseja prosseguir?
    </p>

    <template #actions>
      <v-btn color="white" variant="plain" @click="$emit('close')"> Não </v-btn>

      <v-btn color="white" variant="plain" @click="submit()"> Sim </v-btn>
    </template>
  </v-snackbar>
</template>
