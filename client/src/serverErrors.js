const serverErrors = {
  // auth data
  invalidName: 'INVALID_NAME',
  nameRequired: 'NAME_REQUIRED',
  maxLengthName: 'NAME_MAX_LENGTH_25',

  emailRequired: 'EMAIL_REQUIRED',
  invalidEmail: 'INVALID_EMAIL',
  maxLengthEmail: 'EMAIL_MAX_LENGTH_50',

  minLengthPassword: 'PASSWORD_MIN_LENGTH_8',
  maxLengthPassword: 'PASSWORD_MAX_LENGTH_25',

  agreementRequired: 'AGREEMENT_REQUIRED',

  // register
  userExists: 'USER_EXISTS',

  // login
  userNotFound: 'USER_NOT_FOUND',
  wrongPassword: 'WRONG_PASSWORD',

  // project & record
  invalidProjectId: 'INVALID_PROJECT_ID',
  descriptionRequired: 'DESCRIPTION_REQUIRED',
  maxLengthDescription: 'DESCRIPTION_MAX_LENGTH_250',

  // project
  projectExists: 'PROJECT_EXISTS',
  projectTitleRequired: 'PROJECT_TITLE_REQUIRED',
  maxLengthProjectTitle: 'PROJECT_TITLE_MAX_LENGTH_50',
  typeRequired: 'TYPE_REQUIRED',
  maxLengthProjectType: 'PROJECT_TYPE_MAX_LENGTH_25',

  // record
  projectNotFound: 'PROJECT_NOT_FOUND',
  timeRequired: 'TIME_REQUIRED',
  invalidTime: 'INVALID_TIME',

  // user data
  incorrectTypes: 'INCORRECT_TYPES',
  typeExists: 'TYPE_EXISTS',
  invalidTheme: 'INVALID_THEME',

  // general
  networkError: 'ERR_NETWORK',
  unauthorized: 'UNAUTHORIZED',
  internalError: 'INTERNAL_ERROR',
}

export default serverErrors