const Fastify = require('fastify')

function build (opts) {
  const fastify = Fastify(opts)
  fastify.register(require('@fastify/jwt'), { secret: 'supersecret' })
  fastify.register(require('@fastify/leveldb'), { name: 'authdb-async' })
  fastify.register(require('../auth'))
  fastify.register(routes)