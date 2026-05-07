/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query AdminGetAllVehicles {\n  adminGetAllVehicles {\n    id\n    status\n    make\n    model\n    year\n    mileage\n    condition\n    vin\n    tav\n    min\n    max\n    offer\n    serviceHistory\n    engineType\n    transmission\n    drivetrain\n    structuralDamage\n    mechanicalOverhaul\n    userId\n    agentName\n    agentPhone\n    scheduledAt\n    expiresAt\n    region\n    imageUrls {\n      imageUrl\n      angle\n    }\n  }\n}": typeof types.AdminGetAllVehiclesDocument,
    "query AdminGetUserSingleVehicle($vehicleId: String!) {\n  adminGetUserSingleVehicle(vehicleId: $vehicleId) {\n    id\n    status\n    make\n    model\n    year\n    mileage\n    condition\n    vin\n    tav\n    min\n    max\n    offer\n    serviceHistory\n    engineType\n    transmission\n    drivetrain\n    structuralDamage\n    mechanicalOverhaul\n    userId\n    agentName\n    agentPhone\n    scheduledAt\n    expiresAt\n    region\n    imageUrls {\n      imageUrl\n      angle\n    }\n  }\n}": typeof types.AdminGetUserSingleVehicleDocument,
    "mutation AssignInspector($vehicleId: String!, $inspectorId: String!) {\n  assignInspector(vehicleId: $vehicleId, inspectorId: $inspectorId) {\n    id\n    status\n    agentName\n    agentPhone\n  }\n}": typeof types.AssignInspectorDocument,
    "query GetAllInspectors {\n  getAllInspectors {\n    id\n    fullName\n    phone\n    email\n    region\n    isAvailable\n  }\n}": typeof types.GetAllInspectorsDocument,
    "query GetInspectorsByRegion($region: String!) {\n  getInspectorsByRegion(region: $region) {\n    id\n    fullName\n    phone\n    email\n    region\n    isAvailable\n  }\n}": typeof types.GetInspectorsByRegionDocument,
    "mutation initiateRegistration($input: InitiateRegistrationInput!) {\n  initiateRegistration(input: $input)\n}": typeof types.InitiateRegistrationDocument,
    "mutation login($input: LoginInput!) {\n  login(input: $input) {\n    accessToken\n    id\n    email\n    fullName\n    role\n  }\n}": typeof types.LoginDocument,
    "mutation Logout {\n  logout\n}": typeof types.LogoutDocument,
    "mutation RefreshToken {\n  refresh\n}": typeof types.RefreshTokenDocument,
    "mutation verifyMagicLink($token: String!) {\n  verifyMagicLink(token: $token) {\n    accessToken\n    id\n    email\n    fullName\n    role\n  }\n}": typeof types.VerifyMagicLinkDocument,
    "mutation verifyOtp($input: VerifyOtpInput!) {\n  verifyOtp(input: $input)\n}": typeof types.VerifyOtpDocument,
    "query GetSingleUserVehicle($vehicleId: String!) {\n  getSingleUserVehicle(vehicleId: $vehicleId) {\n    id\n    status\n    make\n    model\n    year\n    mileage\n    condition\n    drivetrain\n    engineType\n    transmission\n    mechanicalOverhaul\n    structuralDamage\n    serviceHistory\n    tav\n    min\n    max\n    offer\n    imageUrls {\n      imageUrl\n      angle\n    }\n    agentName\n    agentPhone\n    scheduledAt\n    expiresAt\n    bankName\n    accountNumber\n    collectionDate\n    timeSlot\n    collectionAddress\n    bookingReference\n  }\n}": typeof types.GetSingleUserVehicleDocument,
    "query GetVehiclesByUser {\n  getVehiclesByUser {\n    id\n    status\n    make\n    model\n    year\n    mileage\n    condition\n    tav\n    min\n    max\n    offer\n    imageUrls {\n      imageUrl\n      angle\n    }\n    scheduledAt\n    expiresAt\n  }\n}": typeof types.GetVehiclesByUserDocument,
    "mutation SubmitVehicle($input: SubmitVehicleInputType!) {\n  submitVehicle(input: $input) {\n    id\n    status\n    tav\n    min\n    max\n  }\n}": typeof types.SubmitVehicleDocument,
    "mutation SchedulePickup($input: SchedulePickupInputType!) {\n  schedulePickup(input: $input) {\n    id\n  }\n}": typeof types.SchedulePickupDocument,
};
const documents: Documents = {
    "query AdminGetAllVehicles {\n  adminGetAllVehicles {\n    id\n    status\n    make\n    model\n    year\n    mileage\n    condition\n    vin\n    tav\n    min\n    max\n    offer\n    serviceHistory\n    engineType\n    transmission\n    drivetrain\n    structuralDamage\n    mechanicalOverhaul\n    userId\n    agentName\n    agentPhone\n    scheduledAt\n    expiresAt\n    region\n    imageUrls {\n      imageUrl\n      angle\n    }\n  }\n}": types.AdminGetAllVehiclesDocument,
    "query AdminGetUserSingleVehicle($vehicleId: String!) {\n  adminGetUserSingleVehicle(vehicleId: $vehicleId) {\n    id\n    status\n    make\n    model\n    year\n    mileage\n    condition\n    vin\n    tav\n    min\n    max\n    offer\n    serviceHistory\n    engineType\n    transmission\n    drivetrain\n    structuralDamage\n    mechanicalOverhaul\n    userId\n    agentName\n    agentPhone\n    scheduledAt\n    expiresAt\n    region\n    imageUrls {\n      imageUrl\n      angle\n    }\n  }\n}": types.AdminGetUserSingleVehicleDocument,
    "mutation AssignInspector($vehicleId: String!, $inspectorId: String!) {\n  assignInspector(vehicleId: $vehicleId, inspectorId: $inspectorId) {\n    id\n    status\n    agentName\n    agentPhone\n  }\n}": types.AssignInspectorDocument,
    "query GetAllInspectors {\n  getAllInspectors {\n    id\n    fullName\n    phone\n    email\n    region\n    isAvailable\n  }\n}": types.GetAllInspectorsDocument,
    "query GetInspectorsByRegion($region: String!) {\n  getInspectorsByRegion(region: $region) {\n    id\n    fullName\n    phone\n    email\n    region\n    isAvailable\n  }\n}": types.GetInspectorsByRegionDocument,
    "mutation initiateRegistration($input: InitiateRegistrationInput!) {\n  initiateRegistration(input: $input)\n}": types.InitiateRegistrationDocument,
    "mutation login($input: LoginInput!) {\n  login(input: $input) {\n    accessToken\n    id\n    email\n    fullName\n    role\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation RefreshToken {\n  refresh\n}": types.RefreshTokenDocument,
    "mutation verifyMagicLink($token: String!) {\n  verifyMagicLink(token: $token) {\n    accessToken\n    id\n    email\n    fullName\n    role\n  }\n}": types.VerifyMagicLinkDocument,
    "mutation verifyOtp($input: VerifyOtpInput!) {\n  verifyOtp(input: $input)\n}": types.VerifyOtpDocument,
    "query GetSingleUserVehicle($vehicleId: String!) {\n  getSingleUserVehicle(vehicleId: $vehicleId) {\n    id\n    status\n    make\n    model\n    year\n    mileage\n    condition\n    drivetrain\n    engineType\n    transmission\n    mechanicalOverhaul\n    structuralDamage\n    serviceHistory\n    tav\n    min\n    max\n    offer\n    imageUrls {\n      imageUrl\n      angle\n    }\n    agentName\n    agentPhone\n    scheduledAt\n    expiresAt\n    bankName\n    accountNumber\n    collectionDate\n    timeSlot\n    collectionAddress\n    bookingReference\n  }\n}": types.GetSingleUserVehicleDocument,
    "query GetVehiclesByUser {\n  getVehiclesByUser {\n    id\n    status\n    make\n    model\n    year\n    mileage\n    condition\n    tav\n    min\n    max\n    offer\n    imageUrls {\n      imageUrl\n      angle\n    }\n    scheduledAt\n    expiresAt\n  }\n}": types.GetVehiclesByUserDocument,
    "mutation SubmitVehicle($input: SubmitVehicleInputType!) {\n  submitVehicle(input: $input) {\n    id\n    status\n    tav\n    min\n    max\n  }\n}": types.SubmitVehicleDocument,
    "mutation SchedulePickup($input: SchedulePickupInputType!) {\n  schedulePickup(input: $input) {\n    id\n  }\n}": types.SchedulePickupDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AdminGetAllVehicles {\n  adminGetAllVehicles {\n    id\n    status\n    make\n    model\n    year\n    mileage\n    condition\n    vin\n    tav\n    min\n    max\n    offer\n    serviceHistory\n    engineType\n    transmission\n    drivetrain\n    structuralDamage\n    mechanicalOverhaul\n    userId\n    agentName\n    agentPhone\n    scheduledAt\n    expiresAt\n    region\n    imageUrls {\n      imageUrl\n      angle\n    }\n  }\n}"): (typeof documents)["query AdminGetAllVehicles {\n  adminGetAllVehicles {\n    id\n    status\n    make\n    model\n    year\n    mileage\n    condition\n    vin\n    tav\n    min\n    max\n    offer\n    serviceHistory\n    engineType\n    transmission\n    drivetrain\n    structuralDamage\n    mechanicalOverhaul\n    userId\n    agentName\n    agentPhone\n    scheduledAt\n    expiresAt\n    region\n    imageUrls {\n      imageUrl\n      angle\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AdminGetUserSingleVehicle($vehicleId: String!) {\n  adminGetUserSingleVehicle(vehicleId: $vehicleId) {\n    id\n    status\n    make\n    model\n    year\n    mileage\n    condition\n    vin\n    tav\n    min\n    max\n    offer\n    serviceHistory\n    engineType\n    transmission\n    drivetrain\n    structuralDamage\n    mechanicalOverhaul\n    userId\n    agentName\n    agentPhone\n    scheduledAt\n    expiresAt\n    region\n    imageUrls {\n      imageUrl\n      angle\n    }\n  }\n}"): (typeof documents)["query AdminGetUserSingleVehicle($vehicleId: String!) {\n  adminGetUserSingleVehicle(vehicleId: $vehicleId) {\n    id\n    status\n    make\n    model\n    year\n    mileage\n    condition\n    vin\n    tav\n    min\n    max\n    offer\n    serviceHistory\n    engineType\n    transmission\n    drivetrain\n    structuralDamage\n    mechanicalOverhaul\n    userId\n    agentName\n    agentPhone\n    scheduledAt\n    expiresAt\n    region\n    imageUrls {\n      imageUrl\n      angle\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AssignInspector($vehicleId: String!, $inspectorId: String!) {\n  assignInspector(vehicleId: $vehicleId, inspectorId: $inspectorId) {\n    id\n    status\n    agentName\n    agentPhone\n  }\n}"): (typeof documents)["mutation AssignInspector($vehicleId: String!, $inspectorId: String!) {\n  assignInspector(vehicleId: $vehicleId, inspectorId: $inspectorId) {\n    id\n    status\n    agentName\n    agentPhone\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllInspectors {\n  getAllInspectors {\n    id\n    fullName\n    phone\n    email\n    region\n    isAvailable\n  }\n}"): (typeof documents)["query GetAllInspectors {\n  getAllInspectors {\n    id\n    fullName\n    phone\n    email\n    region\n    isAvailable\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetInspectorsByRegion($region: String!) {\n  getInspectorsByRegion(region: $region) {\n    id\n    fullName\n    phone\n    email\n    region\n    isAvailable\n  }\n}"): (typeof documents)["query GetInspectorsByRegion($region: String!) {\n  getInspectorsByRegion(region: $region) {\n    id\n    fullName\n    phone\n    email\n    region\n    isAvailable\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation initiateRegistration($input: InitiateRegistrationInput!) {\n  initiateRegistration(input: $input)\n}"): (typeof documents)["mutation initiateRegistration($input: InitiateRegistrationInput!) {\n  initiateRegistration(input: $input)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation login($input: LoginInput!) {\n  login(input: $input) {\n    accessToken\n    id\n    email\n    fullName\n    role\n  }\n}"): (typeof documents)["mutation login($input: LoginInput!) {\n  login(input: $input) {\n    accessToken\n    id\n    email\n    fullName\n    role\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RefreshToken {\n  refresh\n}"): (typeof documents)["mutation RefreshToken {\n  refresh\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation verifyMagicLink($token: String!) {\n  verifyMagicLink(token: $token) {\n    accessToken\n    id\n    email\n    fullName\n    role\n  }\n}"): (typeof documents)["mutation verifyMagicLink($token: String!) {\n  verifyMagicLink(token: $token) {\n    accessToken\n    id\n    email\n    fullName\n    role\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation verifyOtp($input: VerifyOtpInput!) {\n  verifyOtp(input: $input)\n}"): (typeof documents)["mutation verifyOtp($input: VerifyOtpInput!) {\n  verifyOtp(input: $input)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetSingleUserVehicle($vehicleId: String!) {\n  getSingleUserVehicle(vehicleId: $vehicleId) {\n    id\n    status\n    make\n    model\n    year\n    mileage\n    condition\n    drivetrain\n    engineType\n    transmission\n    mechanicalOverhaul\n    structuralDamage\n    serviceHistory\n    tav\n    min\n    max\n    offer\n    imageUrls {\n      imageUrl\n      angle\n    }\n    agentName\n    agentPhone\n    scheduledAt\n    expiresAt\n    bankName\n    accountNumber\n    collectionDate\n    timeSlot\n    collectionAddress\n    bookingReference\n  }\n}"): (typeof documents)["query GetSingleUserVehicle($vehicleId: String!) {\n  getSingleUserVehicle(vehicleId: $vehicleId) {\n    id\n    status\n    make\n    model\n    year\n    mileage\n    condition\n    drivetrain\n    engineType\n    transmission\n    mechanicalOverhaul\n    structuralDamage\n    serviceHistory\n    tav\n    min\n    max\n    offer\n    imageUrls {\n      imageUrl\n      angle\n    }\n    agentName\n    agentPhone\n    scheduledAt\n    expiresAt\n    bankName\n    accountNumber\n    collectionDate\n    timeSlot\n    collectionAddress\n    bookingReference\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetVehiclesByUser {\n  getVehiclesByUser {\n    id\n    status\n    make\n    model\n    year\n    mileage\n    condition\n    tav\n    min\n    max\n    offer\n    imageUrls {\n      imageUrl\n      angle\n    }\n    scheduledAt\n    expiresAt\n  }\n}"): (typeof documents)["query GetVehiclesByUser {\n  getVehiclesByUser {\n    id\n    status\n    make\n    model\n    year\n    mileage\n    condition\n    tav\n    min\n    max\n    offer\n    imageUrls {\n      imageUrl\n      angle\n    }\n    scheduledAt\n    expiresAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SubmitVehicle($input: SubmitVehicleInputType!) {\n  submitVehicle(input: $input) {\n    id\n    status\n    tav\n    min\n    max\n  }\n}"): (typeof documents)["mutation SubmitVehicle($input: SubmitVehicleInputType!) {\n  submitVehicle(input: $input) {\n    id\n    status\n    tav\n    min\n    max\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SchedulePickup($input: SchedulePickupInputType!) {\n  schedulePickup(input: $input) {\n    id\n  }\n}"): (typeof documents)["mutation SchedulePickup($input: SchedulePickupInputType!) {\n  schedulePickup(input: $input) {\n    id\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;