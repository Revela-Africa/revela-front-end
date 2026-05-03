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

export type Mutation = {
  __typename?: 'Mutation';
  initiateRegistration: Scalars['String']['output'];
  login: LoginResponse;
  logout: Scalars['Boolean']['output'];
  refresh: Scalars['String']['output'];
  schedulePickup: VehicleType;
  startAssessment: VehicleType;
  submitVehicle: VehicleType;
  verifyMagicLink: LoginResponse;
  verifyOtp: Scalars['String']['output'];
};


export type MutationInitiateRegistrationArgs = {
  input: InitiateRegistrationInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSchedulePickupArgs = {
  input: SchedulePickupInputType;
};


export type MutationStartAssessmentArgs = {
  id: Scalars['String']['input'];
};


export type MutationSubmitVehicleArgs = {
  input: SubmitVehicleInputType;
};


export type MutationVerifyMagicLinkArgs = {
  token: Scalars['String']['input'];
};


export type MutationVerifyOtpArgs = {
  input: VerifyOtpInput;
};

export type Query = {
  __typename?: 'Query';
  getSingleUserVehicle: VehicleType;
  getVehiclesByUser: Array<VehicleType>;
};


export type QueryGetSingleUserVehicleArgs = {
  vehicleId: Scalars['String']['input'];
};

export type SchedulePickupInputType = {
  accountNumber: Scalars['String']['input'];
  bankName: Scalars['String']['input'];
  collectionAddress: Scalars['String']['input'];
  collectionDate: Scalars['String']['input'];
  timeSlot: Scalars['String']['input'];
  vehicleId: Scalars['String']['input'];
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

export type VehicleType = {
  __typename?: 'VehicleType';
  accountNumber?: Maybe<Scalars['String']['output']>;
  agentName?: Maybe<Scalars['String']['output']>;
  agentPhone?: Maybe<Scalars['String']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  bookingReference?: Maybe<Scalars['String']['output']>;
  collectionAddress?: Maybe<Scalars['String']['output']>;
  collectionDate?: Maybe<Scalars['String']['output']>;
  condition: Scalars['String']['output'];
  drivetrain: Scalars['String']['output'];
  engineType: Scalars['String']['output'];
  expiresAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrls: Array<ImageUrlType>;
  make: Scalars['String']['output'];
  max?: Maybe<Scalars['Float']['output']>;
  mechanicalOverhaul: Scalars['Boolean']['output'];
  mileage: Scalars['Int']['output'];
  min?: Maybe<Scalars['Float']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  offer?: Maybe<Scalars['Float']['output']>;
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

export type GetSingleUserVehicleQueryVariables = Exact<{
  vehicleId: Scalars['String']['input'];
}>;


export type GetSingleUserVehicleQuery = { __typename?: 'Query', getSingleUserVehicle: { __typename?: 'VehicleType', id: string, status: string, make: string, model?: string | null, year: number, mileage: number, condition: string, drivetrain: string, engineType: string, transmission: string, mechanicalOverhaul: boolean, structuralDamage: boolean, serviceHistory: string, tav?: number | null, min?: number | null, max?: number | null, offer?: number | null, agentName?: string | null, agentPhone?: string | null, scheduledAt?: string | null, expiresAt?: string | null, imageUrls: Array<{ __typename?: 'ImageUrlType', imageUrl: string, angle: string }> } };

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


export const InitiateRegistrationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"initiateRegistration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InitiateRegistrationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initiateRegistration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<InitiateRegistrationMutation, InitiateRegistrationMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const VerifyMagicLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyMagicLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyMagicLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<VerifyMagicLinkMutation, VerifyMagicLinkMutationVariables>;
export const VerifyOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyOtpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const GetSingleUserVehicleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSingleUserVehicle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vehicleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSingleUserVehicle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vehicleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vehicleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"mileage"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"drivetrain"}},{"kind":"Field","name":{"kind":"Name","value":"engineType"}},{"kind":"Field","name":{"kind":"Name","value":"transmission"}},{"kind":"Field","name":{"kind":"Name","value":"mechanicalOverhaul"}},{"kind":"Field","name":{"kind":"Name","value":"structuralDamage"}},{"kind":"Field","name":{"kind":"Name","value":"serviceHistory"}},{"kind":"Field","name":{"kind":"Name","value":"tav"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"offer"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"angle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"agentName"}},{"kind":"Field","name":{"kind":"Name","value":"agentPhone"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}}]} as unknown as DocumentNode<GetSingleUserVehicleQuery, GetSingleUserVehicleQueryVariables>;
export const GetVehiclesByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVehiclesByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVehiclesByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"mileage"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"tav"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"offer"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"angle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scheduledAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}}]} as unknown as DocumentNode<GetVehiclesByUserQuery, GetVehiclesByUserQueryVariables>;
export const SubmitVehicleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitVehicle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubmitVehicleInputType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitVehicle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"tav"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}}]}}]}}]} as unknown as DocumentNode<SubmitVehicleMutation, SubmitVehicleMutationVariables>;
export const SchedulePickupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SchedulePickup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SchedulePickupInputType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"schedulePickup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SchedulePickupMutation, SchedulePickupMutationVariables>;