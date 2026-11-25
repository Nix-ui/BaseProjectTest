import 'dotenv/config';
import LocalTddStore from './localTddStore.js';
import { redactError } from './db-security.js';

export async function initializeSchema({ local = true, dbPath = null } = {}) {
  let localStore = null;
  try {
    if (local) {
      localStore = new LocalTddStore({ dbPath });
      await localStore.initialize();
      console.log(`[init-db] Esquema SQLite inicializado en: ${localStore.dbPath}`);
    }
    return { ok: true };
  } finally {
    if (localStore) {
      await localStore.close();
    }
  }
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const local = args.has('--local') || args.has('--all') || (!args.has('--remote'));
  try {
    await initializeSchema({ local });
    process.exit(0);
  } catch (error) {
    console.error('[init-db] Error:', redactError(error));
    process.exit(1);
  }
}

if (process.argv[1] && process.argv[1].endsWith('init-db.js')) {
  main();
}
