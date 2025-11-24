<script lang="ts" setup>
import type { Page } from "~/interfaces/Menu";
import type { Form } from "~/interfaces/SupportRequest";
import type { FileWithBase64 } from "~/interfaces/FileWithBase64";

const props = defineProps<{
  form: Form;
  comment: string;
  screen: Page | null;
  files: FileWithBase64[];
}>();

const router = useRouter();

const { $customFetch } = useNuxtApp();

const loading = ref(false);

const { capitalizeFirstLetter } = useCapitalize();

const { convertToFile } = useFileOrBase64();

const { data: user } = useAuth();
const create = async () => {
  loading.value = true;

  const formData = new FormData();

  for (const img of props.files) {
    formData.append("files", convertToFile(img.base64));
  }

  Object.entries(props.form).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  formData.append("user_id", `${user.value?.id}`);
  formData.append("module", `${props.screen?.menu}`);
  formData.append("screen", `${props.screen?.title}`);
  formData.append("comment", props.comment);

  try {
    await $customFetch(`support-request`, {
      method: "POST",
      body: formData,
    });

    router.push({ name: "support-request" });

    $toast().success("Sucesso ao abrir novo chamado.", {
      position: "top-center",
    });

    loading.value = false;
  } catch (error) {
    loading.value = false;

    const err = error as { statusText: string; data: { error: string } };

    $toast().error(
      `${capitalizeFirstLetter(err.data.error) ?? err.statusText}`
    );
  }
};
</script>

<template>
  <v-btn
    text="SALVAR"
    base-color="primary"
    :loading="loading"
    @click="create"
  />
</template>
