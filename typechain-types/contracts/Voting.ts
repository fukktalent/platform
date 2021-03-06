/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace Voting {
  export type ProposalStruct = {
    callData: PromiseOrValue<BytesLike>;
    recipient: PromiseOrValue<string>;
    description: PromiseOrValue<string>;
    finishDate: PromiseOrValue<BigNumberish>;
    votesFor: PromiseOrValue<BigNumberish>;
    votesAgainst: PromiseOrValue<BigNumberish>;
  };

  export type ProposalStructOutput = [
    string,
    string,
    string,
    number,
    BigNumber,
    BigNumber
  ] & {
    callData: string;
    recipient: string;
    description: string;
    finishDate: number;
    votesFor: BigNumber;
    votesAgainst: BigNumber;
  };
}

export interface VotingInterface extends utils.Interface {
  functions: {
    "CHAIRMAN_ROLE()": FunctionFragment;
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "addProposal(bytes,address,string)": FunctionFragment;
    "debatingPeriodDuration()": FunctionFragment;
    "finishProposal(uint64)": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "lastFinishDate(address)": FunctionFragment;
    "minimumQuorum()": FunctionFragment;
    "proposal(uint64)": FunctionFragment;
    "proposalsCount()": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "setStakingAddress(address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "vote(uint64,bool)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "CHAIRMAN_ROLE"
      | "DEFAULT_ADMIN_ROLE"
      | "addProposal"
      | "debatingPeriodDuration"
      | "finishProposal"
      | "getRoleAdmin"
      | "grantRole"
      | "hasRole"
      | "lastFinishDate"
      | "minimumQuorum"
      | "proposal"
      | "proposalsCount"
      | "renounceRole"
      | "revokeRole"
      | "setStakingAddress"
      | "supportsInterface"
      | "vote"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "CHAIRMAN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addProposal",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "debatingPeriodDuration",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "finishProposal",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "lastFinishDate",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "minimumQuorum",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "proposal",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "proposalsCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setStakingAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "vote",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<boolean>]
  ): string;

