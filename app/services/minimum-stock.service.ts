
const { $config } = useNuxtApp();

export async function persistFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await $api<{ filePath: string }>('/minimum-stock/persist-file', {
        method: 'POST',
        body: formData
    })

    return res
}

export async function exempleSpreadsheetForMinimumStock() {
    const res = await $api<{ filePath: string }>('/minimum-stock/spreadsheet-example')

    const link = document.createElement("a");
    link.href = `${$config.public.base_url_local}${res.filePath}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return res
}

