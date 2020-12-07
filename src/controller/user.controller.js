const fs = require('fs')

const userService = require('../service/user.service')
const fileService = require('../service/file.service')

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body
    const res = await userService.create(user)
    ctx.body = res
  }

  async avatarInfo(ctx, next) {
    const { userId } = ctx.params
    const avatarInfo = await fileService.getAvatarByUserId(userId)
    console.log(avatarInfo)
    ctx.response.set('content-type', avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`./uploads/avatar/${avatarInfo.filename}`)
  }
}

module.exports = new UserController()
