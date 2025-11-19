import type { RowWithRelationship } from '~/interfaces/ProductSell.js'

import { createDefaultProductSellRS } from '~/factories/productSellFactory';

export const useProductSellStore = defineStore("product_sell", () => {
    const product = ref<RowWithRelationship>(createDefaultProductSellRS());

    function setProduct(productDetails: RowWithRelationship) {
        product.value = createDefaultProductSellRS(productDetails);
    }

    return {
        product,
        setProduct
    }
})
