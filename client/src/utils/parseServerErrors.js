import serverErrors from '../serverErrors'
export const parseServerErrors = error => {
  if (!error)
    return null
  switch (error) {
    case serverErrors.emailRequired:
      return 'Электронная почта обязательна для заполнения'
    case serverErrors.invalidEmail:
      return 'Электронная почта введена некорректно'
    case serverErrors.maxLengthEmail:
      return 'Электронная почта не должна превышать 50 символов'
    case serverErrors.minLengthPassword:
      return 'Пароль должен состоять минимум из 8 символов'
    case serverErrors.maxLengthPassword:
      return 'Пароль не должен превышать 25 символов'
    case serverErrors.nameRequired:
      return 'Имя обязательно для заполнения'
    case serverErrors.invalidName:
      return 'В имени допускаются только буквы'
    case serverErrors.maxLengthName:
      return 'Имя не должно превышать 25 символов'
    case serverErrors.userExists:
      return 'Пользователь с таким адресом уже существует'
    case serverErrors.internalError:
      return 'На сервере произошла ошибка. Попробуйте позже'
    case serverErrors.agreementRequired:
      return 'Необходимо согласие'
    case serverErrors.unauthorized:
      return 'Вы не авторизованы'
    case serverErrors.userNotFound:
      return 'Пользователь не найден'
    case serverErrors.wrongPassword:
      return 'Неверный пароль'
    case serverErrors.maxLengthDescription:
      return 'Описание не должно превышать 250 символов'
    case serverErrors.invalidTime:
      return 'Время введено некорректно'
    case serverErrors.timeRequired:
      return 'Необходимо указать время'
    case serverErrors.projectNotFound:
      return 'Проект не найден. Попробуйте позже'
    case serverErrors.networkError:
      return 'Произошла ошибка соединения. Попробуйте позже'
    case serverErrors.projectTitleRequired:
      return 'Название обязательно для заполнения'
    case serverErrors.maxLengthProjectTitle:
      return 'Название не должно превышать 50 символов'
    case serverErrors.typeRequired:
      return 'Обязетельно нужно выбрать тип'
    case serverErrors.maxLengthProjectType:
      return 'Тип не должен превышать 25 символов'
    case serverErrors.projectExists:
      return 'Проект с таким названием уже существует'
    default:
      return 'На сервере произошла непредвиденная ошибка. Попробуйте позже'
  }
}