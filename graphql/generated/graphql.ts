/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AdminDashboardType = {
  __typename?: 'AdminDashboardType';
  activeVehicles: Scalars['Int']['output'];
  avgCycleTimeDays: Scalars['Float']['output'];
  avgPayoutThisMonth: Scalars['Float']['output'];
  revenueLastSixMonths: Array<MonthlyRevenueType>;
  revenueMTD: Scalars['Float']['output'];
};

export type ImageUrlInput = {
  angle: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
};

export type ImageUrlType = {
  __typename?: 'ImageUrlType';
  angle: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
};

export type InitiateRegistrationInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  agencyName?: InputMaybe<Scalars['String']['input']>;
  documentUrl?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  role: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
};

export type InspectorType = {
  __typename?: 'InspectorType';
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isAvailable?: Maybe<Scalars['Boolean']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type MonthlyRevenueType = {
  __typename?: 'MonthlyRevenueType';
  month: Scalars['String']['output'];
  revenue: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptOffer: VehicleType;
  assignInspector: VehicleType;
  initiateRegistration: Scalars['String']['output'];
  inviteInspector: Scalars['String']['output'];
  login: LoginResponse;
  logout: Scalars['Boolean']['output'];
  markAsPaid: VehicleType;
  provideRange: VehicleType;
  refresh: Scalars['String']['output'];
  rejectOffer: VehicleType;
  retriggerValuation: Scalars['Boolean']['output'];
  schedulePickup: VehicleType;
  sendOffer: VehicleType;
  setPassword: Scalars['String']['output'];
  startAssessment: VehicleType;
  submitVehicle: VehicleType;
  updateScrapPrices: Scalars['Boolean']['output'];
  verifyMagicLink: LoginResponse;
  verifyOtp: Scalars['String']['output'];
};


export type MutationAcceptOfferArgs = {
  id: Scalars['String']['input'];
};


export type MutationAssignInspectorArgs = {
  inspectorId: Scalars['String']['input'];
  vehicleId: Scalars['String']['input'];
};


export type MutationInitiateRegistrationArgs = {
  input: InitiateRegistrationInput;
};


export type MutationInviteInspectorArgs = {
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  region: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMarkAsPaidArgs = {
  id: Scalars['String']['input'];
};


export type MutationProvideRangeArgs = {
  grade: Scalars['String']['input'];
  tav: Scalars['Float']['input'];
  vehicleId: Scalars['String']['input'];
};


export type MutationRejectOfferArgs = {
  id: Scalars['String']['input'];
};


export type MutationRetriggerValuationArgs = {
  vehicleId: Scalars['String']['input'];
};


export type MutationSchedulePickupArgs = {
  input: SchedulePickupInputType;
};


export type MutationSendOfferArgs = {
  id: Scalars['String']['input'];
  offer: Scalars['Float']['input'];
};


export type MutationSetPasswordArgs = {
  password: Scalars['String']['input'];
};


export type MutationStartAssessmentArgs = {
  notes: Scalars['String']['input'];
  photoUrls: Array<Scalars['String']['input']>;
  vehicleId: Scalars['String']['input'];
};


export type MutationSubmitVehicleArgs = {
  input: SubmitVehicleInputType;
};


export type MutationUpdateScrapPricesArgs = {
  updates: UpdateScrapPricesInput;
};


export type MutationVerifyMagicLinkArgs = {
  token: Scalars['String']['input'];
};


export type MutationVerifyOtpArgs = {
  input: VerifyOtpInput;
};

export type Query = {
  __typename?: 'Query';
  adminGetAllVehicles: Array<VehicleType>;
  adminGetUserSingleVehicle: VehicleType;
  getAdminDashboard: AdminDashboardType;
  getAllInspectors: Array<InspectorType>;
  getInspectionById: VehicleType;
  getInspectorById: InspectorType;
  getInspectorsByRegion: Array<InspectorType>;
  getScrapPrices: ScrapPricesType;
  getSingleUserVehicle: VehicleType;
  getUserDashboard: UserDashboardType;
  getVehiclesByUser: Array<VehicleType>;
  inspectorGetAllInspections: Array<VehicleType>;
};


export type QueryAdminGetAllVehiclesArgs = {
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAdminGetUserSingleVehicleArgs = {
  vehicleId: Scalars['String']['input'];
};


export type QueryGetInspectionByIdArgs = {
  vehicleId: Scalars['String']['input'];
};


export type QueryGetInspectorByIdArgs = {
  inspectorId: Scalars['String']['input'];
};


export type QueryGetInspectorsByRegionArgs = {
  region: Scalars['String']['input'];
};


export type QueryGetSingleUserVehicleArgs = {
  vehicleId: Scalars['String']['input'];
};


export type QueryInspectorGetAllInspectionsArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
};

export type SchedulePickupInputType = {
  accountNumber: Scalars['String']['input'];
  bankName: Scalars['String']['input'];
  collectionAddress: Scalars['String']['input'];
  collectionDate: Scalars['String']['input'];
  region: Scalars['String']['input'];
  timeSlot: Scalars['String']['input'];
  vehicleId: Scalars['String']['input'];
};

export type ScrapPricesType = {
  __typename?: 'ScrapPricesType';
  aluminum: Scalars['Float']['output'];
  castIron: Scalars['Float']['output'];
  copper: Scalars['Float']['output'];
  glass: Scalars['Float']['output'];
  plastics: Scalars['Float']['output'];
  rubber: Scalars['Float']['output'];
  steel: Scalars['Float']['output'];
};

export type SubmitVehicleInputType = {
  condition: Scalars['String']['input'];
  drivetrain: Scalars['String']['input'];
  engineType: Scalars['String']['input'];
  imageUrls: Array<ImageUrlInput>;
  make: Scalars['String']['input'];
  mechanicalOverhaul: Scalars['Boolean']['input'];
  mileage: Scalars['String']['input'];
  model?: InputMaybe<Scalars['String']['input']>;
  serviceHistory: Scalars['String']['input'];
  structuralDamage: Scalars['Boolean']['input'];
  transmission: Scalars['String']['input'];
  vin?: InputMaybe<Scalars['String']['input']>;
  year: Scalars['String']['input'];
};

export type UpdateScrapPricesInput = {
  aluminum?: InputMaybe<Scalars['Float']['input']>;
  castIron?: InputMaybe<Scalars['Float']['input']>;
  copper?: InputMaybe<Scalars['Float']['input']>;
  glass?: InputMaybe<Scalars['Float']['input']>;
  plastics?: InputMaybe<Scalars['Float']['input']>;
  rubber?: InputMaybe<Scalars['Float']['input']>;
  steel?: InputMaybe<Scalars['Float']['input']>;
};

export type UserDashboardType = {
  __typename?: 'UserDashboardType';
  activeVehicles: Scalars['Int']['output'];
  totalPayout: Scalars['Float']['output'];
  totalVehicles: Scalars['Int']['output'];
};

export type VehicleType = {
  __typename?: 'VehicleType';
  accountNumber?: Maybe<Scalars['String']['output']>;
  agentName?: Maybe<Scalars['String']['output']>;
  agentPhone?: Maybe<Scalars['String']['output']>;
  assignedToInspector?: Maybe<Scalars['Boolean']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  bookingReference?: Maybe<Scalars['String']['output']>;
  collectionAddress?: Maybe<Scalars['String']['output']>;
  collectionDate?: Maybe<Scalars['String']['output']>;
  condition: Scalars['String']['output'];
  drivetrain: Scalars['String']['output'];
  engineType: Scalars['String']['output'];
  expiresAt?: Maybe<Scalars['String']['output']>;
  grade?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrls: Array<ImageUrlType>;
  inspectorId?: Maybe<Scalars['String']['output']>;
  make: Scalars['String']['output'];
  max?: Maybe<Scalars['Float']['output']>;
  mechanicalOverhaul: Scalars['Boolean']['output'];
  mileage: Scalars['Int']['output'];
  min?: Maybe<Scalars['Float']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  offer?: Maybe<Scalars['Float']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  scheduledAt?: Maybe<Scalars['String']['output']>;
  serviceHistory: Scalars['String']['output'];
  status: Scalars['String']['output'];
  structuralDamage: Scalars['Boolean']['output'];
  tav?: Maybe<Scalars['Float']['output']>;
  timeSlot?: Maybe<Scalars['String']['output']>;
  transmission: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  vin?: Maybe<Scalars['String']['output']>;
  year: Scalars['Int']['output'];
};

export type VerifyOtpInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type AdminGetAllVehiclesQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminGetAllVehiclesQuery = { __typename?: 'Query', adminGetAllVehicles: Array<{ __typename?: 'VehicleType', id: string, status: string, make: string, model?: string | null, year: number, mileage: number, condition: string, vin?: string | null, tav?: number | null, min?: number | null, max?: number | null, offer?: number | null, serviceHistory: string, engineType: string, transmission: string, drivetrain: string, structuralDamage: boolean, mechanicalOverhaul: boolean, userId: string, agentName?: string | null, agentPhone?: string | null, scheduledAt?: string | null, expiresAt?: string | null, region?: string | null, inspectorId?: string | null, assignedToInspector?: boolean | null, bookingReference?: string | null, imageUrls: Array<{ __typename?: 'ImageUrlType', imageUrl: string, angle: string }> }> };

export type AdminGetUserSingleVehicleQueryVariables = Exact<{
  vehicleId: Scalars['String']['input'];
}>;


export type AdminGetUserSingleVehicleQuery = { __typename?: 'Query', adminGetUserSingleVehicle: { __typename?: 'VehicleType', id: string, status: string, make: string, model?: string | null, year: number, mileage: number, condition: string, vin?: string | null, tav?: number | null, min?: number | null, max?: number | null, offer?: number | null, serviceHistory: string, engineType: string, transmission: string, drivetrain: string, structuralDamage: boolean, mechanicalOverhaul: boolean, userId: string, agentName?: string | null, agentPhone?: string | null, scheduledAt?: string | null, collectionDate?: string | null, timeSlot?: string | null, bookingReference?: string | null, inspectorId?: string | null, assignedToInspector?: boolean | null, expiresAt?: string | null, region?: string | null, imageUrls: Array<{ __typename?: 'ImageUrlType', imageUrl: string, angle: string }> } };

export type AssignInspectorMutationVariables = Exact<{
  vehicleId: Scalars['String']['input'];
  inspectorId: Scalars['String']['input'];
}>;


export type AssignInspectorMutation = { __typename?: 'Mutation', assignInspector: { __typename?: 'VehicleType', id: string, status: string, agentName?: string | null, agentPhone?: string | null } };

export type GetAdminDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminDashboardQuery = { __typename?: 'Query', getAdminDashboard: { __typename?: 'AdminDashboardType', avgPayoutThisMonth: number, revenueMTD: number, activeVehicles: number, avgCycleTimeDays: number, revenueLastSixMonths: Array<{ __typename?: 'MonthlyRevenueType', month: string, revenue: number }> } };

export type GetAllInspectorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllInspectorsQuery = { __typename?: 'Query', getAllInspectors: Array<{ __typename?: 'InspectorType', id: string, fullName: string, phone?: string | null, email: string, region?: string | null, isAvailable?: boolean | null }> };

export type GetInspectorByIdQueryVariables = Exact<{
  inspectorId: Scalars['String']['input'];
}>;


export type GetInspectorByIdQuery = { __typename?: 'Query', getInspectorById: { __typename?: 'InspectorType', id: string, email: string, fullName: string, phone?: string | null, region?: string | null, isAvailable?: boolean | null } };

export type GetInspectorsByRegionQueryVariables = Exact<{
  region: Scalars['String']['input'];
}>;


export type GetInspectorsByRegionQuery = { __typename?: 'Query', getInspectorsByRegion: Array<{ __typename?: 'InspectorType', id: string, fullName: string, phone?: string | null, email: string, region?: string | null, isAvailable?: boolean | null }> };

export type InviteInspectorMutationVariables = Exact<{
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  region: Scalars['String']['input'];
}>;


export type InviteInspectorMutation = { __typename?: 'Mutation', inviteInspector: string };

export type ProvideRangeMutationVariables = Exact<{
  vehicleId: Scalars['String']['input'];
  tav: Scalars['Float']['input'];
  grade: Scalars['String']['input'];
}>;


export type ProvideRangeMutation = { __typename?: 'Mutation', provideRange: { __typename?: 'VehicleType', id: string, status: string, tav?: number | null, min?: number | null, max?: number | null } };

export type RetriggerValuationMutationVariables = Exact<{
  vehicleId: Scalars['String']['input'];
}>;


export type RetriggerValuationMutation = { __typename?: 'Mutation', retriggerValuation: boolean };

export type InitiateRegistrationMutationVariables = Exact<{
  input: InitiateRegistrationInput;
}>;


export type InitiateRegistrationMutation = { __typename?: 'Mutation', initiateRegistration: string };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, id: string, email: string, fullName: string, role: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refresh: string };

export type VerifyMagicLinkMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyMagicLinkMutation = { __typename?: 'Mutation', verifyMagicLink: { __typename?: 'LoginResponse', accessToken: string, id: string, email: string, fullName: string, role: string } };

export type VerifyOtpMutationVariables = Exact<{
  input: VerifyOtpInput;
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOtp: string };

export type GetUserDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserDashboardQuery = { __typename?: 'Query', getUserDashboard: { __typename?: 'UserDashboardType', totalVehicles: number, activeVehicles: number, totalPayout: number } };

export type GetInspectionByIdQueryVariables = Exact<{
  vehicleId: Scalars['String']['input'];
}>;


export type GetInspectionByIdQuery = { __typename?: 'Query', getInspectionById: { __typename?: 'VehicleType', id: string, status: string, make: string, model?: string | null, year: number, mileage: number, condition: string, region?: string | null, tav?: number | null, min?: number | null, max?: number | null, agentName?: string | null, scheduledAt?: string | null, collectionAddress?: string | null, userId: string, imageUrls: Array<{ __typename?: 'ImageUrlType', imageUrl: string, angle: string }> } };

export type InspectorGetAllInspectionsQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['String']['input']>;
}>;


