const {
  create,
  getMomentById,
  getMomentList,
  update,
  remove,
  hasLabel,
  addLabel
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
    const result = await update(content, momentId)
    ctx.body = result
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params
    const result = await remove(momentId)
    ctx.body = result
  }

  async addLabels(ctx, next) {
    const { labels } = ctx
    const { momentId } = ctx.params

    for (let label of labels) {
      const isExists = await hasLabel(momentId, label.id)
      if (!isExists) {
        await addLabel(momentId, label.id)
      }
    }
    ctx.body = '给动态添加标签成功'
  }
}

module.exports = new momentController()
