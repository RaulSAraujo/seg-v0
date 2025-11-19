import type { FileManager } from "~/interfaces/FileManager";
import type { FileWithBase64 } from "~/interfaces/FileWithBase64";

// --- Funções de Suporte Padrão (podem ser sobrescritas) ---

// Mapeamento padrão de extensões para MIME types.
// Isso pode ser expandido ou substituído por uma função customizada.
const DEFAULT_EXT_TO_MIME: { [key: string]: string } = {
    jpeg: "image/jpeg",
    jpg: "image/jpeg", // Padronizando para 'image/jpeg' para ambos
    png: "image/png",
    pdf: "application/pdf",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    txt: "text/plain",
    // Adicione outras extensões e seus MIME types conforme necessário
};

/**
 * Retorna o MIME type correspondente a uma extensão, com um fallback.
 * @param ext A extensão do arquivo (e.g., "jpg", ".png").
 * @returns O MIME type correspondente ou "image/jpeg" como padrão.
 */
function getDefaultMimeTypeFromExtension(ext?: string): string {
    if (!ext) return `${DEFAULT_EXT_TO_MIME.jpg}`;
    const cleanExt = ext.replace(/^\./, '').toLowerCase(); // Remove ponto inicial e normaliza
    return DEFAULT_EXT_TO_MIME[cleanExt] || `${DEFAULT_EXT_TO_MIME.jpg}`; // Retorna o MIME type ou default para JPG
}

/**
 * Função de transformação padrão de `FileManager` para `FileWithBase64`.
 * O consumidor pode fornecer sua própria função de transformação.
 * @param fileData Dados brutos do gerenciador de arquivos.
 * @returns Objeto `FileWithBase64` transformado.
 */
function defaultTransformFile(fileData: FileManager): FileWithBase64 {
    const mimeType = getDefaultMimeTypeFromExtension(fileData.ext);
    return {
        base64: `data:${mimeType};base64,${fileData.data}`,
        name: fileData.filename,
        type: mimeType,
    };
}

// --- Interface de Opções para o Composable ---

interface UseFileManagerOptions {
    /**
     * Uma referência reativa (`Ref`, `ComputedRef`) ou um array simples de nomes de arquivos a serem buscados.
     * Estes nomes de arquivos devem ser os "limpos" esperados pela API do servidor (e.g., "image1.jpg").
     */
    filenames: Ref<string[]> | ComputedRef<string[]> | string[];
    /**
     * O ID do recurso associado aos arquivos (e.g., ID de uma solicitação de suporte, ID de usuário).
     * Pode ser uma referência reativa ou uma string/número simples.
     */
    resourceId: Ref<string | number | undefined> | ComputedRef<string | number | undefined> | string | number | undefined;
    /**
     * O segmento de rota específico para a API do gerenciador de arquivos.
     * Isso corresponde a `query.route` no seu manipulador de servidor (e.g., "support-request", "user-profile").
     */
    apiRoute: string;
    /**
     * Se os arquivos devem ser carregados imediatamente quando o composable é configurado.
     * O padrão é `true`.
     */
    immediate?: boolean;
    /**
     * Uma função opcional e customizada para transformar a resposta bruta `FileManager`
     * para o formato `FileWithBase64` desejado. Se não for fornecida, uma transformação
     * padrão será utilizada.
     */
    transformFile?: (fileData: FileManager) => FileWithBase64;
    /**
     * Uma função de callback opcional para lidar com erros que ocorrem durante a
     * busca de um arquivo individual.
     */
    onIndividualFileError?: (error: unknown, filename: string) => void;
    /**
     * Uma função de callback opcional para lidar com erros que ocorrem durante o
     * processo geral de carregamento de arquivos (e.g., falha de `Promise.all`).
     */
    onOverallLoadError?: (error: unknown) => void;
}

/**
 * Um composable genérico para buscar e processar arquivos de uma API de gerenciamento de arquivos.
 * Ele lida com estados de carregamento, erros e transformação de dados.
 *
 * @param options Opções de configuração para a busca de arquivos.
 * @returns Um objeto contendo o estado reativo dos arquivos, status de carregamento, erro e uma função de recarga.
 */
