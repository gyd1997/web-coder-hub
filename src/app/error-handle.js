const errorTypes = require('../constants/error-types')

const errorHandler = (error, ctx) => {
  let status, message
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400
      message = '用户名或密码不能为空'
      break
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409 // Confilct
      message = '该用户名已存在'
      break
    case errorTypes.USER_DOES_NOT_EXITS:
      status = 400 // Bad Request
      message = '不存在该用户'
      break
    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 400 // Bad Request
      message = '用户名或密码不正确'
      break
    case errorTypes.UNAUTHORIZATION:
      status = 401 // Unauthrized
      message = '登录过期'
      break
    default:
      status = 404
      message = 'Not Found'
      break
  }
  ctx.status = status
  ctx.body = message
}

module.exports = {
  errorHandler
}
