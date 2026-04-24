export const VEHICLE_MAKES = [
  "Acura", "Alfa Romeo", "Aston Martin", "Audi",
  "Bentley", "BMW", "Bugatti", "Buick",
  "Cadillac", "Chevrolet", "Chrysler", "Citroën",
  "Dacia", "Daewoo", "Daihatsu", "Dodge",
  "Ferrari", "Fiat", "Ford",
  "Genesis", "GMC",
  "Honda", "Hummer", "Hyundai",
  "Infiniti", "Isuzu",
  "Jaguar", "Jeep",
  "Kia",
  "Lamborghini", "Land Rover", "Lexus", "Lincoln",
  "Maserati", "Mazda", "McLaren", "Mercedes-Benz",
  "Mercury", "Mini", "Mitsubishi",
  "Nissan",
  "Oldsmobile", "Opel",
  "Peugeot", "Pontiac", "Porsche",
  "Ram", "Renault", "Rolls-Royce",
  "Saab", "Saturn", "Seat", "Skoda", "Smart",
  "Subaru", "Suzuki",
  "Tesla", "Toyota",
  "Volkswagen", "Volvo",
] as const

export type VehicleMake = typeof VEHICLE_MAKES[number]

// Models per make — Nigerian market focused
export const VEHICLE_MODELS: Record<string, string[]> = {
  "Toyota": [
    "Camry", "Corolla", "Avalon", "Venza", "Highlander",
    "4Runner", "Land Cruiser", "Prado", "RAV4", "C-HR",
    "Yaris", "Sienna", "Tacoma", "Tundra", "Sequoia",
    "Fortuner", "Hilux", "Rush",
  ],
  "Honda": [
    "Accord", "Civic", "CR-V", "HR-V", "Pilot",
    "Odyssey", "Passport", "Ridgeline", "Fit", "Element",
  ],
  "Hyundai": [
    "Elantra", "Sonata", "Tucson", "Santa Fe", "Palisade",
    "Kona", "Venue", "Accent", "Azera", "Genesis",
  ],
  "Kia": [
    "Sorento", "Sportage", "Telluride", "Stinger",
    "Optima", "K5", "Forte", "Rio", "Soul", "Carnival",
  ],
  "Ford": [
    "F-150", "Explorer", "Escape", "Edge", "Expedition",
    "Mustang", "Ranger", "Bronco", "Focus", "Fusion",
  ],
  "BMW": [
    "3 Series", "5 Series", "7 Series", "X1", "X3",
    "X5", "X6", "X7", "M3", "M5", "M8", "Z4",
  ],
  "Mercedes-Benz": [
    "C-Class", "E-Class", "S-Class", "GLC", "GLE",
    "GLS", "GLA", "GLB", "A-Class", "CLA", "AMG GT",
  ],
  "Audi": [
    "A3", "A4", "A5", "A6", "A7", "A8",
    "Q3", "Q5", "Q7", "Q8", "TT", "R8",
  ],
  "Volkswagen": [
    "Golf", "Passat", "Tiguan", "Touareg", "Jetta",
    "Polo", "Arteon", "Atlas", "ID.4",
  ],
  "Nissan": [
    "Altima", "Maxima", "Sentra", "Versa", "Rogue",
    "Murano", "Pathfinder", "Armada", "Frontier", "Titan", "370Z",
  ],
  "Lexus": [
    "ES", "IS", "GS", "LS", "RX", "NX",
    "GX", "LX", "UX", "LC", "RC",
  ],
  "Land Rover": [
    "Range Rover", "Range Rover Sport", "Range Rover Evoque",
    "Range Rover Velar", "Discovery", "Discovery Sport", "Defender",
  ],
  "Jeep": [
    "Wrangler", "Grand Cherokee", "Cherokee", "Compass",
    "Renegade", "Gladiator", "Commander",
  ],
  "Chevrolet": [
    "Silverado", "Tahoe", "Suburban", "Equinox", "Traverse",
    "Blazer", "Malibu", "Camaro", "Corvette", "Colorado",
  ],
  "Porsche": [
    "911", "Cayenne", "Macan", "Panamera", "Taycan", "Boxster",
  ],
  "Mazda": [
    "Mazda3", "Mazda6", "CX-3", "CX-5", "CX-8", "CX-9", "MX-5",
  ],
  "Subaru": [
    "Outback", "Forester", "Impreza", "Legacy",
    "Crosstrek", "Ascent", "WRX", "BRZ",
  ],
  "Mitsubishi": [
    "Outlander", "Eclipse Cross", "Pajero", "L200",
    "Galant", "Lancer", "Montero",
  ],
  "Volvo": [
    "XC40", "XC60", "XC90", "S60", "S90", "V60", "V90",
  ],
  "Tesla": [
    "Model 3", "Model S", "Model X", "Model Y", "Cybertruck",
  ],
  "Peugeot": [
    "208", "308", "508", "2008", "3008", "5008",
  ],
  "Renault": [
    "Clio", "Megane", "Laguna", "Koleos", "Duster", "Kadjar",
  ],
  "Acura": [
    "TLX", "ILX", "RDX", "MDX", "NSX",
  ],
  "Infiniti": [
    "Q50", "Q60", "QX50", "QX60", "QX80",
  ],
  "Cadillac": [
    "CT4", "CT5", "Escalade", "XT4", "XT5", "XT6",
  ],
  "Buick": [
    "Enclave", "Encore", "Envision", "LaCrosse",
  ],
  "GMC": [
    "Sierra", "Yukon", "Terrain", "Acadia", "Canyon",
  ],
  "Dodge": [
    "Charger", "Challenger", "Durango", "Journey",
  ],
  "Ram": [
    "1500", "2500", "3500", "ProMaster",
  ],
  "Isuzu": [
    "D-Max", "MU-X", "Trooper", "Rodeo",
  ],
  "Suzuki": [
    "Swift", "Vitara", "Jimny", "S-Cross", "Baleno",
  ],
  "Daihatsu": [
    "Terios", "Sirion", "Move", "Charade",
  ],
}