import { Suspense } from 'react'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Cursor } from '@/components/Cursor'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Toaster } from 'sonner'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <>
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <div className="grain min-h-screen bg-background text-foreground">
        <Navbar />
        {children}
        <Footer />
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: 'rounded-sm border border-border bg-card text-card-foreground',
          },
        }}
      />
      {isDraftMode && (
        <Suspense>
          <VisualEditing />
        </Suspense>
      )}
    </>
  )
}
