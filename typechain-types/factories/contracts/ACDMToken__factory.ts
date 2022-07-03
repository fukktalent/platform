/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { ACDMToken, ACDMTokenInterface } from "../../contracts/ACDMToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
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
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
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
    name: "MINTER_BURNER_ROLE",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620029b4380380620029b48339818101604052810190620000379190620005fc565b8181816003908051906020019062000051929190620003af565b5080600490805190602001906200006a929190620003af565b505050620000a17f65d452b81866951f4186359b7910a85164d1ed7291ac9f34f9a3286df3bcf83960001b620001c360201b60201c565b620000d57f7a4053b948d999937fa2de7561ba69a43df07705b8077b2b4064ee5322b0c11960001b620001c360201b60201c565b620001097ffae32df89c4a8feaebea37b20945789c1756866048e5bd6ca1e35298b082c8ee60001b620001c360201b60201c565b6200011e6000801b33620001c660201b60201c565b620001527f90a7abf9f2b38d5fbaa0e6202d307cc5e6de2c2e6f7989a1b1244b861564ab9c60001b620001c360201b60201c565b620001867f95acb7d1840dd2451d7843c624ab94884aaa53e077363cb4fcc5e0dc8956c6b160001b620001c360201b60201c565b620001bb7fcfd53186d792f1ec9d0679afc2dc3ffc86fc31fe1e0f342b838eb6c3eade62b36000801b620002b860201b60201c565b5050620006e5565b50565b620001d882826200031c60201b60201c565b620002b45760016005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550620002596200038760201b60201c565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b6000620002cb836200038f60201b60201c565b90508160056000858152602001908152602001600020600101819055508181847fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff60405160405180910390a4505050565b60006005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600033905090565b600060056000838152602001908152602001600020600101549050919050565b828054620003bd90620006b0565b90600052602060002090601f016020900481019282620003e157600085556200042d565b82601f10620003fc57805160ff19168380011785556200042d565b828001600101855582156200042d579182015b828111156200042c5782518255916020019190600101906200040f565b5b5090506200043c919062000440565b5090565b5b808211156200045b57600081600090555060010162000441565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620004c8826200047d565b810181811067ffffffffffffffff82111715620004ea57620004e96200048e565b5b80604052505050565b6000620004ff6200045f565b90506200050d8282620004bd565b919050565b600067ffffffffffffffff82111562000530576200052f6200048e565b5b6200053b826200047d565b9050602081019050919050565b60005b83811015620005685780820151818401526020810190506200054b565b8381111562000578576000848401525b50505050565b6000620005956200058f8462000512565b620004f3565b905082815260208101848484011115620005b457620005b362000478565b5b620005c184828562000548565b509392505050565b600082601f830112620005e157620005e062000473565b5b8151620005f38482602086016200057e565b91505092915050565b6000806040838503121562000616576200061562000469565b5b600083015167ffffffffffffffff8111156200063757620006366200046e565b5b6200064585828601620005c9565b925050602083015167ffffffffffffffff8111156200066957620006686200046e565b5b6200067785828601620005c9565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620006c957607f821691505b602082108103620006df57620006de62000681565b5b50919050565b6122bf80620006f56000396000f3fe608060405234801561001057600080fd5b506004361061016c5760003560e01c806340c10f19116100cd578063a217fddf11610081578063a9059cbb11610066578063a9059cbb146103f9578063d547741f14610429578063dd62ed3e146104455761016c565b8063a217fddf146103ab578063a457c2d7146103c95761016c565b806372c32860116100b257806372c328601461033f57806391d148541461035d57806395d89b411461038d5761016c565b806340c10f19146102f357806370a082311461030f5761016c565b8063248a9ca311610124578063313ce56711610109578063313ce5671461028957806336568abe146102a757806339509351146102c35761016c565b8063248a9ca31461023d5780632f2ff15d1461026d5761016c565b8063095ea7b311610155578063095ea7b3146101bf57806318160ddd146101ef57806323b872dd1461020d5761016c565b806301ffc9a71461017157806306fdde03146101a1575b600080fd5b61018b60048036038101906101869190611693565b610475565b60405161019891906116db565b60405180910390f35b6101a96104ef565b6040516101b6919061178f565b60405180910390f35b6101d960048036038101906101d49190611845565b610581565b6040516101e691906116db565b60405180910390f35b6101f76105a4565b6040516102049190611894565b60405180910390f35b610227600480360381019061022291906118af565b6105ae565b60405161023491906116db565b60405180910390f35b61025760048036038101906102529190611938565b6105dd565b6040516102649190611974565b60405180910390f35b6102876004803603810190610282919061198f565b6105fd565b005b61029161061e565b60405161029e91906119eb565b60405180910390f35b6102c160048036038101906102bc919061198f565b6106ab565b005b6102dd60048036038101906102d89190611845565b61072e565b6040516102ea91906116db565b60405180910390f35b61030d60048036038101906103089190611845565b610765565b005b61032960048036038101906103249190611a06565b610822565b6040516103369190611894565b60405180910390f35b61034761086a565b6040516103549190611974565b60405180910390f35b6103776004803603810190610372919061198f565b61088e565b60405161038491906116db565b60405180910390f35b6103956108f9565b6040516103a2919061178f565b60405180910390f35b6103b361098b565b6040516103c09190611974565b60405180910390f35b6103e360048036038101906103de9190611845565b610992565b6040516103f091906116db565b60405180910390f35b610413600480360381019061040e9190611845565b610a09565b60405161042091906116db565b60405180910390f35b610443600480360381019061043e919061198f565b610a2c565b005b61045f600480360381019061045a9190611a33565b610a4d565b60405161046c9190611894565b60405180910390f35b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806104e857506104e782610ad4565b5b9050919050565b6060600380546104fe90611aa2565b80601f016020809104026020016040519081016040528092919081815260200182805461052a90611aa2565b80156105775780601f1061054c57610100808354040283529160200191610577565b820191906000526020600020905b81548152906001019060200180831161055a57829003601f168201915b5050505050905090565b60008061058c610b3e565b9050610599818585610b46565b600191505092915050565b6000600254905090565b6000806105b9610b3e565b90506105c6858285610d0f565b6105d1858585610d9b565b60019150509392505050565b600060056000838152602001908152602001600020600101549050919050565b610606826105dd565b61060f8161101a565b610619838361102e565b505050565b600061064c7fc290ed7bcdabe2797359799d9fa166f6ce211dc58297d5927c730aea7a6609c760001b61110f565b6106787ff3af7517eab3b8882e8e0bc547072cf98e07772f569f5ff5dc9b1f7a509df1c960001b61110f565b6106a47fbd1ce910973cbf3255c1cb7e9b103fe195aea89bd493d625960a11052ca5369560001b61110f565b6006905090565b6106b3610b3e565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610720576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161071790611b45565b60405180910390fd5b61072a8282611112565b5050565b600080610739610b3e565b905061075a81858561074b8589610a4d565b6107559190611b94565b610b46565b600191505092915050565b7fcfd53186d792f1ec9d0679afc2dc3ffc86fc31fe1e0f342b838eb6c3eade62b361078f8161101a565b6107bb7fcfae0aa17aa94aa6a0df475037eff96ae28dc9b1da1ab8b23d9b1dba07238f8660001b61110f565b6107e77ffe75526944011a278c8978b56d56cc5b0a4bc1f4207df2de1b0d991f92de184960001b61110f565b6108137f2b2d408da5951a534e54cc1870304cd0a66bd4e7af7ef71ec866d6475ffd76ae60001b61110f565b61081d83836111f4565b505050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b7fcfd53186d792f1ec9d0679afc2dc3ffc86fc31fe1e0f342b838eb6c3eade62b381565b60006005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60606004805461090890611aa2565b80601f016020809104026020016040519081016040528092919081815260200182805461093490611aa2565b80156109815780601f1061095657610100808354040283529160200191610981565b820191906000526020600020905b81548152906001019060200180831161096457829003601f168201915b5050505050905090565b6000801b81565b60008061099d610b3e565b905060006109ab8286610a4d565b9050838110156109f0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109e790611c5c565b60405180910390fd5b6109fd8286868403610b46565b60019250505092915050565b600080610a14610b3e565b9050610a21818585610d9b565b600191505092915050565b610a35826105dd565b610a3e8161101a565b610a488383611112565b505050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610bb5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bac90611cee565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610c24576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c1b90611d80565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92583604051610d029190611894565b60405180910390a3505050565b6000610d1b8484610a4d565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610d955781811015610d87576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d7e90611dec565b60405180910390fd5b610d948484848403610b46565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610e0a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e0190611e7e565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610e79576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e7090611f10565b60405180910390fd5b610e84838383611353565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610f0a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f0190611fa2565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610f9d9190611b94565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516110019190611894565b60405180910390a3611014848484611358565b50505050565b61102b81611026610b3e565b61135d565b50565b611038828261088e565b61110b5760016005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506110b0610b3e565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b50565b61111c828261088e565b156111f05760006005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550611195610b3e565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611263576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161125a9061200e565b60405180910390fd5b61126f60008383611353565b80600260008282546112819190611b94565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546112d69190611b94565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161133b9190611894565b60405180910390a361134f60008383611358565b5050565b505050565b505050565b611367828261088e565b6113f65761138c8173ffffffffffffffffffffffffffffffffffffffff1660146113fa565b61139a8360001c60206113fa565b6040516020016113ab929190612102565b6040516020818303038152906040526040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113ed919061178f565b60405180910390fd5b5050565b60606000600283600261140d919061213c565b6114179190611b94565b67ffffffffffffffff8111156114305761142f612196565b5b6040519080825280601f01601f1916602001820160405280156114625781602001600182028036833780820191505090505b5090507f30000000000000000000000000000000000000000000000000000000000000008160008151811061149a576114996121c5565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f7800000000000000000000000000000000000000000000000000000000000000816001815181106114fe576114fd6121c5565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506000600184600261153e919061213c565b6115489190611b94565b90505b60018111156115e8577f3031323334353637383961626364656600000000000000000000000000000000600f86166010811061158a576115896121c5565b5b1a60f81b8282815181106115a1576115a06121c5565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600485901c9450806115e1906121f4565b905061154b565b506000841461162c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161162390612269565b60405180910390fd5b8091505092915050565b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6116708161163b565b811461167b57600080fd5b50565b60008135905061168d81611667565b92915050565b6000602082840312156116a9576116a8611636565b5b60006116b78482850161167e565b91505092915050565b60008115159050919050565b6116d5816116c0565b82525050565b60006020820190506116f060008301846116cc565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611730578082015181840152602081019050611715565b8381111561173f576000848401525b50505050565b6000601f19601f8301169050919050565b6000611761826116f6565b61176b8185611701565b935061177b818560208601611712565b61178481611745565b840191505092915050565b600060208201905081810360008301526117a98184611756565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006117dc826117b1565b9050919050565b6117ec816117d1565b81146117f757600080fd5b50565b600081359050611809816117e3565b92915050565b6000819050919050565b6118228161180f565b811461182d57600080fd5b50565b60008135905061183f81611819565b92915050565b6000806040838503121561185c5761185b611636565b5b600061186a858286016117fa565b925050602061187b85828601611830565b9150509250929050565b61188e8161180f565b82525050565b60006020820190506118a96000830184611885565b92915050565b6000806000606084860312156118c8576118c7611636565b5b60006118d6868287016117fa565b93505060206118e7868287016117fa565b92505060406118f886828701611830565b9150509250925092565b6000819050919050565b61191581611902565b811461192057600080fd5b50565b6000813590506119328161190c565b92915050565b60006020828403121561194e5761194d611636565b5b600061195c84828501611923565b91505092915050565b61196e81611902565b82525050565b60006020820190506119896000830184611965565b92915050565b600080604083850312156119a6576119a5611636565b5b60006119b485828601611923565b92505060206119c5858286016117fa565b9150509250929050565b600060ff82169050919050565b6119e5816119cf565b82525050565b6000602082019050611a0060008301846119dc565b92915050565b600060208284031215611a1c57611a1b611636565b5b6000611a2a848285016117fa565b91505092915050565b60008060408385031215611a4a57611a49611636565b5b6000611a58858286016117fa565b9250506020611a69858286016117fa565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611aba57607f821691505b602082108103611acd57611acc611a73565b5b50919050565b7f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560008201527f20726f6c657320666f722073656c660000000000000000000000000000000000602082015250565b6000611b2f602f83611701565b9150611b3a82611ad3565b604082019050919050565b60006020820190508181036000830152611b5e81611b22565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611b9f8261180f565b9150611baa8361180f565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611bdf57611bde611b65565b5b828201905092915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b6000611c46602583611701565b9150611c5182611bea565b604082019050919050565b60006020820190508181036000830152611c7581611c39565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000611cd8602483611701565b9150611ce382611c7c565b604082019050919050565b60006020820190508181036000830152611d0781611ccb565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b6000611d6a602283611701565b9150611d7582611d0e565b604082019050919050565b60006020820190508181036000830152611d9981611d5d565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b6000611dd6601d83611701565b9150611de182611da0565b602082019050919050565b60006020820190508181036000830152611e0581611dc9565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b6000611e68602583611701565b9150611e7382611e0c565b604082019050919050565b60006020820190508181036000830152611e9781611e5b565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b6000611efa602383611701565b9150611f0582611e9e565b604082019050919050565b60006020820190508181036000830152611f2981611eed565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b6000611f8c602683611701565b9150611f9782611f30565b604082019050919050565b60006020820190508181036000830152611fbb81611f7f565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6000611ff8601f83611701565b915061200382611fc2565b602082019050919050565b6000602082019050818103600083015261202781611feb565b9050919050565b600081905092915050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000600082015250565b600061206f60178361202e565b915061207a82612039565b601782019050919050565b6000612090826116f6565b61209a818561202e565b93506120aa818560208601611712565b80840191505092915050565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000600082015250565b60006120ec60118361202e565b91506120f7826120b6565b601182019050919050565b600061210d82612062565b91506121198285612085565b9150612124826120df565b91506121308284612085565b91508190509392505050565b60006121478261180f565b91506121528361180f565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561218b5761218a611b65565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006121ff8261180f565b91506000820361221257612211611b65565b5b600182039050919050565b7f537472696e67733a20686578206c656e67746820696e73756666696369656e74600082015250565b6000612253602083611701565b915061225e8261221d565b602082019050919050565b6000602082019050818103600083015261228281612246565b905091905056fea2646970667358221220fb874c50627d8a08a2df3556ae7607b3476fe83c3a3cdaca4dacfb2ba06a721564736f6c634300080d0033";

type ACDMTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ACDMTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ACDMToken__factory extends ContractFactory {
  constructor(...args: ACDMTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ACDMToken> {
    return super.deploy(name, symbol, overrides || {}) as Promise<ACDMToken>;
  }
  override getDeployTransaction(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, overrides || {});
  }
  override attach(address: string): ACDMToken {
    return super.attach(address) as ACDMToken;
  }
  override connect(signer: Signer): ACDMToken__factory {
    return super.connect(signer) as ACDMToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ACDMTokenInterface {
    return new utils.Interface(_abi) as ACDMTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ACDMToken {
    return new Contract(address, _abi, signerOrProvider) as ACDMToken;
  }
}
