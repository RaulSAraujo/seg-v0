import type { TransformedKit } from "~/interfaces/Kit";
import type { Pstatus as PstatusInterface, Row as RowPstatus } from '~/interfaces/Pstatus'
import type { Family, Row as RowFamily, Product } from '~/interfaces/Family'
import type { Row as RowProductSell } from '~/interfaces/ProductSell'
import type { Package, Row as RowPackage } from '~/interfaces/Package'
import type { Row, RowWithRelationship, Quotation, Pstatus } from '~/interfaces/Product'

import { createDefaultFamily } from '~/factories/familyFactory'
import { createDefaultProduct } from '~/factories/productFactory'
import { createDefaultPackage } from '~/factories/packageFactory'
import { createDefaultProductSell } from '~/factories/productSellFactory'

export const useProductStore = defineStore("product", () => {
    const product = ref<Row>(createDefaultProduct());

    const productSell = ref<RowProductSell>({} as RowProductSell);

    const productFamily = ref<RowFamily>({} as RowFamily)

    const productQuotations = ref<Quotation[]>([]);

    const productPackage = ref<RowPackage>({} as RowPackage);

    const productPstatuses = ref<Pstatus[]>([]);

    const familyList = ref<Product[]>([])

    const kitList = ref<TransformedKit[]>([])

    // Cache de dados de lookup
    const packageList = ref<RowPackage[]>([])
    const pstatusList = ref<RowPstatus[]>([])
    const familyCache = ref<Record<string, Product[]>>({})

    // Estados de loading
    const loadingPackages = ref(false)
    const loadingPstatus = ref(false)
    const loadingFamily = ref(false)

    // Flags de cache
    const loadedPackages = ref(false)
    const loadedPstatus = ref(false)

    const availabilityMap = ref([
        { title: 'DISPONIVEL', value: 1 },
        { title: 'DISPONIVEL(EST)', value: 2 },
        { title: 'INDISPONIVEL COM PREVISÃO', value: 3 },
        { title: 'INDISPONIVEL', value: 4 },
        { title: 'FORA DE LINHA', value: 5 },
        { title: 'BLOQUEADO', value: 6 },
        { title: 'NÃO ENCONTRADO', value: 7 },
    ])

    const productMeasurementsChanged = ref(false)

    const costTableIndex = ref(-1);

    function setValues(details: RowWithRelationship) {
        Object.entries(details).forEach(([key, value]) => {
            if (key in product.value) {
                ((product.value as unknown) as Record<string, unknown>)[key] = value;
            }
        });

        if (!Number.isInteger(product.value.weight)) {
            product.value.weight = Math.ceil(parseFloat(`${product.value.weight ?? 0.0}`) * 1000);
        } else {
            product.value.weight = product.value.weight ?? 0;
        }

        productPstatuses.value = details.Pstatuses || [];
        productQuotations.value = details.Quotations || [];
        productFamily.value = createDefaultFamily(details.Family)
        productPackage.value = createDefaultPackage(details.Package || {})
        productSell.value = createDefaultProductSell(details.ProductSell || {})
    }

    /**
     * Busca lista de packages com cache
     */
    async function fetchPackages(force = false) {
        if (loadedPackages.value && !force) {
            return packageList.value;
        }

        loadingPackages.value = true;

        try {
            const data = await $api<Package>('/product/package');
            packageList.value = data.rows || [];
            loadedPackages.value = true;
            return packageList.value;
        } catch (err) {
            throw err;
        } finally {
            loadingPackages.value = false;
        }
    }

    /**
     * Busca lista de pstatus com cache
     */
    async function fetchPstatus(force = false) {
        if (loadedPstatus.value && !force) {
            return pstatusList.value;
        }

        loadingPstatus.value = true;

        try {
            const data = await $api<PstatusInterface>('/product/pstatus');
            pstatusList.value = data.rows || [];
            loadedPstatus.value = true;
            return pstatusList.value;
        } catch (err) {
            throw err;
        } finally {
            loadingPstatus.value = false;
        }
    }

    /**
     * Busca família de produtos por ID com cache
     */
    async function fetchFamily(id: string, force = false) {
        if (familyCache.value[id] && !force) {
            return familyCache.value[id];
        }

        loadingFamily.value = true;

        try {
            const data = await $api<Family>('/product/family', {
                query: { id }
            });

            familyCache.value[id] = data.rows[0]?.Products || [];
            return familyCache.value[id];
        } catch (err) {
            throw err;
        } finally {
            loadingFamily.value = false;
        }
    }

    return {
        product,
        kitList,
        setValues,
        familyList,
        productSell,
        productFamily,
        productPackage,
        costTableIndex,
        availabilityMap,
        productPstatuses,
        productQuotations,
        productMeasurementsChanged,
        // Novos métodos e dados
        packageList: readonly(packageList),
        pstatusList: readonly(pstatusList),
        loadingPackages: readonly(loadingPackages),
        loadingPstatus: readonly(loadingPstatus),
        loadingFamily: readonly(loadingFamily),
        fetchPackages,
        fetchPstatus,
        fetchFamily,
    }
})