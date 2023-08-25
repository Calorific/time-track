import * as yup from 'yup'
import loginValidations from './login'

const registerValidations = {
  agree: yup.bool().required('Необходимо согласие').oneOf([true], 'Необходимо согласие'),
  ...loginValidations,
  name: yup.string().required('Имя обязательно для заполнения')
    .matches(/^[aA-zZаА-яЯ\s]+$/, 'В имени допускаются только буквы')
    .min(3, 'Имя должно состоять минимум из 3 символов')
    .max(25, 'Имя не должно превышать 25 символов')
}

export default registerValidations