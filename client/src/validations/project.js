import * as yup from 'yup'

const projectValidations = {
  description: yup.string().max(250, 'Описание не должно превышать 250 символов'),
  title: yup.string().required('Название обязательно для заполнения')
    .max(50, 'Название не должно превышать 50 символов'),
  type: yup.string().required('Обязетельно нужно выбрать тип')
}

export default projectValidations