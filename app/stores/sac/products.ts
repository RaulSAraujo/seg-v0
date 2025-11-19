import type { SacSaleProduct } from "~/interfaces/SacSale";

export const useSacProductsStore = defineStore("sac_products", () => {
    const products = ref<SacSaleProduct[]>([]);

    const productsChanged = ref(false);

    const set = (sacSaleProducts: SacSaleProduct[]) => {
        products.value = sacSaleProducts;
    }

    const add = (sacSaleProducts: SacSaleProduct) => {
        products.value.push(sacSaleProducts);

        productsChanged.value = true;
    }

    const remove = (index: number) => {
        products.value.splice(index, 1);

        productsChanged.value = true;
    }

    const resetProps = () => {
        products.value = [];
    }

    return {
        set,
        add,
        remove,
        products,
        resetProps,
        productsChanged
    }
})