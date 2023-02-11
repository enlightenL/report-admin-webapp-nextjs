export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  report: Array<Maybe<Report>>;
};

export type Report = {
  __typename?: 'Report';
  address: Scalars['String'];
  createdAt: Scalars['String'];
  emailSend: SendStatus;
  emailSendDate: Scalars['String'];
  essCapacity?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  no: Scalars['Int'];
  phone: Scalars['String'];
  pvCapacity?: Maybe<Scalars['Float']>;
  requestYn: RequestYn;
  show: Scalars['Boolean'];
  siteId: Scalars['String'];
  siteName: Scalars['String'];
  smsSend: SendStatus;
  smsSendDate: Scalars['String'];
  status: ReportStatus;
  step: Scalars['Int'];
  writer: Scalars['String'];
};

export enum ReportStatus {
  Completed = 'COMPLETED',
  Unwritten = 'UNWRITTEN',
  Writing = 'WRITING',
}

export enum RequestYn {
  N = 'N',
  Y = 'Y',
}

export enum SendStatus {
  Disabled = 'DISABLED',
  Resend = 'RESEND',
  Send = 'SEND',
}

export type GetReportQueryVariables = Exact<{ [key: string]: never }>;

export type GetReportQuery = {
  __typename?: 'Query';
  report: Array<{
    __typename?: 'Report';
    no: number;
    siteId: string;
    siteName: string;
    name: string;
    phone: string;
    pvCapacity?: number | null;
    essCapacity?: number | null;
    address: string;
    writer: string;
    createdAt: string;
    status: ReportStatus;
    requestYn: RequestYn;
    step: number;
    smsSend: SendStatus;
    smsSendDate: string;
    emailSend: SendStatus;
    emailSendDate: string;
    show: boolean;
  } | null>;
};

export type HelloQueryVariables = Exact<{ [key: string]: never }>;

export type HelloQuery = { __typename?: 'Query'; hello: string };
