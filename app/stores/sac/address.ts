import type { CustomerAddress } from "~/interfaces/SacSale";

export const useSacAddressStore = defineStore("sac_address", () => {
    const initialAddressData: CustomerAddress = {
        id: 0,
        ecom_customer_address_id: 0,
        ecom_customer_id: 0,
        address: "",
        number: "",
        neighborhood: "",
        zip_code: "",
        city: "",
        state: "",
        country: "",
        complement: "",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
    };

    const addressData = ref<CustomerAddress>({ ...initialAddressData });

    const set = (Addresses: CustomerAddress[]) => {
        if (!Addresses[0]) return

        Object.entries(Addresses[0]).forEach(([key, value]) => {
            if (key in addressData.value) {
                ((addressData.value as unknown) as Record<string, unknown>)[key] = value;
            }
        });
    }

    const resetProps = () => {
        addressData.value = { ...initialAddressData };
    }

    return {
        set,
        resetProps,
        addressData,
    }
})