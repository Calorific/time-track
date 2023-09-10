import serverErrors from '../serverErrors'
export const parseServerErrors = error => {
  if (!error)
    return null
  switch (error) {
    // auth data
    case serverErrors.invalidName:
      return 'В имени допускаются только буквы'
    case serverErrors.nameRequired:
      return 'Имя обязательно для заполнения'
    case serverErrors.maxLengthName:
      return 'Имя не должно превышать 25 символов'

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

    case serverErrors.agreementRequired:
      return 'Необходимо согласие'

    // register
    case serverErrors.userExists:
      return 'Пользователь с таким адресом уже существует'

    // login
    case serverErrors.userNotFound:
      return 'Пользователь не найден'
    case serverErrors.wrongPassword:
      return 'Неверный пароль'

    // project & record
    case serverErrors.invalidProjectId:
      return 'Некорректное значение ID проекта'
    case serverErrors.descriptionRequired:
      return 'Описание не может быть пустым'
    case serverErrors.maxLengthDescription:
      return 'Описание не должно превышать 250 символов'

    // project
    case serverErrors.projectExists:
      return 'Проект с таким названием уже существует'
    case serverErrors.projectTitleRequired:
      return 'Название обязательно для заполнения'
    case serverErrors.maxLengthProjectTitle:
      return 'Название не должно превышать 50 символов'
    case serverErrors.typeRequired:
      return 'Обязетельно нужно выбрать тип'
    case serverErrors.maxLengthProjectType:
      return 'Тип не должен превышать 25 символов'

    // record
    case serverErrors.projectNotFound:
      return 'Проект не найден. Попробуйте позже'
    case serverErrors.timeRequired:
      return 'Необходимо указать время'
    case serverErrors.invalidTime:
      return 'Время введено некорректно'

    // user data
    case serverErrors.incorrectTypes:
      return 'Переданы некорректные типы проектов'
    case serverErrors.typeExists:
      return 'Такой тип уже существует'
    case serverErrors.invalidTheme:
      return 'Некорректное значение темы'

    // general
    case serverErrors.networkError:
      return 'Произошла ошибка соединения. Попробуйте позже'
    case serverErrors.unauthorized:
      return 'Вы не авторизованы'
    case serverErrors.internalError:
      return 'На сервере произошла ошибка. Попробуйте позже'


    default:
      return 'На сервере произошла непредвиденная ошибка. Попробуйте позже'
  }
}