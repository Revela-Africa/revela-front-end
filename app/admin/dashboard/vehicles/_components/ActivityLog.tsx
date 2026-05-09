import { GetInspectorByIdDocument } from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client/react";
import { Phone, Mail, MapPin, User, AlertCircle } from "lucide-react";

export function ActivityLog({ inspectorId }: { inspectorId: string }) {
  const { data, loading } = useQuery(GetInspectorByIdDocument, {
    variables: { inspectorId },
    skip: !inspectorId || inspectorId === "",
  });

  const inspector = data?.getInspectorById;

  // ── Unassigned state ─────────────────────────────
  if (!inspectorId || inspectorId === "") {
    return (
      <div className="rounded-2xl border border-border bg-white p-5">
        <h3 className="mb-3 text-sm font-bold text-foreground">
          Assigned Inspector
        </h3>
        <div className="flex flex-col items-center justify-center py-5 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <AlertCircle size={18} className="text-muted-foreground" />
          </div>
          <p className="mt-2 text-xs font-medium text-muted-foreground">
            This vehicle hasn't been assigned to an inspector yet
          </p>
        </div>
      </div>
    );
  }

  // ── Loading skeleton ─────────────────────────────
  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-white p-5">
        <h3 className="mb-3 text-sm font-bold text-foreground">
          Assigned Inspector
        </h3>
        <div className="flex animate-pulse items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-24 rounded-md bg-muted" />
            <div className="h-2.5 w-16 rounded-md bg-muted" />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <div className="h-9 flex-1 rounded-xl bg-muted" />
          <div className="h-9 flex-1 rounded-xl bg-muted" />
        </div>
      </div>
    );
  }

  // ── Error / not found ────────────────────────────
  if (!inspector) {
    return (
      <div className="rounded-2xl border border-border bg-white p-5">
        <h3 className="mb-3 text-sm font-bold text-foreground">
          Assigned Inspector
        </h3>
        <p className="text-xs text-muted-foreground">Inspector not found</p>
      </div>
    );
  }

  // ── Inspector card ───────────────────────────────
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <h3 className="mb-3 text-sm font-bold text-foreground">
        Assigned Inspector
      </h3>

      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF7E4]">
          <User size={18} className="text-[#E8A020]" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-bold text-foreground">
              {inspector.fullName}
            </p>
            <span
              className={`inline-block h-2 w-2 shrink-0 rounded-full ${
                inspector.isAvailable ? "bg-green-500" : "bg-gray-300"
              }`}
              title={inspector.isAvailable ? "Available" : "Unavailable"}
            />
          </div>

          {inspector.region ? (
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin size={11} />
              {inspector.region}
            </p>
          ) : (
            <p className="mt-0.5 text-xs text-muted-foreground">
              No region set
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {inspector.phone ? (
          <a
            href={`tel:${inspector.phone}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#F7F2EB] py-2.5 text-xs font-semibold text-[#171D17] transition-colors hover:bg-[#E7E1D8]"
          >
            <Phone size={13} className="text-[#E8A020]" />
            Call
          </a>
        ) : (
          <span className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-1.5 rounded-xl bg-muted py-2.5 text-xs font-semibold text-muted-foreground">
            <Phone size={13} />
            No phone
          </span>
        )}

        <a
          href={`mailto:${inspector.email}`}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#F7F2EB] py-2.5 text-xs font-semibold text-[#171D17] transition-colors hover:bg-[#E7E1D8]"
        >
          <Mail size={13} className="text-[#E8A020]" />
          Email
        </a>
      </div>
    </div>
  );
}
