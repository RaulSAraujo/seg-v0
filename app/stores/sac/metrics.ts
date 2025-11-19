import type { RowWithRelations } from "~/interfaces/SacSale";

export const useSacMetricsStore = defineStore("sac_metrics", () => {
    const sacStore = useSacStore();
    const { paymentType } = storeToRefs(sacStore);

    const sacProductsStore = useSacProductsStore();
    const { products } = storeToRefs(sacProductsStore);

    const sacQuoteFreightStore = useSacQuoteFreightStore();
    const { quoteFreight } = storeToRefs(sacQuoteFreightStore);

    const totalValueProducts = computed(() => {
        return products.value.reduce((acc, curr) => acc + parseFloat(`${curr.total}`), 0.0)
    });

    const negotiatingLimitZero = ["FATURADO C/ DESC", "PARCELADO C/ DESC"];

    /**
     * Computa o limite de negociação com base no tipo de pagamento e na lista de produtos.
     *
     * Se o tipo de pagamento não estiver na lista `negotiatingLimitZero`, o limite de negociação
     * será a soma dos valores de `price_difference_total` de todos os produtos. Caso contrário,
     * o limite de negociação será 0.0.
     *
     * @returns O limite de negociação calculado.
     */
    const negotiationLimit = computed(() => {
        const validMargin = products.value.some((e) => e.is_valid_margin == false)

        if (paymentType.value == "À VISTA") {
            if (validMargin) {
                const totalValueDiscountProducts = products.value.reduce((acc, curr) => acc + parseFloat(`${curr.price_difference_total}`), 0.0)

                return totalValueDiscountProducts + (totalValueProducts.value * 0.05)
            }

            return totalValueProducts.value * 0.1;
        }

        if (negotiatingLimitZero.includes(paymentType.value!)) {
            if (validMargin) {
                return products.value.reduce((acc, curr) => acc + parseFloat(`${curr.price_difference_total}`), 0.0)
            }

            return totalValueProducts.value * 0.05;
        }

        return 0.0;
    });

    const discountPayment = computed(() => {
        if (paymentType.value == "À VISTA") {
            return totalValueProducts.value * 0.05;
        }

        return 0.0;
    });

    const discountPaymentPercent = computed(() => {
        if (paymentType.value == "À VISTA") {
            return 5;
        }

        return 0;
    });

    /**
     * Uma referência reativa para armazenar o valor do desconto para um envio.
     *
     * @type {number}
     */
    const discountShipment = ref(0);

    /**
     * Computed property que calcula a porcentagem de desconto no frete.
     *
     * @returns {string | number} A porcentagem de desconto no frete, formatada com duas casas decimais.
     *                            Retorna 0 se o preço do frete for igual a 0.
     */
    const discountShipmentPercent = computed(() => {
        if (parseFloat(quoteFreight.value.price) != 0) {
            const cal = (discountShipment.value / totalValueProducts.value) * 100;

            return parseFloat(cal.toFixed(2));
        } else {
            return 0;
        }
    });

    /**
     * Computed property que calcula o valor a pagar subtraindo o desconto do frete do preço do frete cotado.
     *
     * @computed
     * @returns {number} O valor a pagar após aplicar o desconto no frete.
     */
    const toPay = computed(
        () => parseFloat(quoteFreight.value?.price ?? "0.0") - discountShipment.value
    );

    /**
     * Computa o valor do desconto aplicado aos produtos.
     *
     * @returns O valor do desconto calculado com base no percentual de desconto aplicado ao valor total dos produtos.
     */
    const discountProduct = computed(() => {
        return totalValueProducts.value * (discountProductPercent.value / 100);
    });

    const discountProductPercent = ref(0);

    /**
     * @computed
     *
     * Computa a porcentagem de desconto aplicada aos produtos.
     *
     * A fórmula utilizada é:
     * ((Limite de negociação - desconto do frete) / Valor total dos produtos) * 100
     *
     * @returns {string} A porcentagem de desconto formatada com duas casas decimais.
     */
    const discountProductPercentComputed = computed(() => {
        const sub = negotiationLimit.value - discountShipment.value || 0;

        // Validação de desconto negativo
        if (sub < 0) {
            if (paymentType.value == "À VISTA") return 5;

            return 0;
        }

        const total = totalValueProducts.value || 1;

        const calc = (sub / total) * 100;

        return parseFloat(calc.toFixed(2));
    });

    /**
     * Computed property que calcula o valor total sem o frete.
     *
     * @returns {number} O valor total dos produtos subtraído do desconto aplicado.
     */
    const totalWithoutShipping = computed(() => totalValueProducts.value - discountProduct.value);

    /**
     * Computa o valor total com frete.
     *
     * Este valor é calculado somando o total sem frete com o preço do frete cotado,
     * subtraindo o valor do desconto no frete.
     *
     * @returns {number} O valor total com frete aplicado.
     */
    const totalWithShipping = computed(() => {
        const discount = discountShipment.value;
        const total = totalWithoutShipping.value;
        const freightPrice = parseFloat(quoteFreight.value.price ?? "0");

        return total + freightPrice - discount;
    });

    const discountProductFloat = computed(() => {
        return discountProduct.value - discountPayment.value;
    });

    const discountProductPercentFloat = computed(() => {
        const productDiscount = discountProduct.value - discountPayment.value;
        const totalValue = totalValueProducts.value || 1;
        const percentage = (productDiscount / totalValue) * 100;

        return parseFloat(percentage.toFixed(2));
    });

    function set(sac: RowWithRelations) {
        discountShipment.value = parseFloat(sac.SacSaleShipment?.discount_total ?? "0");
        discountProductPercent.value = parseFloat(`${sac.discount_percentage || 0}`);
    }

    function resetProps() {
        discountShipment.value = 0;
        discountProductPercent.value = 0;
    }

    return {
        set,
        toPay,
        resetProps,
        discountPayment,
        discountPaymentPercent,
        discountShipment,
        discountShipmentPercent,
        discountProduct,
        discountProductPercent,
        discountProductPercentComputed,
        totalWithoutShipping,
        totalWithShipping,
        totalValueProducts,
        discountProductFloat,
        discountProductPercentFloat,
        negotiationLimit,
    }
})