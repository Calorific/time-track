import * as yup from 'yup'

// && parts.some(t => t > 0) && parts[0] < 60 && parts[1] < 60

const checkTime = time => {
  if (+time)
    return true

  const parts = time.split(':').map(Number).reverse()
  return parts.length > 1 && parts.length < 4 && parts.every(t => !isNaN(t) && t >= 0)
}

const greaterThanZero = time => {
  return time.split(':').map(Number).reverse().some(t => t > 0)
}

const validField = idx => time => {
  if (+time)
    return true

  return +time.split(':').reverse()[idx] < 60
}

const recordValidations = {
  time: yup.string().required('Необходимо указать время')
    .test('isValidTime', 'Время введено некорректно', checkTime)
    .test('greaterThanZero', 'Время должно быть больше нуля', greaterThanZero)
    .test('validSeconds', 'Секунды не должны быть больше 59', validField(0))
    .test('validMinutes', 'Минуты не должны быть больше 59', validField(1)),
  description: yup.string().max(250, 'Описание не должно превышать 250 символов'),
}

export default recordValidations