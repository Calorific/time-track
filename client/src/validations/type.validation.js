import * as yup from 'yup'

const typeValidations = {
  type: yup.string().required('Обязательно нужно выбрать название')
    .max(25, 'Тип не должен превышать 25 символов')
}

export default typeValidations