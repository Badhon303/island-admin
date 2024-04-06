import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import RawClient from "./components/client"

export default async function RawPage() {
  return (
    <ErrorBoundary
      fallback={
        <div className="flex w-full items-center justify-center">
          Something went wrong 😥🙃
        </div>
      }
    >
      <Suspense
        fallback={
          <div className="flex w-full items-center justify-center">
            Loading...
          </div>
        }
      >
        <RawClient />
      </Suspense>
    </ErrorBoundary>
  )
}
