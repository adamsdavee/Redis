const Redis = require("ioredis")

// Create a Redis instance.
// By default, it will connect to localhost:6379.
const redis = new Redis()

async function testIoRedis() {
   try {
      await redis.set("key", "value")
      const val = await redis.get("key")
      console.log(val)
   } catch (error) {
      console.error(error)
   } finally {
      redis.quit()
   }
}

testIoRedis()
