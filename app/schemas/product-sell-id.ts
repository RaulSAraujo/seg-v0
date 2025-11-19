import * as yup from 'yup';

const idSchema = yup.object().shape({
    id: yup
        .number()
        .required('id do produto é obrigatório'),
});

export { idSchema }