'use strict'

const Fastify = require('fastify')
const tap = require('tap')
const jwt = require('@fastify/jwt')
const leveldb = require('@fastify/leveldb')
const { rimrafSync } = require('rimraf')

function build(opts = {}) {
  const fastify = Fastify(opts)

  fastify.register(jwt, { secret: 'supersecret' })
  fastify.register(leveldb, { name: 'authdb' })

  fastify.decorate('auth', function (functions, options = {}) {
    if (!Array.isArray(functions)) {
      throw new Error('You must give an array of functions to the auth function')
    }
    if (functions.length === 0) {
      throw new Error('Missing auth functions')
    }
    if (options.relation && !['or', 'and'].includes(options.relation)) {
      throw new Error("The value of options.relation should be one of ['or', 'and']")
    }
    if (options.run && options.run !== 'all') {
      throw new Error("The value of options.run must be 'all'")
    }
    // ... rest of auth implementation
  })

  fastify.decorate('verifyJWTandLevelDB', function (request, reply, done) {
    const jwt = this.jwt
    const level = this.level.authdb

    if (request.body && request.body.failureWithReply) {
      reply.code(401).send({ error: 'Unauthorized' })
      return done(new Error())
    }

    if (!request.raw.headers.auth) {
      return done(new Error('Missing token header'))
    }

    jwt.verify(request.raw.headers.auth, (err, decoded) => {
      if (err || !decoded.user || !decoded.password) {
        return done(new Error('Token not valid'))
      }

      level.get(decoded.user, (err, password) => {
        if (err) {
          if (err.notFound) {
            return done(new Error('Token not valid'))
          }
          return done(err)
        }

        if (!password || password !== decoded.password) {
          return done(new Error('Token not valid'))
        }

        done()
      })
    })
  })

  fastify.decorate('verifyUserAndPassword', function (request, reply, done) {
    const level = this.level.authdb

    if (!request.body || !request.body.user) {
      return done(new Error('Missing user in request body'))
    }

    level.get(request.body.user, (err, password) => {
      if (err) {
        if (err.notFound) {
          return done(new Error('Password not valid'))
        }
        return done(err)
      }

      if (!password || password !== request.body.password) {
        return done(new Error('Password not valid'))
      }

      done()
    })
  })

  fastify.post('/register', {
    schema: {
      body: {
        type: 'object',
        properties: {
          user: { type: 'string' },
          password: { type: 'string' }
        },
        required: ['user', 'password']
      }
    },
    handler: (req, reply) => {
      req.log.info('Creating new user')
      fastify.level.authdb.put(req.body.user, req.body.password, (err) => {
        if (err) return reply.send(err)
        fastify.jwt.sign(req.body, (err, token) => {
          if (err) return reply.send(err)
          req.log.info('User created')
          reply.send({ token })
        })
      })
    }
  })

  fastify.get('/no-auth', (req, reply) => {
    req.log.info('Auth free route')
    reply.send({ hello: 'world' })
  })

  fastify.get('/auth', {
    preHandler: fastify.auth([fastify.verifyJWTandLevelDB]),
    handler: (req, reply) => {
      req.log.info('Auth route')
      reply.send({ hello: 'world' })
    }
  })

  fastify.post('/auth-multiple', {
    preHandler: fastify.auth([fastify.verifyJWTandLevelDB, fastify.verifyUserAndPassword]),
    handler: (req, reply) => {
      req.log.info('Auth route')
      reply.send({ hello: 'world' })
    }
  })

  return fastify
}

// Tests
if (require.main === module) {
  tap.test('combined tests', async (t) => {
    rimrafSync('./authdb')
    const fastify = build()

    t.teardown(async () => {
      await fastify.close()
      rimrafSync('./authdb')
    })

    // Test route without auth
    const noAuthResponse = await fastify.inject({
      method: 'GET',
      url: '/no-auth'
    })
    t.same(JSON.parse(noAuthResponse.payload), { hello: 'world' }, 'No auth route works')

    // Test user registration
    const registerResponse = await fastify.inject({
      method: 'POST',
      url: '/register',
      payload: {
        user: 'testuser',
        password: 'testpass'
      }
    })
    const { token } = JSON.parse(registerResponse.payload)
    t.type(token, 'string', 'Registration returns a token')

    // Test successful auth
    const authResponse = await fastify.inject({
      method: 'GET',
      url: '/auth',
      headers: {
        auth: token
      }
    })
    t.same(JSON.parse(authResponse.payload), { hello: 'world' }, 'Auth route works with valid token')

    // Test failed auth
    const failedAuthResponse = await fastify.inject({
      method: 'GET',
      url: '/auth',
      headers: {
        auth: 'invalid_token'
      }
    })
    t.equal(failedAuthResponse.statusCode, 401, 'Auth fails with invalid token')

    t.end()
  })
} else {
  // Start server if not in test mode
  const fastify = build({
    logger: {
      level: 'info'
    }
  })
  fastify.listen({ port: 3000 }, err => {
    if (err) throw err
  })
}

module.exports = build