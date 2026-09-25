/**
 * Creates an admin portal account, or resets the password of an existing one.
 *
 * Run from `apps/back-end` (reads DB_HOST / DB_NAME / DB_USER / DB_PASS from `.env`):
 *   node scripts/create-admin.mjs <email> '<password>'
 *
 * The `admin` table is created by TypeORM when the back-end first starts, so start it once
 * before running this. Connects to the same database as `app.module.ts`.
 */
import bcrypt from 'bcryptjs';
import pg from 'pg';

const [email, password] = process.argv.slice(2);
if (!email || !password) {
  console.error("Usage: node scripts/create-admin.mjs <email> '<password>'");
  process.exit(1);
}
if (password.length < 12) {
  console.error('Use a password of at least 12 characters.');
  process.exit(1);
}

try {
  process.loadEnvFile('.env');
} catch {
  // Fall back to variables already in the environment
}

const host = process.env.DB_HOST || '127.0.0.1';
const client = new pg.Client({
  host,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // SSL for the public IP; off for the local Cloud SQL Auth Proxy
  ssl: ['127.0.0.1', 'localhost'].includes(host) ? false : { rejectUnauthorized: false },
});

await client.connect();
try {
  const passwordHash = await bcrypt.hash(password, 12);
  const { rows } = await client.query(
    `INSERT INTO admin (email, "passwordHash")
     VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET "passwordHash" = EXCLUDED."passwordHash", "updatedAt" = now()
     RETURNING id, (xmax = 0) AS created`,
    [email.trim().toLowerCase(), passwordHash],
  );
  console.log(`${rows[0].created ? 'Created' : 'Updated password for'} admin ${email} (${rows[0].id})`);
} catch (error) {
  if (error.code === '42P01') {
    console.error('The admin table does not exist yet. Start the back-end once so TypeORM creates it.');
  } else {
    console.error(error.message);
  }
  process.exitCode = 1;
} finally {
  await client.end();
}
