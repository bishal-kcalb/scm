<template>
    <header
      class="fixed w-[100%] flex flex-col items-center justify-center p-4 pt-0 pb-0 bg-[#1a1d23] md:flex-row"
    >
      <h1>
        <!-- {{ acc }} -->
      </h1>
      <div
        class="fixed bottom-0 h-[5rem] w-[100%] justify-center bg-gradient-to-r from-bgfrom to-bgto md:static md:justify-start md:bg-none flex items-center space-x-4"
      >
        <div class="hidden md:flex md:items-center space-x-2">
            <h1>KUSCM</h1>
  
        </div>
        <nav class="md:flex flex-row space-x-4 mt-0">
        </nav>
      </div>
      <div
        class="fixed flex p-4 justify-between top-0 w-[100%] items-center h-[5rem] bg-[#1a1d23] md:static md:flex md:items- md:w[auto] space-x-4 mt-0 md:mt-0 md:justify-end"
      >

        <div class="flex max-w-[50%] gap-3 overflow-hidden">
          <button
            :class="{ hidden: isConnected }"
            @click="isOpen = true"
            class="inline-flex text-[#c4cfde] items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 bg-gradient-to-r from-bgfrom to-bgto"
          >
            CONNECT
          </button>
          <button
              
              class="m-1 boxShadow inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 h-10 hover:text-white bg-[#1a1d23] text-[#e53bb8] px-8 py-4"
            >
         {{ account }}
      </button>
        </div>
      </div>
      <div>
        <UModal v-model="isOpen">
          <div class="p-4">
            <h1 class="text-center pb-[2rem] pt-[1rem] text-lg">
              Connect Your Wallet
            </h1>
            <div class="flex items-center gap-3 justify-center pb-3">
              <img src="../assets/images/MetaMask.png" alt="" class="h-[40px]" />
              <span
                @click="connectWallet"
                class="hover:text-bgfrom cursor-pointer"
                >Metamask</span
              >
            </div>
          </div>
        </UModal>
      </div>
    </header>
  </template>
  
  <script setup>
  import Web3 from "web3";
  const toast = useToast();
  const isOpen = ref(false);
  const account = ref();
  const isConnected = ref(false);
  
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web3 = new Web3(window.ethereum);
        const chainId = await web3.eth.getChainId();
  
        // Check if the current chainId is not 1 (Ethereum Mainnet)
        if (chainId !== parseInt("0xAB4130", 16)) {
          await switchNetwork("0xAB4130");
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          
          account.value = accounts[0].slice(0, 6) + '...' + accounts[0].slice(-3);;
          isConnected.value = true;
          isOpen.value = false;
        }
        
      } catch (error) {
        //   console.error('Error connecting to MetaMask:', error);
        toast.add({
          title: "Error connecting to MetaMask",
          description: error,
          color: "red",
        });
      }
    } else {
      console.error(
        "MetaMask is not installed. Please install MetaMask and try again."
      );
    }
  };
  
  const switchNetwork = async (targetChainId) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: targetChainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: targetChainId,
                chainName: "Supply",
                rpcUrls: ["http://127.0.0.1:8545"],
                nativeCurrency: {
                  name: "Supply",
                  symbol: "scm",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://inoai.live"],
              },
            ],
          });
        } catch (addError) {
          console.error("Error adding Supply network:", addError);
          toast.add({
            title: "Error adding Supply network",
            description: error,
            color: "red",
          });
        }
      } else {
        console.error("Error switching network:", switchError);
        toast.add({
          title: "Error switching network",
          description: error,
          color: "red",
        });
      }
    }
  };
  
  
  
  onMounted(async () => {
    await connectWallet();
  });
  </script>
  
  
  <style>
  .router-link-active{
      /* font-weight: bold;
      color: blue; */
      color: #e53bb8;
      border-bottom: 2px solid #e53bb8;
      font:bolder;
  }
  
  
  </style>