'use server'
import { handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from '../importMap.js'

export const serverFunctions = async ({ name, args }: { name: string; args: Record<string, unknown> }) => {
  return handleServerFunctions({ name, args, config, importMap })
}
