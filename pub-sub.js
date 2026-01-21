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

      //   const subscriber = await client.duplicate()
      //   await subscriber.connect() // connect to the redis server

      //   await subscriber.subscribe("dummy-channel", (message, channel) => {
      //      console.log(`Received message from ${channel}: ${message}`)
      //   })

      //   // publish messsage to dummy channel

      //   await client.publish("dummy-channel", "First message from David")
      //   await client.publish("dummy-channel", "Second message from David")

      //   await new Promise((resolve) => setTimeout(resolve, 3000))

      //   await subscriber.unsubscribe("dummy-channel")
      //   await subscriber.quit()

      // pipelining and transactions
      //   const multi = await client.multi()

      //   multi.set("key-transaction1", "value-1")
      //   multi.set("key-transaction2", "value-2")
      //   multi.get("key-transaction1")
      //   multi.get("key-transaction2")

      //   const results = await multi.exec()
      //   console.log(results)

      //   // batch data operation
      //   const pipelineOne = await client.multi()

      //   for (i = 0; i < 1000; i++) {
      //      pipelineOne.set(`user:${i}:action`, `Action ${i}`)
      //   }

      //   await pipelineOne.exec()

      //   const dummyExample = await client.multi()
      //   multi.decrBy("account:1234:balance", 100)
      //   multi.incrBy("account:0000:balance", 100)

      //   const finalResults = await multi.exec()

      console.log("----------Performance testing-------------")
      console.time("Without pipeline")

      for (i = 0; i < 1000; i++) {
         await client.set(`user${i}`, `user_value: ${i}`)
      }

      console.timeEnd("Without pipeline")

      console.time("With pipeline")

      const pipeline = await client.multi()

      for (i = 0; i < 1000; i++) {
         pipeline.set(`user${i}`, `user_value: ${i}`)
      }

      const results = await pipeline.exec()
      //   console.log(results)
      console.timeEnd("With pipeline")
   } catch (error) {
      console.error(error)
   } finally {
      await client.quit()
   }
}

testAdditionalFeatures()
