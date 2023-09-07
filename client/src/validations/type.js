import * as yup from 'yup'

const typeValidations = {
  type: yup.string().required('Имя обязательно для заполнения')
    .max(25, 'Тип не должен превышать 25 символов')
}

export default typeValidations