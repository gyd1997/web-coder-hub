const jwt = require('jsonwebtoken')

const errorTypes = require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')

const verifyLogin = async (ctx, next) => {
  // 1.获取用户名和密码
  const { name, password } = ctx.request.body

  // 2.判断用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 3.判断用户是否存在
  const result = await service.getUserByName(name)
  const user = result[0]
  console.log(user)
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXITS)
    return ctx.app.emit('error', error, ctx)
  }

  // 4.判断密码是否一致（加密）
  if (md5password(password) !== user.password) {
    const err = new Error(errorTypes.PASSWORD_IS_INCORRENT)
    return ctx.app.emit('error', err, ctx)
  }

  ctx.user = user

  await next()
}

const verifyAuth = async (ctx, next) => {
  console.log('进入授权中间件')
  // 1.获取 token
  const authorization = ctx.headers.authorization
  const token = authorization.replace('Bearer ', '')

  // 2.验证 token(id / name / iat / exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}
