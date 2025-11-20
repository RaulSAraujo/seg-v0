import type { Row, RowWithAddressSingle, ClientAddress } from '~/interfaces/Client'
export interface ClientResponse extends Row {
    message?: string;
}

export async function creation(form: RowWithAddressSingle) {
    const address1 = form.ClientsAddresses;

    const res = await $api<ClientResponse>('/clients', {
        method: 'POST',
        body: {
            ...form,
            ClientsAddresses: [address1],
        },
    })

    return res;
}

export async function update(
    id: string,
    form: RowWithAddressSingle,
    address2?: ClientAddress,
    address3?: ClientAddress
) {
    const address1 = form.ClientsAddresses;

    const res = await $api<ClientResponse>(`/clients`, {
        method: 'PUT',
        params: {
            id,
        },
        body: {
            ...form,
            ClientsAddresses: [address1, address2, address3],
        },
    })

    return res;
}

