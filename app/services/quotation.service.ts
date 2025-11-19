import type { FirstStepResponse, OnlyFilePath } from '~/interfaces/Quotation'

export async function firstStep(file: File, code: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("codeName", code);

    const nuxtApp = useNuxtApp()
    const res = await nuxtApp.$customFetch<FirstStepResponse>('/quotation-pack/quotation/first-step', {
        method: 'POST',
        body: formData
    })

    return res
}

export async function firstStepExample() {
    const nuxtApp = useNuxtApp()
    const res = await nuxtApp.$customFetch('/quotation-pack/quotation/first-step-example')

    return res.filePath
}

export async function secondStep(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const nuxtApp = useNuxtApp()
    const res = await nuxtApp.$customFetch<OnlyFilePath>('/quotation-pack/quotation/persist-second-step', {
        method: 'POST',
        body: formData
    })

    return res
}

export async function secondStepExample() {
    const nuxtApp = useNuxtApp()
    const res = await nuxtApp.$customFetch('/quotation-pack/quotation/second-step-example')

    return res.filePath
}

