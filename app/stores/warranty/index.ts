export const useWarrantyStore = defineStore("warranty", () => {
  // Cache de dados de lookup
  const statuses = ref<string[]>([]);
  const types = ref<string[]>([]);
  const causes = ref<string[]>([]);
  const solutions = ref<string[]>([]);
  const situations = ref<string[]>([]);
  const accounts = ref<string[]>([]);
  const expeditionProblems = ref<string[]>([]);

  // Estados de loading para cada lookup
  const loadingStatuses = ref(false);
  const loadingTypes = ref(false);
  const loadingCauses = ref(false);
  const loadingSolutions = ref(false);
  const loadingSituations = ref(false);
  const loadingAccounts = ref(false);
  const loadingExpeditionProblems = ref(false);

  // Estados de erro
  const errorStatuses = ref<Error | null>(null);
  const errorTypes = ref<Error | null>(null);
  const errorCauses = ref<Error | null>(null);
  const errorSolutions = ref<Error | null>(null);
  const errorSituations = ref<Error | null>(null);
  const errorAccounts = ref<Error | null>(null);
  const errorExpeditionProblems = ref<Error | null>(null);

  // Flags para indicar se os dados já foram carregados
  const loadedStatuses = ref(false);
  const loadedTypes = ref(false);
  const loadedCauses = ref(false);
  const loadedSolutions = ref(false);
  const loadedSituations = ref(false);
  const loadedAccounts = ref(false);
  const loadedExpeditionProblems = ref(false);

  /**
   * Busca statuses de warranty com cache
   */
  async function fetchStatuses(force = false) {
    if (loadedStatuses.value && !force) {
      return statuses.value;
    }

    loadingStatuses.value = true;
    errorStatuses.value = null;

    try {
      const data = await $api<string[]>("/warranty/statuses");

      statuses.value = data || [];
      loadedStatuses.value = true;
      return statuses.value;
    } catch (err) {
      errorStatuses.value = err as Error;
      throw err;
    } finally {
      loadingStatuses.value = false;
    }
  }

  /**
   * Busca types de warranty com cache
   */
  async function fetchTypes(force = false) {
    if (loadedTypes.value && !force) {
      return types.value;
    }

    loadingTypes.value = true;
    errorTypes.value = null;

    try {
      const data = await $api<string[]>("/warranty/types");

      types.value = data || [];
      loadedTypes.value = true;
      return types.value;
    } catch (err) {
      errorTypes.value = err as Error;
      throw err;
    } finally {
      loadingTypes.value = false;
    }
  }

  /**
   * Busca causes de warranty com cache
   */
  async function fetchCauses(force = false) {
    if (loadedCauses.value && !force) {
      return causes.value;
    }

    loadingCauses.value = true;
    errorCauses.value = null;

    try {
      const data = await $api<string[]>("/warranty/causes");

      causes.value = data || [];
      loadedCauses.value = true;
      return causes.value;
    } catch (err) {
      errorCauses.value = err as Error;
      throw err;
    } finally {
      loadingCauses.value = false;
    }
  }

  /**
   * Busca solutions de warranty com cache
   */
  async function fetchSolutions(force = false) {
    if (loadedSolutions.value && !force) {
      return solutions.value;
    }

    loadingSolutions.value = true;
    errorSolutions.value = null;

    try {
      const data = await $api<string[]>("/warranty/solutions");

      solutions.value = data || [];
      loadedSolutions.value = true;
      return solutions.value;
    } catch (err) {
      errorSolutions.value = err as Error;
      throw err;
    } finally {
      loadingSolutions.value = false;
    }
  }

  /**
   * Busca situations de warranty com cache
   */
  async function fetchSituations(force = false) {
    if (loadedSituations.value && !force) {
      return situations.value;
    }

    loadingSituations.value = true;
    errorSituations.value = null;

    try {
      const data = await $api<string[]>("/warranty/situations");

      situations.value = data || [];
      loadedSituations.value = true;
      return situations.value;
    } catch (err) {
      errorSituations.value = err as Error;
      throw err;
    } finally {
      loadingSituations.value = false;
    }
  }

  /**
   * Busca accounts de warranty com cache
   */
  async function fetchAccounts(force = false) {
    if (loadedAccounts.value && !force) {
      return accounts.value;
    }

    loadingAccounts.value = true;
    errorAccounts.value = null;

    try {
      const data = await $api<string[]>("/warranty/accounts");

      accounts.value = data || [];
      loadedAccounts.value = true;
      return accounts.value;
    } catch (err) {
      errorAccounts.value = err as Error;
      throw err;
    } finally {
      loadingAccounts.value = false;
    }
  }

  /**
   * Busca expedition problems de warranty com cache
   */
  async function fetchExpeditionProblems(force = false) {
    if (loadedExpeditionProblems.value && !force) {
      return expeditionProblems.value;
    }

    loadingExpeditionProblems.value = true;
    errorExpeditionProblems.value = null;

    try {
      const data = await $api<string[]>(
        "/warranty/expedition-problems"
      );

      expeditionProblems.value = data || [];
      loadedExpeditionProblems.value = true;
      return expeditionProblems.value;
    } catch (err) {
      errorExpeditionProblems.value = err as Error;
      throw err;
    } finally {
      loadingExpeditionProblems.value = false;
    }
  }

  /**
   * Limpa todo o cache
   */
  function clearCache() {
    statuses.value = [];
    types.value = [];
    causes.value = [];
    solutions.value = [];
    situations.value = [];
    accounts.value = [];
    expeditionProblems.value = [];

    loadedStatuses.value = false;
    loadedTypes.value = false;
    loadedCauses.value = false;
    loadedSolutions.value = false;
    loadedSituations.value = false;
    loadedAccounts.value = false;
    loadedExpeditionProblems.value = false;

    errorStatuses.value = null;
    errorTypes.value = null;
    errorCauses.value = null;
    errorSolutions.value = null;
    errorSituations.value = null;
    errorAccounts.value = null;
    errorExpeditionProblems.value = null;
  }

  return {
    // Dados
    statuses: readonly(statuses),
    types: readonly(types),
    causes: readonly(causes),
    solutions: readonly(solutions),
    situations: readonly(situations),
    accounts: readonly(accounts),
    expeditionProblems: readonly(expeditionProblems),

    // Estados de loading
    loadingStatuses: readonly(loadingStatuses),
    loadingTypes: readonly(loadingTypes),
    loadingCauses: readonly(loadingCauses),
    loadingSolutions: readonly(loadingSolutions),
    loadingSituations: readonly(loadingSituations),
    loadingAccounts: readonly(loadingAccounts),
    loadingExpeditionProblems: readonly(loadingExpeditionProblems),

    // Erros
    errorStatuses: readonly(errorStatuses),
    errorTypes: readonly(errorTypes),
    errorCauses: readonly(errorCauses),
    errorSolutions: readonly(errorSolutions),
    errorSituations: readonly(errorSituations),
    errorAccounts: readonly(errorAccounts),
    errorExpeditionProblems: readonly(errorExpeditionProblems),

    // Métodos
    fetchStatuses,
    fetchTypes,
    fetchCauses,
    fetchSolutions,
    fetchSituations,
    fetchAccounts,
    fetchExpeditionProblems,
    clearCache,
  };
});

