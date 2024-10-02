<template>
    <div class="flex justify-between items-center">
        <svg @click="toogle()" class="w-[35px] h-[35px] text-gray-800 dark:text-white md:hidden" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#F5F5F5" viewBox="0 0 24 24">
            <path stroke="#FF6600" stroke-linecap="round" stroke-width="1.1" d="M5 7h14M5 12h14M5 17h14" />
        </svg>

        <h1 class="text-[#604CC3] text-3xl">{{ props.userRole }}</h1>
        <div>
            <ButtonSecondary :class="{'hidden':isConnected}" :title="title" @click="connectWallet()"/>
            <ButtonSecondary :title="title" class="hidden" />
            <span class="text-[#FF6600]">{{ account }}</span>
        </div>

        
            <UModal v-model="isOpen">
                <div class="p-4">
                    <h1 class="text-center pb-[2rem] pt-[1rem] text-lg">
                        Connect Your Wallet
                    </h1>
                    <div class="flex items-center gap-3 justify-center pb-3">
                        <img src="../assets/images/MetaMask.png" alt="" class="h-[40px]" />
                        <span @click="connectWallet" class="hover:text-bgfrom cursor-pointer">Metamask</span>
                    </div>
                </div>
            </UModal>
        
    </div>
</template>

<script setup>
const props =defineProps({
    userRole:{
        type:String,
        required:true
    }
})

import Web3 from "web3";
const title = 'Connect Wallet'
const toogleMenu = ref(false)

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

const emit = defineEmits(['update']);

const toogle = ()=>{
    toogleMenu.value = !toogleMenu.value
    console.log(toogleMenu.value)
    emit('update',toogleMenu.value)
}

onMounted(async () => {
    await connectWallet();
});
</script>