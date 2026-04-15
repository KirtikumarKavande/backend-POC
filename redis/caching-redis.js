
export async function getUser(userId) {
  const cacheKey = `user:${userId}`;
  try {
    // 1. Try cache
    const cachedUser = await redisClient.get(cacheKey);

    if (cachedUser) {
      // ✅ Cache hit
      return JSON.parse(cachedUser);
    }

    // 2. Cache miss → Fetch from DB
    const user = await getUserFromDB(userId); // implement this
  
    // 3. Store in cache (TTL for freshness)
    await redisClient.set(cacheKey, JSON.stringify(user), {
      EX: 300 // 5 min TTL
    });

    return user;
  } catch (err) {
    console.error("Error in getUser:", err);

    // Fail-safe: fallback to DB
    return await getUserFromDB(userId);
  }
}


/**
 * Update user and invalidate cache
 */
async function updateUser(userId, updatePayload) {
  // 1. Update DB (source of truth)
  await db.user.update({
    where: { id: userId },
    data: updatePayload,
  });

  // 2. Invalidate cache
  await redis.del(`user:${userId}`);
}