import type { FirstStepResponse, OnlyFilePath } from '~/interfaces/Quotation'

export async function firstStep(file: File, code: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("codeName", code);

    const res = await $api<FirstStepResponse>('/quotation-pack/quotation/first-step', {
        method: 'POST',
        body: formData
    })

    return res
}

export async function firstStepExample() {
    const res = await $api<OnlyFilePath>('/quotation-pack/quotation/first-step-example')

    return res.filePath
}

export async function secondStep(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await $api<OnlyFilePath>('/quotation-pack/quotation/persist-second-step', {
        method: 'POST',
        body: formData
    })

    return res
}

export async function secondStepExample() {
    const res = await $api<OnlyFilePath>('/quotation-pack/quotation/second-step-example')

    return res.filePath
}

