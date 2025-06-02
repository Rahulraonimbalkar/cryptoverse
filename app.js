import React, { useState } from 'react';

// Main App component
function App() {
    // State for LLM interaction
    const [llmPrompt, setLlmPrompt] = useState('');
    const [llmResponse, setLlmResponse] = useState('Ask me anything about crypto!');
    const [llmLoading, setLlmLoading] = useState(false);

    // State for Web3 simulation
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('Not Connected');
    const [contractInteractionResult, setContractInteractionResult] = useState('No interaction yet.');
    const [contractAddressInput, setContractAddressInput] = useState('');
    const [contractFunctionInput, setContractFunctionInput] = useState('');
    const [contractArgsInput, setContractArgsInput] = useState('');

    /**
     * Handles sending the prompt to the LLM (Gemini API).
     * This function simulates an API call to a large language model.
     */
    const handleLlmSubmit = async () => {
        if (!llmPrompt.trim()) {
            setLlmResponse('Please enter a prompt.');
            return;
        }

        setLlmLoading(true);
        setLlmResponse('Thinking...');

        try {
            // Prepare the chat history for the LLM API call
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: llmPrompt }] });

            const payload = { contents: chatHistory };
            const apiKey = ""; // API key will be provided by the environment
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            // Make the API call to the Gemini LLM
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            // Process the LLM's response
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setLlmResponse(text);
            } else {
                setLlmResponse('Error: Could not get a valid response from the LLM.');
                console.error('LLM response structure unexpected:', result);
            }
        } catch (error) {
            setLlmResponse(`Error connecting to LLM: ${error.message}`);
            console.error('LLM API call failed:', error);
        } finally {
            setLlmLoading(false);
        }
    };

    /**
     * Simulates connecting to a Web3 wallet (e.g., MetaMask).
     * In a real application, this would use a Web3 library like ethers.js or web3.js
     * to request account access from the user's browser wallet.
     */
    const connectWallet = async () => {
        setWalletConnected(true);
        // Simulate a wallet address
        setWalletAddress('0x' + Math.random().toString(16).substring(2, 42)); // A random mock address
        console.log('Wallet connected (simulated).');
        // In a real app:
        /*
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
                setWalletConnected(true);
            } catch (error) {
                console.error("User denied account access or other error:", error);
                setWalletAddress('Connection failed');
                setWalletConnected(false);
            }
        } else {
            console.log('MetaMask or other Web3 wallet not detected.');
            setWalletAddress('No Web3 wallet detected');
            setWalletConnected(false);
        }
        */
    };

    /**
     * Simulates interacting with a smart contract.
     * In a real application, this would involve:
     * 1. Getting a contract instance using its ABI and address.
     * 2. Calling a function on that instance.
     * 3. Handling transaction signing (if it's a write function).
     */
    const interactWithContract = async () => {
        if (!walletConnected) {
            setContractInteractionResult('Please connect your wallet first.');
            return;
        }
        if (!contractAddressInput.trim() || !contractFunctionInput.trim()) {
            setContractInteractionResult('Please enter a contract address and function name.');
            return;
        }

        setContractInteractionResult('Interacting with contract (simulated)...');
        console.log(`Simulating call to contract: ${contractAddressInput}, function: ${contractFunctionInput}, args: ${contractArgsInput}`);

        // Simulate a delay for contract interaction
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate a successful interaction result
        setContractInteractionResult(`Simulated interaction successful!
        Contract: ${contractAddressInput}
        Function: ${contractFunctionInput}
        Args: ${contractArgsInput || 'None'}
        Result: Mock data (e.g., '12345 ETH' or 'Transaction Hash: 0xabc...')`);

        // In a real app:
        /*
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // You would need the ABI of the contract here
            const contractABI = [...]; // Your contract's ABI
            const contract = new ethers.Contract(contractAddressInput, contractABI, signer);

            // Example: calling a read function
            const result = await contract[contractFunctionInput](...contractArgsInput.split(',').map(arg => arg.trim()));
            setContractInteractionResult(`Contract call result: ${result.toString()}`);

            // Example: calling a write function (requires transaction)
            // const tx = await contract[contractFunctionInput](...contractArgsInput.split(',').map(arg => arg.trim()));
            // await tx.wait();
            // setContractInteractionResult(`Transaction sent! Hash: ${tx.hash}`);

        } catch (error) {
            setContractInteractionResult(`Contract interaction failed: ${error.message}`);
            console.error('Contract interaction error:', error);
        }
        */
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 font-inter p-4 sm:p-8 flex flex-col items-center">
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://cdn.tailwindcss.com"></script>
            {/* Custom font import */}
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

            <style>
                {`
                body {
                    font-family: 'Inter', sans-serif;
                }
                /* Custom scrollbar for better aesthetics */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: #2d3748; /* Dark gray */
                    border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb {
                    background: #4a5568; /* Medium gray */
                    border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #718096; /* Light gray */
                }
                `}
            </style>

            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8 text-center drop-shadow-lg">
                CryptoVerse
            </h1>

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LLM Interaction Section */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 flex flex-col">
                    <h2 className="text-2xl font-semibold mb-4 text-purple-300">LLM Crypto Assistant</h2>
                    <div className="flex flex-col space-y-4 flex-grow">
                        <textarea
                            className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y min-h-[100px] flex-grow"
                            placeholder="Ask about blockchain, DeFi, NFTs, specific cryptocurrencies, or anything crypto-related..."
                            value={llmPrompt}
                            onChange={(e) => setLlmPrompt(e.target.value)}
                            rows="4"
                        ></textarea>
                        <button
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleLlmSubmit}
                            disabled={llmLoading}
                        >
                            {llmLoading ? 'Generating...' : 'Get Crypto Info'}
                        </button>
                    </div>
                    <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600 overflow-y-auto max-h-64 shadow-inner">
                        <p className="text-gray-300 whitespace-pre-wrap">{llmResponse}</p>
                    </div>
                </div>

                {/* Web3 Interaction Section */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 flex flex-col">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-300">Web3 Interaction (Simulated)</h2>
                    <div className="flex flex-col space-y-4 flex-grow">
                        <button
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                            onClick={connectWallet}
                        >
                            {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
                        </button>
                        <p className="text-gray-300">
                            <span className="font-medium text-cyan-400">Wallet Address:</span> {walletAddress}
                        </p>

                        <div className="border-t border-gray-700 pt-4 mt-4">
                            <h3 className="text-xl font-medium mb-3 text-cyan-200">Simulate Smart Contract Call</h3>
                            <input
                                type="text"
                                className="w-full p-3 mb-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                placeholder="Contract Address (e.g., 0x...)"
                                value={contractAddressInput}
                                onChange={(e) => setContractAddressInput(e.target.value)}
                            />
                            <input
                                type="text"
                                className="w-full p-3 mb-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                placeholder="Function Name (e.g., 'balanceOf')"
                                value={contractFunctionInput}
                                onChange={(e) => setContractFunctionInput(e.target.value)}
                            />
                            <input
                                type="text"
                                className="w-full p-3 mb-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                placeholder="Function Arguments (comma-separated, e.g., '0xabc..., 100')"
                                value={contractArgsInput}
                                onChange={(e) => setContractArgsInput(e.target.value)}
                            />
                            <button
                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={interactWithContract}
                                disabled={!walletConnected}
                            >
                                Call Contract Function (Simulated)
                            </button>
                        </div>
                        <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600 overflow-y-auto max-h-48 shadow-inner">
                            <p className="text-gray-300 whitespace-pre-wrap">{contractInteractionResult}</p>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="mt-12 text-gray-500 text-sm text-center">
                <p>&copy; {new Date().getFullYear()} CryptoVerse. All rights reserved.</p>
                <p>LLM powered by Gemini API. Web3 interactions are simulated for demonstration purposes.</p>
            </footer>
        </div>
    );
}

export default App;
