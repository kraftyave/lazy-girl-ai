import { RootLayout } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from '@/app/(payload)/importMap.js'
import { serverFunctions } from '../serverFunctions'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunctions}>
      {children}
    </RootLayout>
  )
}
