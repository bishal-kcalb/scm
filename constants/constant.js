export const scmContract = '0xd656dFAeAe3aEeffF9699793A6D3E620782687ca'
export const scmAbi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_orderId",
				"type": "uint256"
			}
		],
		"name": "acceptOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_contact",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_manufacturerAddress",
				"type": "address"
			}
		],
		"name": "addManufacturer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addMedCategory",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_medType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_manufacturedDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_expiryDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_mrp",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_qrcodeUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_category",
				"type": "string"
			}
		],
		"name": "addMedicine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_contact",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_supplierAddress",
				"type": "address"
			}
		],
		"name": "addSupplier",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "changeMOHAddres",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "_medArray",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "_orderId",
				"type": "uint256"
			}
		],
		"name": "confirmOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_orderId",
				"type": "uint256"
			}
		],
		"name": "deliverOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "medArray",
				"type": "uint256[]"
			}
		],
		"name": "placeOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "_medArray",
				"type": "uint256[]"
			}
		],
		"name": "sellMedInBulk",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_supplierId",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_medId",
				"type": "uint256"
			}
		],
		"name": "sellMedToSupplier",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_shipperAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_orderId",
				"type": "uint256"
			}
		],
		"name": "transferForDeliver",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			}
		],
		"name": "verifyManufacturer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "verifyMedicine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "verifySupplier",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getallManufacturerDetail",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "contact",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "joinedDate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "walletAddress",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "verified",
						"type": "bool"
					}
				],
				"internalType": "struct SupplyChain.manufacturerDetails[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllMedicineDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "medId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "manufacturer",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "medType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "manufacturedDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "expiryDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "mrp",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "qrcodeUrl",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "verified",
						"type": "bool"
					}
				],
				"internalType": "struct SupplyChain.medicineDetails[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllSupplierDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "contact",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "joinedDate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "addedBy",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "walletAddress",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "verified",
						"type": "bool"
					}
				],
				"internalType": "struct SupplyChain.supplierDetails[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getDeliveryOrderList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256[]",
						"name": "medId",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256",
						"name": "orderId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "orderTo",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "orderer",
						"type": "address"
					},
					{
						"internalType": "enum SupplyChain.Status",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct SupplyChain.order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_manufacturerId",
				"type": "address"
			}
		],
		"name": "getManufacturerDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "contact",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "joinedDate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "walletAddress",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "verified",
						"type": "bool"
					}
				],
				"internalType": "struct SupplyChain.manufacturerDetails",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getManufacturerList",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			}
		],
		"name": "getManufacturerMedicineList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "medId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "manufacturer",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "medType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "manufacturedDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "expiryDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "mrp",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "qrcodeUrl",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "verified",
						"type": "bool"
					}
				],
				"internalType": "struct SupplyChain.medicineDetails[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getManufacturerOrderList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256[]",
						"name": "medId",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256",
						"name": "orderId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "orderTo",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "orderer",
						"type": "address"
					},
					{
						"internalType": "enum SupplyChain.Status",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct SupplyChain.order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			}
		],
		"name": "getManufacturerSoldMedicineList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "medId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "manufacturer",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "medType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "manufacturedDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "expiryDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "mrp",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "qrcodeUrl",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "verified",
						"type": "bool"
					}
				],
				"internalType": "struct SupplyChain.medicineDetails[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_manufacturerId",
				"type": "address"
			}
		],
		"name": "getManufacturerSupplierList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "contact",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "joinedDate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "addedBy",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "walletAddress",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "verified",
						"type": "bool"
					}
				],
				"internalType": "struct SupplyChain.supplierDetails[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_medicineId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_manufacturerId",
				"type": "address"
			}
		],
		"name": "getMedicineDetails",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "medId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "manufacturer",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "medType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "manufacturedDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "expiryDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "mrp",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "qrcodeUrl",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "verified",
						"type": "bool"
					}
				],
				"internalType": "struct SupplyChain.medicineDetails",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSupplierList",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_supplierId",
				"type": "address"
			}
		],
		"name": "getSupplierManufacturerList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "contact",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "joinedDate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "walletAddress",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "verified",
						"type": "bool"
					}
				],
				"internalType": "struct SupplyChain.manufacturerDetails[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_supplierId",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_manufacturerId",
				"type": "address"
			}
		],
		"name": "getSupplierMedicineList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "medId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "manufacturer",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "medType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "manufacturedDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "expiryDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "mrp",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "qrcodeUrl",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "verified",
						"type": "bool"
					}
				],
				"internalType": "struct SupplyChain.medicineDetails[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getSupplierOrderList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256[]",
						"name": "medId",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256",
						"name": "orderId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "orderTo",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "orderer",
						"type": "address"
					},
					{
						"internalType": "enum SupplyChain.Status",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct SupplyChain.order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getUserRole",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]