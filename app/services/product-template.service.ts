import type { Form, ResponseTemplateEcom, ResponseTemplateConfig } from "~/interfaces/TemplateConfig";

export async function createTemplateEcom(description: string) {
    const res = await $api<ResponseTemplateEcom>("/template-config/template-ecom", {
        method: "POST",
        body: { description },
    });

    return res;
}

export async function createTemplateConfig(id: number, form: Form) {
    const { data: user } = useAuth();

    const res = await $api<ResponseTemplateConfig>("/template-config", {
        method: "POST",
        body: {
            user: user.value?.name,
            template_id: id,
            ...form
        },
    });

    return res;
}

