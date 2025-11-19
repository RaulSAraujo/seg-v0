import type { ServiceOrderProduct } from "~/interfaces/PartsCollectionManagement";

export const useServiceOrderProductsStore = defineStore("service_order_products", () => {
    const serviceOrderProducts = ref<ServiceOrderProduct[]>([]);

    const totalValueProducts = computed(() =>
        serviceOrderProducts.value?.reduce(
            (acc, curr) => acc + parseFloat(curr.product_value) * curr.quantity,
            0.0
        )
    );

    const set = (value: ServiceOrderProduct[]) => {
        serviceOrderProducts.value = value;
    };

    const add = (product: ServiceOrderProduct) => {
        serviceOrderProducts.value.push(product);
    };

    const remove = (index: number) => {
        serviceOrderProducts.value.splice(index, 1);
    };

    const clear = () => {
        serviceOrderProducts.value = [];
    };

    return {
        set,
        add,
        clear,
        fetch,
        remove,
        totalValueProducts,
        serviceOrderProducts,
    };
})