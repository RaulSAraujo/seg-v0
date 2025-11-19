const { $config } = useNuxtApp();

export async function importStockMovement(file: File) {
    const formData = new FormData();
    formData.append("monthlySales", file);

    const res = await $api<{ filePath: string }>('/stock-movement-analysis/sales-analysis', {
        method: 'POST',
        body: formData
    })

    return res
}

export async function exempleSpreadsheetForStockMovement() {
    const res = await $api<{ filePath: string }>('/stock-movement-analysis/spreadsheet-exemple')

    const link = document.createElement("a");
    link.href = `${$config.public.base_url_local}${res.filePath}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return res
}

