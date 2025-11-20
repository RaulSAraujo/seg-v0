import type { Row } from '~/interfaces/ClassificationApparatus'

export interface ClassificationApparatusResponse extends Row {
    message?: string;
}

export async function creation(name: string) {
    const res = await $api<ClassificationApparatusResponse>('/apparatus/classification', {
        method: 'POST',
        body: {
            name
        },
    })

    return res;
}

