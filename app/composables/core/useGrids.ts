// composables/useGridConfiguration.ts
import type { Grid } from "~/interfaces/Grid";

/**
 * Composable para buscar e gerenciar grids personalizadas do usuário.
 * Encapsula a lógica de fetching de dados, cache e revalidação.
 *
 * @returns Um objeto reativo contendo os dados da grid, status da requisição e função de refresh.
 */
export function useUserGrids() {
  const { data: user } = useAuth();

  const model = useModelStore().findModelName();

  const gridStore = useGridStore();
  const { updateCached } = storeToRefs(gridStore);

  const { data, status, refresh, error, } = $useApi<Grid>(`grid-configurations`, {
    lazy: true,
    key: `grid-${model}`,
    query: {
      user_id: user.value?.id,
      model
    },
    getCachedData: (key, nuxtApp) =>
      nuxtApp.payload.data[key] || nuxtApp.static.data[key],
  }
  );

  // Observa a flag 'updateCached' do gridStore para revalidar os dados
  watch(updateCached, async (shouldUpdate) => {
    if (shouldUpdate) {
      await refresh(); // Refaz a requisição

      updateCached.value = false; // Reseta a flag após a atualização
    }
  });

  return {
    gridData: data,
    gridStatus: status,
    refreshGrid: refresh,
    gridError: error,
  };
}