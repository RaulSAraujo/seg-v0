import type { Row } from '~/interfaces/ClassificationApparatus'

export async function creation(name: string) {
    const res = await $api('/apparatus/classification', {
        method: 'POST',
        body: {
            name
        },
    })

    return res as Row;
}

