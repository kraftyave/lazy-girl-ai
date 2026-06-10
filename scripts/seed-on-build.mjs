import { createRequire } from 'node:module'
import { spawnSync } from 'node:child_process'

const require = createRequire(import.meta.url)
require('@next/env/config')

const result = spawnSync('npx', ['tsx', 'scripts/seed-posts.ts'], {
  stdio: 'inherit',
  env: process.env,
})

process.exit(result.status ?? 1)