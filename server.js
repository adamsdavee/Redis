const redis = require("redis")

const client = redis.createClient({
   host: "localhost", // The redis server for dev will be hosted locally
   port: 6379, // Default installation port when redis was installed
})

// event listener
client.on("error", (err) => console.log(`An error occurred: ${err}`))

async function testRedisConnection() {
   try {
      await client.connect()
      console.log("connected to Redis successfully")

      await client.set("name", "Dave")
      const extractedValue = await client.get("name")

      console.log(extractedValue)

      const deletedCOunt = await client.del("name")
      console.log(deletedCOunt)

      console.log(await client.get("name"))

      await client.set("count", "100")
      const increment = await client.incr("count")

      console.log(increment)

      const decrement = await client.decr("count")

      console.log(decrement)

      await client.decr("count")
      await client.decr("count")
      await client.decr("count")
      await client.decr("count")

      console.log(await client.get("count"))
   } catch (error) {
      console.error(error)
   } finally {
      await client.quit()
   }
}

testRedisConnection()
