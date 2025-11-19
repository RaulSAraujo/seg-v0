import { transformerData } from "~/composables/client/transformeData";
import type { QuoteFreight } from "~/interfaces/QuoteFreight";
import type { RowWithAddressSingle } from "~/interfaces/Client";
import type { RowWithRelationship } from "~/interfaces/Product";
import type { CustomerHistory } from "~/interfaces/CustomerHistory";
import type { FormProducts, SacSaleProduct } from "~/interfaces/SacSale";
import type { CustomerWithClient, RowWithAddresses } from "~/interfaces/Customer";

const { transformDateBr } = useDateConversion();

export async function findProductsApi(form: FormProducts) {
    const nuxtApp = useNuxtApp()
    return await nuxtApp.$customFetch<RowWithRelationship[]>('/product', {
        query: form
    })
}

export async function productOfSacSaleApi(form: Partial<SacSaleProduct>) {
    const nuxtApp = useNuxtApp()
    return await nuxtApp.$customFetch<SacSaleProduct>('/sac-sale/get-product', {
        query: {
            quantity: form.quantity,
            manufacturer_code: form.manufacturer_code,
            auxiliary_code: form.auxiliary_code,
        }
    })
}

export async function quoteFreightApi() {
    const sacStore = useSacStore();
    const { seller } = storeToRefs(sacStore);

    const sacAddressStore = useSacAddressStore();
    const { addressData } = storeToRefs(sacAddressStore);

    const sacProductsStore = useSacProductsStore();
    const { products } = storeToRefs(sacProductsStore);

    if (addressData.value.zip_code == "") throw new Error("Informe os dados do cliente.");
    if (seller.value == undefined || seller.value == "") throw new Error("Informe o local da venda.");
    if (products.value.length == 0) throw new Error("Adicione algum produto.");

    const nuxtApp = useNuxtApp()
    return await nuxtApp.$customFetch<QuoteFreight[]>('/sac-sale/quote-freight', {
        method: 'POST',
        body: {
            zip_code: addressData.value.zip_code,
            seller: seller.value,
            products: products.value,
        }
    })
}

export async function findCustomerApi() {
    const sacStore = useSacStore();
    const { seller } = storeToRefs(sacStore);

    const sacCustomerStore = useSacCustomerStore();
    const { customerData } = storeToRefs(sacCustomerStore);

    if (seller.value == undefined || customerData.value.id == 0) return

    const nuxtApp = useNuxtApp()
    const res = await nuxtApp.$customFetch<CustomerWithClient>('/customer', {
        query: {
            cpf: customerData.value.cpf.replace(/[^a-z0-9]/gi, ""),
            seller: seller.value,
            client: true,
        },
    });

    const client = res.rows[0].client
    const customer = res.rows[0].customer

    const transformedClient = transformDateBr(client);
    const transformedCustomer = transformDateBr(customer);

    const billingAddress = transformedClient.ClientsAddresses.find((e) => e.type == "Faturamento");

    return {
        customer: transformedCustomer,
        client: { ...transformedClient, ClientsAddresses: billingAddress, } as RowWithAddressSingle,
    }
}

export async function createCustomerApi(values: RowWithAddressSingle) {
    const sacStore = useSacStore();
    const { seller } = storeToRefs(sacStore);

    const address1 = values.ClientsAddresses;

    const nuxtApp = useNuxtApp()
    return await nuxtApp.$customFetch('/customer', {
        method: 'POST',
        body: {
            ...values,
            seller: seller.value,
            ClientsAddresses: [address1],
        },
    })
}

export async function updateCustomerApi(values: RowWithAddressSingle, customer: RowWithAddresses) {
    const sacStore = useSacStore();
    const { seller } = storeToRefs(sacStore);

    const address1 = values.ClientsAddresses;

    const nuxtApp = useNuxtApp()
    return await nuxtApp.$customFetch('/customer', {
        method: 'PUT',
        body: {
            ...values,
            customer_id: customer?.id,
            ecom_customer_id: customer?.ecom_customer_id,
            seller: seller.value,
            ClientsAddresses: [
                {
                    ...address1,
                    customer_address_id: customer.CustomerAddresses[0]?.id,
                },
            ],
        },
    })
}

export async function customerHistoryApi(customerId: number) {
    const nuxtApp = useNuxtApp()
    return await nuxtApp.$customFetch<CustomerHistory>('/sac-sale/customer-history', {
        query: {
            customer_id: customerId,
        }
    })
}

