export function generateFakeTAV(condition: string, year: string): number {
  const base = 3000000
  const conditionMultiplier =
    condition === "GOOD" ? 1.4 : condition === "FAIR" ? 1.1 : 0.8
  const age = new Date().getFullYear() - Number(year)
  const ageMultiplier = Math.max(0.5, 1 - age * 0.04)
  const random = 0.9 + Math.random() * 0.2
  return Math.round(base * conditionMultiplier * ageMultiplier * random)
}