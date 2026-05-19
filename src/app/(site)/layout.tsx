import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Cursor } from '@/components/Cursor'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Toaster } from 'sonner'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
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
    </>
  )
}
