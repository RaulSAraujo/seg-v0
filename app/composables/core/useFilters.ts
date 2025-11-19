import type { Filter } from "~/interfaces/Filter";

/**
 * Composable para buscar e gerenciar filtros personalizados do usuário.
 * Encapsula a lógica de fetching de dados, cache e revalidação.
 *
 * @returns Um objeto reativo contendo os dados dos filtros, status da requisição e função de refresh.
 */
export function useUserFilters() {
  const filterStore = useFilterStore();
  const { updateCached } = storeToRefs(filterStore);

  const { findModelName } = useModelStore();
  const model = findModelName();

  const { data: user } = useAuth();

  const { data, status, refresh, error } = $useApi<Filter>("custom-filters-user", {
    query: {
      user_id: user.value?.id,
      model
    },
    lazy: true,
    key: `filter-${model}`,
    getCachedData(key, nuxtApp) {
      // Acessa o cache do Nuxt para dados estáticos ou payload
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  });

  // Observa a flag 'updateCached' do store para revalidar os dados
  watch(
    () => updateCached.value,
    (newValue) => {
      if (newValue === true) {
        refresh();
        updateCached.value = false; // Reseta a flag após o refresh
      }
    }
  );

  return {
    filters: data, // Renomeado para clareza no componente
    filterStatus: status, // Renomeado para clareza no componente
    refreshFilters: refresh, // Renomeado para clareza no componente
    filterError: error, // Retorna o erro para tratamento no componente
  };
}