  decodeFunctionResult(
    functionFragment: "CHAIRMAN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "debatingPeriodDuration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "finishProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lastFinishDate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "minimumQuorum",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "proposal", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proposalsCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setStakingAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;

  events: {
    "ProposalAccepted(uint64,uint256,uint256,bytes)": EventFragment;
    "ProposalDeclined(uint64,uint256,uint256)": EventFragment;
    "ProposalFailed(uint64)": EventFragment;
    "ProposalVotingStarted(uint64,bytes,address,string)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ProposalAccepted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalDeclined"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalFailed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalVotingStarted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
}

export interface ProposalAcceptedEventObject {
  proposalId: BigNumber;
  votesFor: BigNumber;
  votesAgainst: BigNumber;
  funcResult: string;
}
export type ProposalAcceptedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, string],
  ProposalAcceptedEventObject
>;

export type ProposalAcceptedEventFilter =
  TypedEventFilter<ProposalAcceptedEvent>;

export interface ProposalDeclinedEventObject {
  proposalId: BigNumber;
  votesFor: BigNumber;
  votesAgainst: BigNumber;
}
export type ProposalDeclinedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  ProposalDeclinedEventObject
>;

export type ProposalDeclinedEventFilter =
  TypedEventFilter<ProposalDeclinedEvent>;

export interface ProposalFailedEventObject {
  proposalId: BigNumber;
}
export type ProposalFailedEvent = TypedEvent<
  [BigNumber],
  ProposalFailedEventObject
>;

export type ProposalFailedEventFilter = TypedEventFilter<ProposalFailedEvent>;

export interface ProposalVotingStartedEventObject {
  proposalId: BigNumber;
  callData: string;
  recipient: string;
  description: string;
}
export type ProposalVotingStartedEvent = TypedEvent<
  [BigNumber, string, string, string],
  ProposalVotingStartedEventObject
>;

export type ProposalVotingStartedEventFilter =
  TypedEventFilter<ProposalVotingStartedEvent>;

export interface RoleAdminChangedEventObject {
  role: string;
  previousAdminRole: string;
  newAdminRole: string;
}
export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  RoleAdminChangedEventObject
>;

export type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;

export interface RoleGrantedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleGrantedEvent = TypedEvent<
  [string, string, string],
  RoleGrantedEventObject
>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export interface RoleRevokedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleRevokedEvent = TypedEvent<
  [string, string, string],
  RoleRevokedEventObject
>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

export interface Voting extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VotingInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    CHAIRMAN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    addProposal(
      callData: PromiseOrValue<BytesLike>,
      recipient: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    debatingPeriodDuration(overrides?: CallOverrides): Promise<[number]>;

    finishProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    lastFinishDate(
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    minimumQuorum(overrides?: CallOverrides): Promise<[BigNumber]>;

    proposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[Voting.ProposalStructOutput]>;

    proposalsCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setStakingAddress(
      staking: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    vote(
      proposalId: PromiseOrValue<BigNumberish>,
      isFor: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  CHAIRMAN_ROLE(overrides?: CallOverrides): Promise<string>;

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  addProposal(
    callData: PromiseOrValue<BytesLike>,
    recipient: PromiseOrValue<string>,
    description: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  debatingPeriodDuration(overrides?: CallOverrides): Promise<number>;

  finishProposal(
    proposalId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getRoleAdmin(
    role: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  grantRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  hasRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  lastFinishDate(
    addr: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<number>;

  minimumQuorum(overrides?: CallOverrides): Promise<BigNumber>;

  proposal(
    proposalId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<Voting.ProposalStructOutput>;

  proposalsCount(overrides?: CallOverrides): Promise<BigNumber>;

  renounceRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revokeRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setStakingAddress(
    staking: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  vote(
    proposalId: PromiseOrValue<BigNumberish>,
    isFor: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    CHAIRMAN_ROLE(overrides?: CallOverrides): Promise<string>;

    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    addProposal(
      callData: PromiseOrValue<BytesLike>,
      recipient: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    debatingPeriodDuration(overrides?: CallOverrides): Promise<number>;

    finishProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    lastFinishDate(
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<number>;

    minimumQuorum(overrides?: CallOverrides): Promise<BigNumber>;

    proposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<Voting.ProposalStructOutput>;

    proposalsCount(overrides?: CallOverrides): Promise<BigNumber>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setStakingAddress(
      staking: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    vote(
      proposalId: PromiseOrValue<BigNumberish>,
      isFor: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ProposalAccepted(uint64,uint256,uint256,bytes)"(
      proposalId?: null,
      votesFor?: null,
      votesAgainst?: null,
      funcResult?: null
    ): ProposalAcceptedEventFilter;
    ProposalAccepted(
      proposalId?: null,
      votesFor?: null,
      votesAgainst?: null,
      funcResult?: null
    ): ProposalAcceptedEventFilter;

    "ProposalDeclined(uint64,uint256,uint256)"(
      proposalId?: null,
      votesFor?: null,
      votesAgainst?: null
    ): ProposalDeclinedEventFilter;
    ProposalDeclined(
      proposalId?: null,
      votesFor?: null,
      votesAgainst?: null
    ): ProposalDeclinedEventFilter;

    "ProposalFailed(uint64)"(proposalId?: null): ProposalFailedEventFilter;
    ProposalFailed(proposalId?: null): ProposalFailedEventFilter;

    "ProposalVotingStarted(uint64,bytes,address,string)"(
      proposalId?: null,
      callData?: null,
      recipient?: null,
      description?: null
    ): ProposalVotingStartedEventFilter;
    ProposalVotingStarted(
      proposalId?: null,
      callData?: null,
      recipient?: null,
      description?: null
    ): ProposalVotingStartedEventFilter;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: PromiseOrValue<BytesLike> | null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      role?: PromiseOrValue<BytesLike> | null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter;

    "RoleGranted(bytes32,address,address)"(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter;
    RoleGranted(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter;

    "RoleRevoked(bytes32,address,address)"(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter;
    RoleRevoked(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter;
  };

  estimateGas: {
    CHAIRMAN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    addProposal(
      callData: PromiseOrValue<BytesLike>,
      recipient: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    debatingPeriodDuration(overrides?: CallOverrides): Promise<BigNumber>;

    finishProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastFinishDate(
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    minimumQuorum(overrides?: CallOverrides): Promise<BigNumber>;

    proposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    proposalsCount(overrides?: CallOverrides): Promise<BigNumber>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setStakingAddress(
      staking: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    vote(
      proposalId: PromiseOrValue<BigNumberish>,
      isFor: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    CHAIRMAN_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    addProposal(
      callData: PromiseOrValue<BytesLike>,
      recipient: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    debatingPeriodDuration(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    finishProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lastFinishDate(
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    minimumQuorum(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    proposalsCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setStakingAddress(
      staking: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    vote(
      proposalId: PromiseOrValue<BigNumberish>,
      isFor: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
