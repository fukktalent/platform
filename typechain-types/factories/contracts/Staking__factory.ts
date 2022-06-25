/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Staking, StakingInterface } from "../../contracts/Staking";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "tokenPair_",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "rewardToken_",
        type: "address",
      },
      {
        internalType: "address",
        name: "votingAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ActiveVotingExists",
    type: "error",
  },
  {
    inputs: [],
    name: "TokensFreezed",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroRewards",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Claimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Staked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstaked",
    type: "event",
  },
  {
    inputs: [],
    name: "DAO_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "freezePeriod",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "getStakeData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "lpAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rewardAmount",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "startTime",
            type: "uint32",
          },
        ],
        internalType: "struct Staking.Stake",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardPercent",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardPeriod",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "freezePeriod_",
        type: "uint32",
      },
    ],
    name: "setFreezePeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "rewardPercent_",
        type: "uint32",
      },
    ],
    name: "setRewardPercent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "rewardPeriod_",
        type: "uint32",
      },
    ],
    name: "setRewardPeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405262093a80600560046101000a81548163ffffffff021916908363ffffffff1602179055506003600560086101000a81548163ffffffff021916908363ffffffff1602179055503480156200005757600080fd5b506040516200234c3803806200234c83398181016040528101906200007d919062000459565b620000926000801b33620001c560201b60201c565b620000c47f3b5d4cc60d3ec3516ee8ae083bd60934f6eb2a6c54b1229985c41bfb092b260382620001c560201b60201c565b620000f97f3b5d4cc60d3ec3516ee8ae083bd60934f6eb2a6c54b1229985c41bfb092b26036000801b620002b660201b60201c565b82600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050620004b5565b620001d782826200031960201b60201c565b620002b257600160008084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550620002576200038360201b60201c565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b6000620002c9836200038b60201b60201c565b905081600080858152602001908152602001600020600101819055508181847fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff60405160405180910390a4505050565b600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600033905090565b6000806000838152602001908152602001600020600101549050919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620003dc82620003af565b9050919050565b6000620003f082620003cf565b9050919050565b6200040281620003e3565b81146200040e57600080fd5b50565b6000815190506200042281620003f7565b92915050565b6200043381620003cf565b81146200043f57600080fd5b50565b600081519050620004538162000428565b92915050565b600080600060608486031215620004755762000474620003aa565b5b6000620004858682870162000411565b9350506020620004988682870162000411565b9250506040620004ab8682870162000442565b9150509250925092565b611e8780620004c56000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c8063845afce9116100a2578063d030205111610071578063d0302051146102a3578063d547741f146102c1578063da66d4dc146102dd578063e88dc5b71461030d578063e9c265181461032b57610116565b8063845afce91461021d57806391d1485414610239578063a217fddf14610269578063a694fc3a1461028757610116565b80632def6620116100e95780632def6620146101b55780632f2ff15d146101bf578063318d802b146101db57806336568abe146101f75780634e71d92d1461021357610116565b806301ffc9a71461011b5780630a3cb6631461014b5780631093aa6c14610169578063248a9ca314610185575b600080fd5b610135600480360381019061013091906114f6565b610349565b604051610142919061153e565b60405180910390f35b6101536103c3565b6040516101609190611578565b60405180910390f35b610183600480360381019061017e91906115bf565b6103dd565b005b61019f600480360381019061019a9190611622565b61042c565b6040516101ac919061165e565b60405180910390f35b6101bd61044b565b005b6101d960048036038101906101d491906116d7565b6107a8565b005b6101f560048036038101906101f091906115bf565b6107c9565b005b610211600480360381019061020c91906116d7565b6107fb565b005b61021b61087e565b005b610237600480360381019061023291906115bf565b610a98565b005b610253600480360381019061024e91906116d7565b610aca565b604051610260919061153e565b60405180910390f35b610271610b34565b60405161027e919061165e565b60405180910390f35b6102a1600480360381019061029c919061174d565b610b3b565b005b6102ab610d35565b6040516102b89190611578565b60405180910390f35b6102db60048036038101906102d691906116d7565b610d4f565b005b6102f760048036038101906102f2919061177a565b610d70565b6040516103049190611807565b60405180910390f35b610315610e03565b6040516103229190611578565b60405180910390f35b610333610e1d565b604051610340919061165e565b60405180910390f35b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806103bc57506103bb82610e41565b5b9050919050565b6000600560009054906101000a900463ffffffff16905090565b7f3b5d4cc60d3ec3516ee8ae083bd60934f6eb2a6c54b1229985c41bfb092b260361040781610eab565b81600560006101000a81548163ffffffff021916908363ffffffff1602179055505050565b6000806000838152602001908152602001600020600101549050919050565b600560009054906101000a900463ffffffff16600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900463ffffffff166104bb9190611851565b63ffffffff164210156104fa576040517f7531ed2d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bcf489b9336040518263ffffffff1660e01b8152600401610557919061189a565b602060405180830381865afa158015610574573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061059891906118ca565b90508063ffffffff164210156105da576040517fac6853da00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6105e333610ebf565b600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600082825461063491906118f7565b925050819055506000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015490506000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000181905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b815260040161072792919061195c565b6020604051808303816000875af1158015610746573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061076a91906119b1565b507f0f5bb82176feb1b5e747e28471aa92156a04d9f3ab9f45f28e2d704232b93f75338260405161079c92919061195c565b60405180910390a15050565b6107b18261042c565b6107ba81610eab565b6107c48383610fd0565b505050565b6000801b6107d681610eab565b81600560086101000a81548163ffffffff021916908363ffffffff1602179055505050565b6108036110b0565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610870576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086790611a61565b60405180910390fd5b61087a82826110b8565b5050565b600061088933610ebf565b600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101546108d691906118f7565b905060008103610912576040517f899aaa9d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001018190555042600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160006101000a81548163ffffffff021916908363ffffffff160217905550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b8152600401610a1892919061195c565b6020604051808303816000875af1158015610a37573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a5b91906119b1565b507fd8138f8a3f377c5259ca548e70e4c2de94f129f5a11036a15b69513cba2b426a3382604051610a8d92919061195c565b60405180910390a150565b6000801b610aa581610eab565b81600560046101000a81548163ffffffff021916908363ffffffff1602179055505050565b600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6000801b81565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b8152600401610b9a93929190611a81565b6020604051808303816000875af1158015610bb9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bdd91906119b1565b50610be733610ebf565b600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000828254610c3891906118f7565b9250508190555080600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000016000828254610c9191906118f7565b9250508190555042600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160006101000a81548163ffffffff021916908363ffffffff1602179055507f9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d3382604051610d2a92919061195c565b60405180910390a150565b6000600560089054906101000a900463ffffffff16905090565b610d588261042c565b610d6181610eab565b610d6b83836110b8565b505050565b610d78611472565b600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060405180606001604052908160008201548152602001600182015481526020016002820160009054906101000a900463ffffffff1663ffffffff1663ffffffff16815250509050919050565b6000600560049054906101000a900463ffffffff16905090565b7f3b5d4cc60d3ec3516ee8ae083bd60934f6eb2a6c54b1229985c41bfb092b260381565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b610ebc81610eb76110b0565b611199565b50565b600080600560049054906101000a900463ffffffff1663ffffffff16600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900463ffffffff1663ffffffff1642610f3f9190611ab8565b610f499190611b1b565b90506064600560089054906101000a900463ffffffff1663ffffffff16600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015483610fb49190611b4c565b610fbe9190611b4c565b610fc89190611b1b565b915050919050565b610fda8282610aca565b6110ac57600160008084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506110516110b0565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b600033905090565b6110c28282610aca565b1561119557600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555061113a6110b0565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b6111a38282610aca565b611232576111c88173ffffffffffffffffffffffffffffffffffffffff166014611236565b6111d68360001c6020611236565b6040516020016111e7929190611cb8565b6040516020818303038152906040526040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112299190611d3c565b60405180910390fd5b5050565b6060600060028360026112499190611b4c565b61125391906118f7565b67ffffffffffffffff81111561126c5761126b611d5e565b5b6040519080825280601f01601f19166020018201604052801561129e5781602001600182028036833780820191505090505b5090507f3000000000000000000000000000000000000000000000000000000000000000816000815181106112d6576112d5611d8d565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f78000000000000000000000000000000000000000000000000000000000000008160018151811061133a57611339611d8d565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506000600184600261137a9190611b4c565b61138491906118f7565b90505b6001811115611424577f3031323334353637383961626364656600000000000000000000000000000000600f8616601081106113c6576113c5611d8d565b5b1a60f81b8282815181106113dd576113dc611d8d565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600485901c94508061141d90611dbc565b9050611387565b5060008414611468576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161145f90611e31565b60405180910390fd5b8091505092915050565b60405180606001604052806000815260200160008152602001600063ffffffff1681525090565b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6114d38161149e565b81146114de57600080fd5b50565b6000813590506114f0816114ca565b92915050565b60006020828403121561150c5761150b611499565b5b600061151a848285016114e1565b91505092915050565b60008115159050919050565b61153881611523565b82525050565b6000602082019050611553600083018461152f565b92915050565b600063ffffffff82169050919050565b61157281611559565b82525050565b600060208201905061158d6000830184611569565b92915050565b61159c81611559565b81146115a757600080fd5b50565b6000813590506115b981611593565b92915050565b6000602082840312156115d5576115d4611499565b5b60006115e3848285016115aa565b91505092915050565b6000819050919050565b6115ff816115ec565b811461160a57600080fd5b50565b60008135905061161c816115f6565b92915050565b60006020828403121561163857611637611499565b5b60006116468482850161160d565b91505092915050565b611658816115ec565b82525050565b6000602082019050611673600083018461164f565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006116a482611679565b9050919050565b6116b481611699565b81146116bf57600080fd5b50565b6000813590506116d1816116ab565b92915050565b600080604083850312156116ee576116ed611499565b5b60006116fc8582860161160d565b925050602061170d858286016116c2565b9150509250929050565b6000819050919050565b61172a81611717565b811461173557600080fd5b50565b60008135905061174781611721565b92915050565b60006020828403121561176357611762611499565b5b600061177184828501611738565b91505092915050565b6000602082840312156117905761178f611499565b5b600061179e848285016116c2565b91505092915050565b6117b081611717565b82525050565b6117bf81611559565b82525050565b6060820160008201516117db60008501826117a7565b5060208201516117ee60208501826117a7565b50604082015161180160408501826117b6565b50505050565b600060608201905061181c60008301846117c5565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061185c82611559565b915061186783611559565b92508263ffffffff038211156118805761187f611822565b5b828201905092915050565b61189481611699565b82525050565b60006020820190506118af600083018461188b565b92915050565b6000815190506118c481611593565b92915050565b6000602082840312156118e0576118df611499565b5b60006118ee848285016118b5565b91505092915050565b600061190282611717565b915061190d83611717565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561194257611941611822565b5b828201905092915050565b61195681611717565b82525050565b6000604082019050611971600083018561188b565b61197e602083018461194d565b9392505050565b61198e81611523565b811461199957600080fd5b50565b6000815190506119ab81611985565b92915050565b6000602082840312156119c7576119c6611499565b5b60006119d58482850161199c565b91505092915050565b600082825260208201905092915050565b7f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560008201527f20726f6c657320666f722073656c660000000000000000000000000000000000602082015250565b6000611a4b602f836119de565b9150611a56826119ef565b604082019050919050565b60006020820190508181036000830152611a7a81611a3e565b9050919050565b6000606082019050611a96600083018661188b565b611aa3602083018561188b565b611ab0604083018461194d565b949350505050565b6000611ac382611717565b9150611ace83611717565b925082821015611ae157611ae0611822565b5b828203905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000611b2682611717565b9150611b3183611717565b925082611b4157611b40611aec565b5b828204905092915050565b6000611b5782611717565b9150611b6283611717565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611b9b57611b9a611822565b5b828202905092915050565b600081905092915050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000600082015250565b6000611be7601783611ba6565b9150611bf282611bb1565b601782019050919050565b600081519050919050565b60005b83811015611c26578082015181840152602081019050611c0b565b83811115611c35576000848401525b50505050565b6000611c4682611bfd565b611c508185611ba6565b9350611c60818560208601611c08565b80840191505092915050565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000600082015250565b6000611ca2601183611ba6565b9150611cad82611c6c565b601182019050919050565b6000611cc382611bda565b9150611ccf8285611c3b565b9150611cda82611c95565b9150611ce68284611c3b565b91508190509392505050565b6000601f19601f8301169050919050565b6000611d0e82611bfd565b611d1881856119de565b9350611d28818560208601611c08565b611d3181611cf2565b840191505092915050565b60006020820190508181036000830152611d568184611d03565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000611dc782611717565b915060008203611dda57611dd9611822565b5b600182039050919050565b7f537472696e67733a20686578206c656e67746820696e73756666696369656e74600082015250565b6000611e1b6020836119de565b9150611e2682611de5565b602082019050919050565b60006020820190508181036000830152611e4a81611e0e565b905091905056fea2646970667358221220066539d4f32fa29dcdee74300d9c3f6295536045d0f8b7421f6e591537c67eeb64736f6c634300080d0033";

type StakingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StakingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Staking__factory extends ContractFactory {
  constructor(...args: StakingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    tokenPair_: PromiseOrValue<string>,
    rewardToken_: PromiseOrValue<string>,
    votingAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Staking> {
    return super.deploy(
      tokenPair_,
      rewardToken_,
      votingAddress,
      overrides || {}
    ) as Promise<Staking>;
  }
  override getDeployTransaction(
    tokenPair_: PromiseOrValue<string>,
    rewardToken_: PromiseOrValue<string>,
    votingAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      tokenPair_,
      rewardToken_,
      votingAddress,
      overrides || {}
    );
  }
  override attach(address: string): Staking {
    return super.attach(address) as Staking;
  }
  override connect(signer: Signer): Staking__factory {
    return super.connect(signer) as Staking__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakingInterface {
    return new utils.Interface(_abi) as StakingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Staking {
    return new Contract(address, _abi, signerOrProvider) as Staking;
  }
}
