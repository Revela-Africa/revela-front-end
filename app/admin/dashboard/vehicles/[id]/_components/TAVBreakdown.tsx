import { PhotoStrip } from "./PhotoStrip";

interface InspectionReport {
  condition?: string | null;
  mileage?: number | null;
  structuralDamage?: boolean | null;
  mechanicalOverhaul?: boolean | null;
  serviceHistory?: string | null;
  drivetrain?: string | null;
  engineType?: string | null;
  transmission?: string | null;
  notes?: string | null;
  photoUrls?: string[] | null;
}

interface Props {
  // Original submission data
  tav: number | null;
  min: number | null | undefined;
  max: number | null | undefined;
  condition?: string | null;
  mileage?: number | null;
  structuralDamage?: boolean | null;
  mechanicalOverhaul?: boolean | null;
  serviceHistory?: string | null;
  drivetrain?: string | null;
  engineType?: string | null;
  transmission?: string | null;

  // Post-inspection AI reevaluation
  reevaluationTav?: number | null;
  reevaluationGrade?: string | null;

  // Inspector's submitted report
  inspectionReport?: InspectionReport | null;
}

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString()}`;
}

function DiffRow({
  label,
  original,
  updated,
}: {
  label: string;
  original: string | boolean | null | undefined;
  updated: string | boolean | null | undefined;
}) {
  const orig = String(original ?? "—").replace(/_/g, " ");
  const upd = String(updated ?? "—").replace(/_/g, " ");
  const changed = orig !== upd && updated != null;

  return (
    <div className="grid grid-cols-3 gap-2 py-2.5 border-b border-border last:border-0 items-start">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xs font-medium text-foreground">{orig}</p>
      <p
        className={`text-xs font-bold ${changed ? "text-orange-600" : "text-foreground"}`}
      >
        {upd}
        {changed && (
          <span className="ml-1 text-[10px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded-full">
            Changed
          </span>
        )}
      </p>
    </div>
  );
}

export function TAVBreakdown({
  tav,
  min,
  max,
  condition,
  mileage,
  structuralDamage,
  mechanicalOverhaul,
  serviceHistory,
  drivetrain,
  engineType,
  transmission,
  reevaluationTav,
  reevaluationGrade,
  inspectionReport,
}: Props) {
  const hasInspectionData = !!inspectionReport;
  const hasReevaluation = !!reevaluationTav;

  return (
    <div className="space-y-4">
      {/* ── TAV Comparison ────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-border p-4">
        <p className="text-sm font-bold text-foreground mb-4">
          Total Asset Valuation
        </p>

        {hasReevaluation ? (
          // Side by side comparison
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-muted/40 border border-border">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
                Initial TAV
              </p>
              <p className="text-xl font-bold text-foreground">
                {tav ? formatNaira(tav) : "—"}
              </p>
              {min && max && (
                <p className="text-[10px] text-muted-foreground mt-1">
                  ₦{min.toLocaleString()} — ₦{max.toLocaleString()}
                </p>
              )}
            </div>
            <div className="p-3 rounded-xl bg-[#FFF7E4] border border-[#E8A020]/30">
              <p className="text-[10px] text-[#E8A020] uppercase tracking-widest mb-1 font-bold">
                Reevaluated TAV
              </p>
              <p className="text-xl font-bold text-[#E8A020]">
                {formatNaira(reevaluationTav)}
              </p>
              {reevaluationGrade && (
                <span className="inline-block text-[10px] font-bold bg-[#E8A020] text-white px-2 py-0.5 rounded-full mt-1">
                  Grade {reevaluationGrade}
                </span>
              )}
            </div>
          </div>
        ) : tav ? (
          // Single TAV — no reevaluation yet
          <div className="mb-4">
            <p className="text-3xl font-bold text-[#E8A020]">
              {formatNaira(tav)}
            </p>
            {min && max && (
              <p className="text-xs text-muted-foreground mt-1">
                Range: ₦{min.toLocaleString()} — ₦{max.toLocaleString()}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mb-4">
            TAV not yet generated
          </p>
        )}

        {/* TAV change indicator */}
        {tav && reevaluationTav && (
          <div
            className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold ${
              reevaluationTav > tav
                ? "bg-green-50 text-green-700"
                : reevaluationTav < tav
                  ? "bg-red-50 text-red-600"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {reevaluationTav > tav ? "↑" : reevaluationTav < tav ? "↓" : "→"}{" "}
            {reevaluationTav === tav
              ? "No change after inspection"
              : `${reevaluationTav > tav ? "Increased" : "Decreased"} by ${formatNaira(Math.abs(reevaluationTav - tav))} after inspection`}
          </div>
        )}
      </div>

      {/* ── Field Comparison ──────────────────────────────── */}
      {hasInspectionData && (
        <div className="bg-white rounded-2xl border border-border p-4">
          <p className="text-sm font-bold text-foreground mb-3">
            Field Comparison
          </p>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Field
            </p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Submitted
            </p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Inspector
            </p>
          </div>
          <DiffRow
            label="Condition"
            original={condition}
            updated={inspectionReport.condition}
          />
          <DiffRow
            label="Mileage"
            original={mileage ? `${mileage.toLocaleString()} km` : null}
            updated={
              inspectionReport.mileage
                ? `${inspectionReport.mileage.toLocaleString()} km`
                : null
            }
          />
          <DiffRow
            label="Drivetrain"
            original={drivetrain}
            updated={inspectionReport.drivetrain}
          />
          <DiffRow
            label="Engine"
            original={engineType}
            updated={inspectionReport.engineType}
          />
          <DiffRow
            label="Transmission"
            original={transmission}
            updated={inspectionReport.transmission}
          />
          <DiffRow
            label="Structural Damage"
            original={structuralDamage ? "Yes" : "No"}
            updated={
              inspectionReport.structuralDamage != null
                ? inspectionReport.structuralDamage
                  ? "Yes"
                  : "No"
                : null
            }
          />
          <DiffRow
            label="Mech. Overhaul"
            original={mechanicalOverhaul ? "Yes" : "No"}
            updated={
              inspectionReport.mechanicalOverhaul != null
                ? inspectionReport.mechanicalOverhaul
                  ? "Yes"
                  : "No"
                : null
            }
          />
          <DiffRow
            label="Service History"
            original={serviceHistory}
            updated={inspectionReport.serviceHistory}
          />
        </div>
      )}

      {/* ── Inspector Notes ───────────────────────────────── */}
      {inspectionReport?.notes && (
        <div className="bg-white rounded-2xl border border-border p-4">
          <p className="text-sm font-bold text-foreground mb-2">
            Inspector Notes
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {inspectionReport.notes}
          </p>
        </div>
      )}

      {/* ── Inspector Photos ──────────────────────────────── */}
      {inspectionReport?.photoUrls && inspectionReport.photoUrls.length > 0 && (
        <PhotoStrip images={inspectionReport.photoUrls} />
      )}

      {/* ── Pending state ─────────────────────────────────── */}
      {!hasInspectionData && (
        <div className="bg-white rounded-2xl border border-border p-4 text-center space-y-1">
          <p className="text-sm font-bold text-foreground">
            Awaiting Inspection Report
          </p>
          <p className="text-xs text-muted-foreground">
            Field comparison and reevaluated TAV will appear once the inspector
            submits their report
          </p>
        </div>
      )}
    </div>
  );
}
