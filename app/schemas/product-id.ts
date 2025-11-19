import * as yup from 'yup';

const productIdParamsSchema = yup.object().shape({
    id: yup
        .number()
        .required('id do produto é obrigatório'),
});

export { productIdParamsSchema }