import type { SacSaleShipment } from "~/interfaces/SacSale";

export const useSacQuoteFreightStore = defineStore("sac_quote_freight", () => {
    const initialQuoteFreight: SacSaleShipment = {
        price: "0",
        id: 0,
        sac_sale_id: 0,
        name: "",
        integrator: "",
        information: "",
        estimated_delivery_date: "",
        discount_total: null,
        remaining_quantity: null,
        created_at: null,
        updated_at: null,
    }

    const quoteFreight = ref<SacSaleShipment>({ ...initialQuoteFreight });

    const set = (sacSaleShipment: SacSaleShipment | null) => {
        if (!sacSaleShipment) {
            quoteFreight.value = { ...initialQuoteFreight };

            return;
        }

        Object.entries(sacSaleShipment!).forEach(([key, value]) => {
            if (key in quoteFreight.value!) {
                if (value == "" || value == null) return;

                ((quoteFreight.value as unknown) as Record<string, unknown>)[key] = value;
            }
        });
    }

    const resetProps = () => {
        quoteFreight.value = { ...initialQuoteFreight };
    }

    return {
        set,
        quoteFreight,
        resetProps,
    }
})