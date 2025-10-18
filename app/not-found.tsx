import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full px-6 text-center">
        <div className="mb-8">
          <h1 className="text-fluid-6xl font-heading font-bold text-gradient-full mb-4">
            404
          </h1>
          <h2 className="text-fluid-2xl font-heading text-foreground/80 mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-fluid-base">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="gradient" size="lg">
            <Link href="/">Go home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/admin">Admin panel</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
