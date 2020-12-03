const service = require('../service/user.service')
class UserController {
  async create(ctx, next) {
    const user = ctx.request.body
    const res = await service.create(user)
    ctx.body = res
  }
}

module.exports = new UserController()
