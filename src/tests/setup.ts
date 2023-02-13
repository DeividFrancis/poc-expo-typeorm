import { conn } from "../configs/db";

// beforeAll(async () => {
//   return await conn.initialize();
// });

beforeAll(async () => {
  await conn.initialize();
});

afterEach(async () => {
  await clearData();
});

async function clearData() {
  const connection = conn;
  const queryRunner = connection.createQueryRunner();

  await queryRunner.startTransaction();
  try {
    await queryRunner.query("DELETE FROM tasks");
    await queryRunner.query("DELETE FROM todos");
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
}
