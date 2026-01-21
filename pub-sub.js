const redis = require("redis")

const client = redis.createClient({
   host: "localhost",
   port: 6379,
})

client.on("error", (err) => {
   console.log(`Error in connecting to Redis: ${err}`)
})

async function testAdditionalFeatures() {
   try {
      await client.connect()

      const subscriber = await client.duplicate()
      await subscriber.connect() // connect to the redis server

      await subscriber.subscribe("dummy-channel", (message, channel) => {
         console.log(`Received message from ${channel}: ${message}`)
      })

      // publish messsage to dummy channel

      await client.publish("dummy-channel", "First message from David")
      await client.publish("dummy-channel", "Second message from David")

      await new Promise((resolve) => setTimeout(resolve, 3000))

      await subscriber.unsubscribe("dummy-channel")
      await subscriber.quit()
   } catch (error) {
      console.error(error)
   } finally {
      await client.quit()
   }
}

testAdditionalFeatures()
