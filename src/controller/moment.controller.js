const momentService = require('../service/moment.service')
const {
  create,
  getMomentById,
  getMomentList
} = require('../service/moment.service')

class momentController {
  async create(ctx, next) {
    // 1.获取数据（user_id, content）
    const userId = ctx.user.id
    const content = ctx.request.body.content
    console.log(userId, content)

    // 2.将数据插入到数据库中
    const result = await create(userId, content)
    ctx.body = result
  }

  async detail(ctx, next) {
    // 1.获取数据 (momentId)
    const momentId = ctx.params.momentId

    // 2.根据 id 去查询这条数据
    const result = await getMomentById(momentId)
    ctx.body = result
  }

  async list(ctx, next) {
    // 1.获取数据（offset/size）
    const { offset, size } = ctx.query

    // 2.查询列表
    const result = await getMomentList(offset, size)
    ctx.body = result
  }

  async update(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    const result = await momentService.update(content, momentId)
    ctx.body = result
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params
    const result = await momentService.remove(momentId)
    ctx.body = result
  }
}

module.exports = new momentController()