export function useFileManager(options: UseFileManagerOptions) {
    const {
        filenames: filenamesSource,
        resourceId: resourceIdSource,
        apiRoute,
        immediate = true,
        transformFile = defaultTransformFile, // Usa a função padrão se nenhuma for fornecida
        onIndividualFileError,
        onOverallLoadError,
    } = options;

    const files = ref<FileWithBase64[]>([]);
    const isLoading = ref(false);
    const error = ref<Error | null>(null);

    // Usa `computed` para desempacotar as fontes reativas (Ref, ComputedRef)
    // Isso garante que `currentFilenames` e `currentResourceId` sempre contenham o valor atual.
    const currentFilenames = computed(() => unref(filenamesSource));
    const currentResourceId = computed(() => unref(resourceIdSource));

    /**
     * Busca um único arquivo da API.
     * Inclui tratamento de erro para falhas individuais.
     * @param filename O nome "limpo" do arquivo a ser buscado.
     * @returns Os dados brutos do `FileManager` ou `null` em caso de falha.
     */
    const fetchSingleFile = async (filename: string): Promise<FileManager | null> => {
        const id = currentResourceId.value;
        if (!id) {
            const err = new Error(`ID do recurso é necessário para buscar o arquivo: ${filename}`);
            console.error(`❌ ${err.message}`);
            onIndividualFileError?.(err, filename); // Chama o callback de erro individual
            return null;
        }

        try {
            const res = await $api<FileManager>("/api/file-manager", {
                query: {
                    isReadFile: true,
                    route: apiRoute,
                    id: id,
                    filename: filename, // O nome do arquivo já é "limpo" aqui
                },
            });
            return res;
        } catch (err) {
            console.error(`❌ Erro ao buscar o arquivo "${filename}":`, err);
            onIndividualFileError?.(err, filename); // Chama o callback de erro individual
            return null;
        }
    };

    /**
     * Carrega todos os arquivos especificados.
     * Gerencia os estados de carregamento e erro.
     */
    const loadFiles = async () => {
        isLoading.value = true;
        error.value = null;
        files.value = []; // Limpa arquivos anteriores

        const filenamesToFetch = currentFilenames.value;
        const resourceId = currentResourceId.value;

        if (!filenamesToFetch || filenamesToFetch.length === 0) {
            isLoading.value = false;
            return;
        }

        if (!resourceId) {
            const err = new Error("Não foi possível carregar os arquivos: ID do recurso está faltando.");
            console.error(`❌ ${err.message}`);
            error.value = err;
            onOverallLoadError?.(err); // Chama o callback de erro geral
            isLoading.value = false;
            return;
        }

        try {
            // Mapeia cada filename para uma promessa de busca
            const promises = filenamesToFetch.map(fetchSingleFile);
            // Espera que todas as promessas sejam resolvidas
            const results = await Promise.all(promises);

            // Filtra resultados nulos (arquivos que falharam ao carregar)
            const successfulResults = results.filter((res): res is FileManager => res !== null);

            // Transforma os resultados bem-sucedidos usando a função de transformação (padrão ou customizada)
            files.value = successfulResults.map(transformFile);
        } catch (err) {
            console.error("❌ Erro geral ao carregar arquivos:", err);
            error.value = err as Error;
            onOverallLoadError?.(err); // Chama o callback de erro geral
        } finally {
            isLoading.value = false;
        }
    };

    // Observa mudanças em `currentFilenames` ou `currentResourceId` para acionar uma recarga.
    // `deep: true` é importante para arrays como `filenames` se seus conteúdos puderem mudar.
    watch([currentFilenames, currentResourceId], ([newFilenames, newResourceId], [oldFilenames, oldResourceId]) => {
        // Evita recargas desnecessárias se os valores não mudaram efetivamente.
        // Para arrays/objetos complexos, uma comparação mais profunda pode ser necessária.
        if (
            JSON.stringify(newFilenames) !== JSON.stringify(oldFilenames) ||
            newResourceId !== oldResourceId
        ) {
            loadFiles();
        }
    }, { immediate: immediate, deep: true }); // `immediate` controla o carregamento inicial

    return {
        files,
        isLoading,
        error,
        loadFiles, // Expõe a função para permitir recarga manual, se necessário
    };
}