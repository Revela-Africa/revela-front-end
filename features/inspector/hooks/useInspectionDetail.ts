import { useQuery, useMutation } from "@apollo/client/react"
import {
  GetInspectionByIdDocument,
  StartAssessmentDocument,
} from "@/graphql/generated/graphql"
import { appToast } from "@/lib/toast"
import { useRouter } from "next/navigation"

export interface AssessmentPayload {
  notes: string
  photoUrls: string[]
  mileage?: number
  condition: string
  structuralDamage: boolean
  mechanicalOverhaul: boolean
  serviceHistory: string
  drivetrain: string
  engineType: string
  transmission: string
}

export function useInspectionDetail(vehicleId: string) {
  const router = useRouter()

  const { data, loading, error } = useQuery(GetInspectionByIdDocument, {
    variables: { vehicleId },
    skip: !vehicleId,
    fetchPolicy: "cache-and-network",
  })

  const vehicle = data?.getInspectionById

  const [startAssessment, { loading: submitting }] = useMutation(
    StartAssessmentDocument,
    {
      onCompleted: () => {
        appToast.success({
          title: "Assessment submitted",
          description: "Your report has been sent to admin",
        })
        router.push("/dashboard")
      },
      onError: (err) => {
        appToast.error({
          title: "Submission failed",
          description: err.message,
        })
      },
    }
  )

  async function handleSubmit(payload: AssessmentPayload) {
    if (!vehicleId) return
    await startAssessment({
      variables: {
        input: {
          vehicleId,
          ...payload,
        },
      },
    })
  }

  return {
    vehicle,
    loading,
    error,
    submitting,
    handleSubmit,
  }
}