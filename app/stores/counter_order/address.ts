import type { ClientAddress } from "~/interfaces/Client";


export const useCounterOrderAddressStore = defineStore("counter_order_address", () => {
    const initialAddressData = {
        city: "",
        street: "",
        state: "",
        number: "",
        zipcode: "",
        neighbourhood: "",
        maps_location: "",
        complement: "",
        country: "",
        type: "",
    };

    const addressData = ref<ClientAddress>({ ...initialAddressData });

    const set = (Addresses: ClientAddress[]) => {
        const find = Addresses.find((e) => e.type == "Faturamento") as ClientAddress;

        if (find) {
            Object.entries(find).forEach(([key, value]) => {
                if (key in addressData.value) {
                    ((addressData.value as unknown) as Record<string, unknown>)[key] = value;
                }
            });
        }
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