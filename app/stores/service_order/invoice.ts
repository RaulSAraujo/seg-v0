import type { InvoiceData } from "~/interfaces/ServiceOrder";


export const useServiceOrderInvoiceStore = defineStore("service_order_invoice", () => {
    const initialInvoiceData = {
        resale: "",
        invoice: "",
        bought_at: null,
        apparatus_value: 0.0,
        extended_warranty: "",
    };

    const invoiceData = ref<InvoiceData>({ ...initialInvoiceData });

    const set = (key: string, value: unknown) => {
        const { brDate } = useDateConversion();

        if (key in invoiceData.value) {
            if (key == "bought_at") {
                ((invoiceData.value as unknown) as Record<string, unknown>)[key] = brDate(value as string) || null;

                return;
            }

            ((invoiceData.value as unknown) as Record<string, unknown>)[key] = value;
        }
    }

    const clear = () => {
        invoiceData.value = { ...initialInvoiceData };
    }

    return {
        set,
        clear,
        invoiceData,
    };
})
