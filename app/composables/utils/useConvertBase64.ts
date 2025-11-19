import type { FileWithBase64 } from '~/interfaces/FileWithBase64'

import { ref } from "vue";

type Base64URLString = string;

export function useFileOrBase64() {
  const base64 = ref<FileWithBase64>({} as FileWithBase64);
  const error = ref<Error | null>(null);
  const isLoading = ref<boolean>(false);

  async function convertToBase64(file: File): Promise<FileWithBase64> {
    isLoading.value = true;
    error.value = null;

    return new Promise<FileWithBase64>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        const fileData: FileWithBase64 = {
          base64: result,
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified
        };

        // Atualiza o ref
        base64.value = fileData;

        isLoading.value = false;

        resolve(fileData);
      };

      reader.onerror = () => {
        const err = new Error(`Failed to convert file "${file.name}" to base64`);
        error.value = err;
        isLoading.value = false;
        reject(err);
      };

      reader.readAsDataURL(file);
    });
  }

  function convertToFile(base64: Base64URLString): File {
    // Verifica se é uma string Base64 válida
    if (!base64.startsWith('data:')) {
      throw new Error('String Base64 inválida');
    }

    // Separa o cabeçalho dos dados
    const [header, data] = base64.split(',');

    if (!header || !data) {
      throw new Error('String Base64 inválida');
    }

    // Extrai o tipo MIME do cabeçalho
    const mimeMatch = header?.match(/data:([^;]+)/);
    const mimeType = mimeMatch && mimeMatch[1] ? mimeMatch[1] : 'application/octet-stream';

    // Gera um nome de arquivo baseado no tipo MIME
    const extension = getExtensionFromMimeType(mimeType);
    const filename = `file_${Date.now()}.${extension}`;

    // Converte a string Base64 para um array de bytes
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    // Cria um Blob a partir do array de bytes
    const blob = new Blob([byteArray], { type: mimeType });

    // Cria um File a partir do Blob
    return new File([blob], filename, {
      type: mimeType,
      lastModified: Date.now()
    });
  }

  // Função auxiliar para obter extensão do tipo MIME
  function getExtensionFromMimeType(mimeType: string): string {
    const mimeToExt: { [key: string]: string } = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'image/svg+xml': 'svg',
      'text/plain': 'txt',
      'text/html': 'html',
      'application/pdf': 'pdf',
      'application/json': 'json',
      'application/xml': 'xml',
      'audio/mpeg': 'mp3',
      'audio/wav': 'wav',
      'video/mp4': 'mp4',
      'video/webm': 'webm',
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
      'application/vnd.ms-excel': 'xls',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
      'application/vnd.ms-powerpoint': 'ppt',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx'
    };

    return mimeToExt[mimeType] || 'bin';
  }

  // Função para limpar os dados armazenados
  function clearData(): void {
    base64.value = {} as FileWithBase64;
    error.value = null;
    isLoading.value = false;
  }

  // Função para obter informações do arquivo sem converter
  function getFileInfo(base64: Base64URLString): { name: string; type: string; size: number } {
    if (!base64.startsWith('data:')) {
      throw new Error('String Base64 inválida');
    }

    const [header, data] = base64.split(',');

    if (!header || !data) {
      throw new Error('String Base64 inválida');
    }

    const mimeMatch = header.match(/data:([^;]+)/);
    const mimeType = mimeMatch && mimeMatch[1] ? mimeMatch[1] : 'application/octet-stream';

    const extension = getExtensionFromMimeType(mimeType);
    const filename = `file_${Date.now()}.${extension}`;

    // Calcula o tamanho aproximado do arquivo original
    const size = Math.round((data.length * 3) / 4);

    return {
      name: filename,
      type: mimeType,
      size: size
    };
  }

  return {
    // Estados reativos
    base64,
    error,
    isLoading,

    // Funções principais
    convertToBase64,
    convertToFile,

    // Funções utilitárias
    getFileInfo,
    clearData,
    getExtensionFromMimeType
  };
}