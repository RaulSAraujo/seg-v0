<script lang="ts" setup>
import type {
  Prompt,
  newAutomation,
} from "~/interfaces/Puppeteer";

useHead({
  titleTemplate: `Puppeteer - %s`,
});

definePageMeta({
  path: "/automacoes/puppeteer",
});

const dialog = ref(false);

const prompts = ref<Prompt[]>([]);

const promptsRef = ref();

const { $customFetch, $config } = useNuxtApp();

const initSSE = async (data: newAutomation) => {
  const { automation, file, query } = data;

  let filePath;
  if (file) {
    const resFile = await uploadFile(file);
    filePath = resFile.filePath;
  }

  prompts.value.push({
    title: automation.description_automation,
    eventSource: null,
    sseMessage: [],
  });

  const index = prompts.value.length - 1;

  let url = `${$config.public.automation_base_url}${automation.router_automation}`;

  if (filePath !== null) {
    url = `${url}?path=${filePath}`;
  }

  if (query) {
    if (url.includes("?")) {
      url = `${url}&${query}`;
    } else {
      url = `${url}?${query}`;
    }
  }

  prompts.value[index]!.eventSource = new EventSource(`${url}`);

  prompts.value[index]!.eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data?.type === "xlsx") {
      // Crie um link para fazer o download do arquivo XLSX
      const downloadLink = document.createElement("a");
      downloadLink.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${data.data}`;
      downloadLink.download = `${automation?.name_automation
        ?.replaceAll(" ", "_")
        ?.toLowerCase()}.xlsx`;
      downloadLink.click();
      return;
    }

    if (
      prompts.value[index]?.title.includes("Cotação") &&
      prompts.value[index]?.sseMessage.length > 50
    ) {
      prompts.value[index]?.sseMessage.splice(0, 1);
    }

    prompts.value[index]?.sseMessage.push(data);

    scrollToBottom(index);
  };

  prompts.value[index]!.eventSource.onerror = (error) => {
    console.error("Erro de SSE:", error);

    if (prompts.value[index]?.eventSource) {
      prompts.value[index]?.eventSource.close();
    }
  };
};

const stopSSE = (index: number) => {
  if (prompts.value[index]?.eventSource) {
    prompts.value[index]?.eventSource.close();
  }

  prompts.value.splice(index, 1);
};

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const baseURL = $config.public.automation_base_url as string;
  const res = await $customFetch<{ filePath: string }>(
    `${baseURL}/upload-file`,
    {
      method: "POST",
      body: formData,
    }
  );

  return res;
};

const scrollToBottom = (index: number) => {
  const scroll = promptsRef.value.scrollContainer[index].$el;

  const isScrollbarVisible = scroll.scrollHeight > scroll.clientHeight;

  if (isScrollbarVisible) {
    nextTick(() => {
      scroll.scrollTop = scroll.scrollHeight;
    });
  }
};
</script>

<template>
  <v-container class="mt-4">
    <PuppeteerPrompts
      v-if="prompts.length > 0"
      ref="promptsRef"
      :prompts="prompts"
      @open-dialog="dialog = true"
      @stop-sse="stopSSE"
    />

    <PuppeteerInitiatorButton v-else @open="dialog = true" />

    <PuppeteerDialogAutomation
      v-model="dialog"
      @new="initSSE($event)"
      @close="dialog = false"
    />
  </v-container>
</template>
