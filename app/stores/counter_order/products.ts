import type { CounterOrderProduct } from "~/interfaces/CounterOrder";

export const useCounterOrderProductsStore = defineStore("counter_order_products", () => {
    const products = ref<CounterOrderProduct[]>([]);

    const totalValueProducts = computed(() => {
        return products.value?.reduce(
            (acc, curr) => acc + parseFloat(curr.counter_price) * curr.quantity,
            0.0
        );
    });

    const set = (orderProducts: CounterOrderProduct[]) => {
        products.value = orderProducts;
    }

    const resetProps = () => {
        products.value = [];
    }

    return {
        set,
        products,
        resetProps,
        totalValueProducts,
    }
})