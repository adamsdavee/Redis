const redis = require("redis")

const client = redis.createClient({
   host: "localhost", // The redis server for dev will be hosted locally
   port: 6379, // Default installation port when redis was installed
})

// event listener
client.on("error", (err) => console.log(`An error occurred: ${err}`))

async function redisDataStructure() {
   try {
      await client.connect()

      // Strings -> SET, GET, MGET, MSET

      //   await client.set("user:name", "Dave")
      //   console.log(await client.get("user:name"))

      //   await client.mSet([
      //      "user:email",
      //      "dave@gmail.com",
      //      "user:age",
      //      "24",
      //      "user:country",
      //      "Nigeria",
      //   ])
      //   const [email, age, country] = await client.mGet([
      //      "user:email",
      //      "user:age",
      //      "user:country",
      //   ])

      //   console.log(email, age, country)

      //   // Lists -> LPUSH, RPUSH, LRANGE, LPOP, RPOP
      //   //   await client.lPush("notes", ["note 1", "note 2", "note 3"])
      //   const extractNotes = await client.lRange("notes", 0, -1)
      //   console.log(extractNotes)

      //   const firstNote = await client.lPop("notes")
      //   console.log(firstNote)

      //   // sets -> SADD, SMEMBERS, SISMEMBER, SREM
      //   await client.sAdd("user:nickName", ["John", "verun", "xyz"])
      //   const extractValue = await client.sMembers("user:nickName")
      //   console.log(extractValue)

      //   const isVerunMemberOfNickName = await client.sIsMember(
      //      "user:nickName",
      //      "verun",
      //   )
      //   console.log(isVerunMemberOfNickName)

      //   await client.sRem("user:nickName", "xyz")

      //   const getUpdatedNickNames = await client.sMembers("user:nickName")
      //   console.log(getUpdatedNickNames)

      // sorted sets
      // ZADD, ZRANGE, ZRANK, ZREM
      //   await client.zAdd("cart", [
      //      { score: 100, value: "Cart 1" },
      //      { score: 150, value: "Cart 2" },
      //      { score: 10, value: "Cart 3" },
      //   ])

      //   const topCartItems = await client.zRange("cart", 0, -1)
      //   console.log(topCartItems)

      //   const extractAllCartItemsWithScores = await client.zRangeWithScores(
      //      "cart",
      //      0,
      //      -1,
      //   )
      //   console.log(extractAllCartItemsWithScores)

      //   const cartTwoRank = await client.zRank("cart", "Cart 1")
      //   console.log(cartTwoRank)

      // hashes -> HSET, HGET, HGETALL, HDEL

      await client.hSet("product:1", {
         name: "Product 1",
         description: "Product 1 description",
         rating: "5",
      })

      const getProductRating = await client.hGet("product:1", "rating")
      console.log(getProductRating)

      const getProductDetails = await client.hGetAll("product:1")
      console.log(getProductDetails)

      await client.hDel("product:1", "rating")

      console.log(await client.hGetAll("product:1"))
   } catch (error) {
      console.error(error)
   } finally {
      await client.quit()
   }
}

redisDataStructure()