export type InspectorGetAllInspectionsQuery = { __typename?: 'Query', inspectorGetAllInspections: Array<{ __typename?: 'VehicleType', id: string, status: string, make: string, model?: string | null, year: number, mileage: number, condition: string, region?: string | null, tav?: number | null, min?: number | null, max?: number | null, agentName?: string | null, agentPhone?: string | null, scheduledAt?: string | null, collectionAddress?: string | null, userId: string, imageUrls: Array<{ __typename?: 'ImageUrlType', imageUrl: string, angle: string }> }> };

export type SetPasswordMutationVariables = Exact<{
  password: Scalars['String']['input'];
}>;


export type SetPasswordMutation = { __typename?: 'Mutation', setPassword: string };

export type StartAssessmentMutationVariables = Exact<{
  vehicleId: Scalars['String']['input'];
  notes: Scalars['String']['input'];
  photoUrls: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type StartAssessmentMutation = { __typename?: 'Mutation', startAssessment: { __typename?: 'VehicleType', id: string, status: string } };

export type GetSingleUserVehicleQueryVariables = Exact<{
  vehicleId: Scalars['String']['input'];
}>;


export type GetSingleUserVehicleQuery = { __typename?: 'Query', getSingleUserVehicle: { __typename?: 'VehicleType', id: string, status: string, make: string, model?: string | null, year: number, mileage: number, condition: string, drivetrain: string, engineType: string, transmission: string, mechanicalOverhaul: boolean, structuralDamage: boolean, serviceHistory: string, tav?: number | null, min?: number | null, max?: number | null, offer?: number | null, agentName?: string | null, agentPhone?: string | null, scheduledAt?: string | null, expiresAt?: string | null, bankName?: string | null, accountNumber?: string | null, collectionDate?: string | null, timeSlot?: string | null, collectionAddress?: string | null, bookingReference?: string | null, imageUrls: Array<{ __typename?: 'ImageUrlType', imageUrl: string, angle: string }> } };

export type GetVehiclesByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVehiclesByUserQuery = { __typename?: 'Query', getVehiclesByUser: Array<{ __typename?: 'VehicleType', id: string, status: string, make: string, model?: string | null, year: number, mileage: number, condition: string, tav?: number | null, min?: number | null, max?: number | null, offer?: number | null, scheduledAt?: string | null, expiresAt?: string | null, imageUrls: Array<{ __typename?: 'ImageUrlType', imageUrl: string, angle: string }> }> };

export type SubmitVehicleMutationVariables = Exact<{
  input: SubmitVehicleInputType;
}>;


export type SubmitVehicleMutation = { __typename?: 'Mutation', submitVehicle: { __typename?: 'VehicleType', id: string, status: string, tav?: number | null, min?: number | null, max?: number | null } };

export type SchedulePickupMutationVariables = Exact<{
  input: SchedulePickupInputType;
}>;


export type SchedulePickupMutation = { __typename?: 'Mutation', schedulePickup: { __typename?: 'VehicleType', id: string } };


export const AdminGetAllVehiclesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminGetAllVehicles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminGetAllVehicles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"mileage"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"vin"}},{"kind":"Field","name":{"kind":"Name","value":"tav"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"offer"}},{"kind":"Field","name":{"kind":"Name","value":"serviceHistory"}},{"kind":"Field","name":{"kind":"Name","value":"engineType"}},{"kind":"Field","name":{"kind":"Name","value":"transmission"}},{"kind":"Field","name":{"kind":"Name","value":"drivetrain"}},{"kind":"Field","name":{"kind":"Name","value":"structuralDamage"}},{"kind":"Field","name":{"kind":"Name","value":"mechanicalOverhaul"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"agentName"}},{"kind":"Field","name":{"kind":"Name","value":"agentPhone"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"inspectorId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToInspector"}},{"kind":"Field","name":{"kind":"Name","value":"bookingReference"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"angle"}}]}}]}}]}}]} as unknown as DocumentNode<AdminGetAllVehiclesQuery, AdminGetAllVehiclesQueryVariables>;
export const AdminGetUserSingleVehicleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminGetUserSingleVehicle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vehicleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminGetUserSingleVehicle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vehicleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vehicleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"mileage"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"vin"}},{"kind":"Field","name":{"kind":"Name","value":"tav"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"offer"}},{"kind":"Field","name":{"kind":"Name","value":"serviceHistory"}},{"kind":"Field","name":{"kind":"Name","value":"engineType"}},{"kind":"Field","name":{"kind":"Name","value":"transmission"}},{"kind":"Field","name":{"kind":"Name","value":"drivetrain"}},{"kind":"Field","name":{"kind":"Name","value":"structuralDamage"}},{"kind":"Field","name":{"kind":"Name","value":"mechanicalOverhaul"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"agentName"}},{"kind":"Field","name":{"kind":"Name","value":"agentPhone"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledAt"}},{"kind":"Field","name":{"kind":"Name","value":"collectionDate"}},{"kind":"Field","name":{"kind":"Name","value":"timeSlot"}},{"kind":"Field","name":{"kind":"Name","value":"bookingReference"}},{"kind":"Field","name":{"kind":"Name","value":"inspectorId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToInspector"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"angle"}}]}}]}}]}}]} as unknown as DocumentNode<AdminGetUserSingleVehicleQuery, AdminGetUserSingleVehicleQueryVariables>;
export const AssignInspectorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignInspector"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vehicleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inspectorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignInspector"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vehicleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vehicleId"}}},{"kind":"Argument","name":{"kind":"Name","value":"inspectorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inspectorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"agentName"}},{"kind":"Field","name":{"kind":"Name","value":"agentPhone"}}]}}]}}]} as unknown as DocumentNode<AssignInspectorMutation, AssignInspectorMutationVariables>;
export const GetAdminDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAdminDashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAdminDashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgPayoutThisMonth"}},{"kind":"Field","name":{"kind":"Name","value":"revenueMTD"}},{"kind":"Field","name":{"kind":"Name","value":"activeVehicles"}},{"kind":"Field","name":{"kind":"Name","value":"avgCycleTimeDays"}},{"kind":"Field","name":{"kind":"Name","value":"revenueLastSixMonths"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"revenue"}}]}}]}}]}}]} as unknown as DocumentNode<GetAdminDashboardQuery, GetAdminDashboardQueryVariables>;
export const GetAllInspectorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllInspectors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllInspectors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"isAvailable"}}]}}]}}]} as unknown as DocumentNode<GetAllInspectorsQuery, GetAllInspectorsQueryVariables>;
export const GetInspectorByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetInspectorById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inspectorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInspectorById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inspectorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inspectorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"isAvailable"}}]}}]}}]} as unknown as DocumentNode<GetInspectorByIdQuery, GetInspectorByIdQueryVariables>;
export const GetInspectorsByRegionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetInspectorsByRegion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"region"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInspectorsByRegion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"region"},"value":{"kind":"Variable","name":{"kind":"Name","value":"region"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"isAvailable"}}]}}]}}]} as unknown as DocumentNode<GetInspectorsByRegionQuery, GetInspectorsByRegionQueryVariables>;
export const InviteInspectorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InviteInspector"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"region"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inviteInspector"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"fullName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullName"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"region"},"value":{"kind":"Variable","name":{"kind":"Name","value":"region"}}}]}]}}]} as unknown as DocumentNode<InviteInspectorMutation, InviteInspectorMutationVariables>;
export const ProvideRangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ProvideRange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vehicleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tav"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"grade"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"provideRange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vehicleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vehicleId"}}},{"kind":"Argument","name":{"kind":"Name","value":"tav"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tav"}}},{"kind":"Argument","name":{"kind":"Name","value":"grade"},"value":{"kind":"Variable","name":{"kind":"Name","value":"grade"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"tav"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}}]}}]}}]} as unknown as DocumentNode<ProvideRangeMutation, ProvideRangeMutationVariables>;
export const RetriggerValuationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RetriggerValuation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vehicleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"retriggerValuation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vehicleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vehicleId"}}}]}]}}]} as unknown as DocumentNode<RetriggerValuationMutation, RetriggerValuationMutationVariables>;
export const InitiateRegistrationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"initiateRegistration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InitiateRegistrationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initiateRegistration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<InitiateRegistrationMutation, InitiateRegistrationMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const VerifyMagicLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyMagicLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyMagicLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<VerifyMagicLinkMutation, VerifyMagicLinkMutationVariables>;
export const VerifyOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyOtpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const GetUserDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserDashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserDashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalVehicles"}},{"kind":"Field","name":{"kind":"Name","value":"activeVehicles"}},{"kind":"Field","name":{"kind":"Name","value":"totalPayout"}}]}}]}}]} as unknown as DocumentNode<GetUserDashboardQuery, GetUserDashboardQueryVariables>;
export const GetInspectionByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetInspectionById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vehicleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInspectionById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vehicleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vehicleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"mileage"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"tav"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"agentName"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledAt"}},{"kind":"Field","name":{"kind":"Name","value":"collectionAddress"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"angle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<GetInspectionByIdQuery, GetInspectionByIdQueryVariables>;
export const InspectorGetAllInspectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"InspectorGetAllInspections"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inspectorGetAllInspections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"mileage"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"tav"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"agentName"}},{"kind":"Field","name":{"kind":"Name","value":"agentPhone"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledAt"}},{"kind":"Field","name":{"kind":"Name","value":"collectionAddress"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"angle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<InspectorGetAllInspectionsQuery, InspectorGetAllInspectionsQueryVariables>;
export const SetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<SetPasswordMutation, SetPasswordMutationVariables>;
export const StartAssessmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartAssessment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vehicleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"notes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"photoUrls"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startAssessment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vehicleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vehicleId"}}},{"kind":"Argument","name":{"kind":"Name","value":"notes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"notes"}}},{"kind":"Argument","name":{"kind":"Name","value":"photoUrls"},"value":{"kind":"Variable","name":{"kind":"Name","value":"photoUrls"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<StartAssessmentMutation, StartAssessmentMutationVariables>;
export const GetSingleUserVehicleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSingleUserVehicle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vehicleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSingleUserVehicle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vehicleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vehicleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"mileage"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"drivetrain"}},{"kind":"Field","name":{"kind":"Name","value":"engineType"}},{"kind":"Field","name":{"kind":"Name","value":"transmission"}},{"kind":"Field","name":{"kind":"Name","value":"mechanicalOverhaul"}},{"kind":"Field","name":{"kind":"Name","value":"structuralDamage"}},{"kind":"Field","name":{"kind":"Name","value":"serviceHistory"}},{"kind":"Field","name":{"kind":"Name","value":"tav"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"offer"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"angle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"agentName"}},{"kind":"Field","name":{"kind":"Name","value":"agentPhone"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"bankName"}},{"kind":"Field","name":{"kind":"Name","value":"accountNumber"}},{"kind":"Field","name":{"kind":"Name","value":"collectionDate"}},{"kind":"Field","name":{"kind":"Name","value":"timeSlot"}},{"kind":"Field","name":{"kind":"Name","value":"collectionAddress"}},{"kind":"Field","name":{"kind":"Name","value":"bookingReference"}}]}}]}}]} as unknown as DocumentNode<GetSingleUserVehicleQuery, GetSingleUserVehicleQueryVariables>;
export const GetVehiclesByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVehiclesByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVehiclesByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"mileage"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"tav"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"offer"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"angle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scheduledAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}}]} as unknown as DocumentNode<GetVehiclesByUserQuery, GetVehiclesByUserQueryVariables>;
export const SubmitVehicleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitVehicle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubmitVehicleInputType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitVehicle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"tav"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}}]}}]}}]} as unknown as DocumentNode<SubmitVehicleMutation, SubmitVehicleMutationVariables>;
export const SchedulePickupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SchedulePickup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SchedulePickupInputType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"schedulePickup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SchedulePickupMutation, SchedulePickupMutationVariables>;