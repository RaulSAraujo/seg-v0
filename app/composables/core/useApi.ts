import type { UseFetchOptions } from "#app";
import type { FetchOptions } from "ofetch";

/**
 * Composable reativo para fazer requisições HTTP usando o $customFetch configurado.
 * Retorna um objeto reativo com data, status, error, refresh, execute.
 * Ideal para uso em composables e componentes Vue.
 * 
 * @template T - Tipo de dados esperado na resposta
 * @param url - URL da requisição (pode ser uma função para URLs dinâmicas)
 * @param options - Opções do useFetch (lazy, server, immediate, etc.)
 * @returns Retorno do useFetch com data, status, error, refresh, execute
 * 
 * @example
 * ```ts
 * // Cliente (reativo)
 * const { data, error } = $useApi('/api/users', { lazy: true })
 * 
 * // Servidor (SSR)
 * const { data } = $useApi('/api/users', { server: true })
 * ```
 */
export function $useApi<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
    const nuxtApp = useNuxtApp()
    
    // Garante que o $customFetch está disponível
    if (!nuxtApp.$customFetch) {
        console.warn('$customFetch não está disponível. Usando $fetch padrão.')
    }
    
    return useFetch(url, {
        ...options,
        $fetch: nuxtApp.$customFetch || $fetch,
    })
}

/**
 * Função assíncrona para fazer requisições HTTP usando o $customFetch configurado.
 * Retorna diretamente os dados (Promise), ideal para funções de serviço.
 * Funciona tanto no cliente quanto no servidor (SSR).
 * 
 * @template T - Tipo de dados esperado na resposta
 * @param url - URL da requisição
 * @param options - Opções do fetch (method, body, query, etc.)
 * @returns Promise com os dados da resposta
 * 
 * @example
 * ```ts
 * // Em funções de serviço
 * const data = await $api<User>('/api/users', { method: 'GET' })
 * ```
 */
export function $api<T = any>(url: string, options: FetchOptions<any, any> = {}): Promise<T> {
    const nuxtApp = useNuxtApp()
    
    // Garante que o $customFetch está disponível
    if (!nuxtApp.$customFetch) {
        console.warn('$customFetch não está disponível. Usando $fetch padrão.')
        return $fetch<T>(url, options as any)
    }
    
    return nuxtApp.$customFetch<T>(url, options as any)
}