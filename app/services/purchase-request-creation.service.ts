import type { NewItems } from "~/interfaces/PurchaseRequest";

const { data: user } = useAuth();

const { isDate, databaseDate } = useDateConversion();

export async function creationPurchaseRequest(product: NewItems) {
    if (isDate(product.sending_limit_at!)) {
        product.sending_limit_at = databaseDate(product.sending_limit_at!);
    }

    return await $api('/purchase-request', {
        method: 'POST',
        body: {
            export_order: false,
            status: "COMPRAR",
            supplier: "",
            user: user.value?.name,
            ...product
        }
    });
}

