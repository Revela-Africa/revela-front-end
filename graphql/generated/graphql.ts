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
  acceptOffer: VehicleType;
  initiateRegistration: Scalars['String']['output'];
  login: LoginResponse;
  logout: Scalars['Boolean']['output'];
  markAsPaid: VehicleType;
  provideRange: VehicleType;
  refresh: Scalars['String']['output'];
  requestAuthority: VehicleType;
  scheduleInspection: VehicleType;
  sendOffer: VehicleType;
  startAssessment: VehicleType;
  submitVehicle: VehicleType;
  verifyAuthority: VehicleType;
  verifyMagicLink: LoginResponse;
  verifyOtp: Scalars['String']['output'];
};


export type MutationAcceptOfferArgs = {
  id: Scalars['String']['input'];
};


export type MutationInitiateRegistrationArgs = {
  input: InitiateRegistrationInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMarkAsPaidArgs = {
  id: Scalars['String']['input'];
};


export type MutationProvideRangeArgs = {
  id: Scalars['String']['input'];
  tav: Scalars['Float']['input'];
};


export type MutationRequestAuthorityArgs = {
  agentName: Scalars['String']['input'];
  agentPhone: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type MutationScheduleInspectionArgs = {
  id: Scalars['String']['input'];
  scheduledAt: Scalars['String']['input'];
};


export type MutationSendOfferArgs = {
  expiresAt: Scalars['String']['input'];
  id: Scalars['String']['input'];
  offerAmount: Scalars['Float']['input'];
  scheduledAt: Scalars['String']['input'];
};


export type MutationStartAssessmentArgs = {
  id: Scalars['String']['input'];
};


export type MutationSubmitVehicleArgs = {
  input: SubmitVehicleInputType;
};


export type MutationVerifyAuthorityArgs = {
  id: Scalars['String']['input'];
};


export type MutationVerifyMagicLinkArgs = {
  token: Scalars['String']['input'];
};


export type MutationVerifyOtpArgs = {
  input: VerifyOtpInput;
};

export type Query = {
  __typename?: 'Query';
  ping: Scalars['String']['output'];
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
  agentName?: Maybe<Scalars['String']['output']>;
  agentPhone?: Maybe<Scalars['String']['output']>;
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

export type VerifyMagicLinkMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyMagicLinkMutation = { __typename?: 'Mutation', verifyMagicLink: { __typename?: 'LoginResponse', accessToken: string, id: string, email: string, fullName: string, role: string } };

export type VerifyOtpMutationVariables = Exact<{
  input: VerifyOtpInput;
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOtp: string };

export type SubmitVehicleMutationVariables = Exact<{
  input: SubmitVehicleInputType;
}>;


export type SubmitVehicleMutation = { __typename?: 'Mutation', submitVehicle: { __typename?: 'VehicleType', id: string } };


export const InitiateRegistrationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"initiateRegistration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InitiateRegistrationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initiateRegistration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<InitiateRegistrationMutation, InitiateRegistrationMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const VerifyMagicLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyMagicLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyMagicLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<VerifyMagicLinkMutation, VerifyMagicLinkMutationVariables>;
export const VerifyOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyOtpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const SubmitVehicleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"submitVehicle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubmitVehicleInputType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitVehicle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SubmitVehicleMutation, SubmitVehicleMutationVariables>;