const fileService = require('../service/file.service')
const userSerive = require('../service/user.service')
const { APP_HOST, APP_PORT } = require('../app/config')

class FileController {
  async saveAvatarInfo(ctx, next) {
    const { filename, mimetype, size } = ctx.req.file
    const { id } = ctx.user

    await fileService.createAvatar(filename, mimetype, size, id)
    const avatarUrl = `${APP_HOST}:${APP_PORT}/uploads/avatar/${filename}`
    await userSerive.updateAvatarUrlById(avatarUrl, id)
    ctx.body = '上传头像成功'
  }
}

module.exports = new FileController()
