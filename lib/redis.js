import Redis from "ioredis";

const redis = new Redis();
const bucketName = "notes";

const initialData = {
  1702459181837:
    '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459182837:
    '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459188837:
    '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}'
};

//获取全部笔记
export async function getAllNotes() {
  const data = await redis.hgetall(bucketName);
  if (Object.keys(data).length === 0) {
    await redis.hmset(bucketName, initialData);
  }
  return await redis.hgetall(bucketName);
}

//添加笔记
export async function addNote(data) {
  const uuid = Date.now().toString();
  await redis.hset(bucketName, [uuid], data);
  return uuid;
}

//更新笔记
export async function updateNote(uuid, data) {
  await redis.hset(bucketName, [uuid], data);
}

//根据uuid获取笔记
export async function getNote(uuid) {
  return JSON.parse(await redis.hget(bucketName, uuid));
}

//删除笔记
export async function delNote(uuid) {
  return redis.hdel(bucketName, uuid);
}
