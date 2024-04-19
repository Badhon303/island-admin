import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import TypeClient from "./type-components/client"
import CategoryClient from "./category-components/client"
import ProductClient from "./product-components/client"

export default async function TypePage() {
  return (
    <>
      <div className="p-6 bg-background rounded-3xl mb-2 shadow-basic space-y-2">
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
                <span className="loader2"></span>
              </div>
            }
          >
            <TypeClient />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="p-6 bg-background rounded-3xl mb-2 shadow-basic space-y-2">
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
                <span className="loader2"></span>
              </div>
            }
          >
            <CategoryClient />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="p-6 bg-background rounded-3xl mb-2 shadow-basic space-y-2">
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
                <span className="loader2"></span>
              </div>
            }
          >
            <ProductClient />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  )
}
