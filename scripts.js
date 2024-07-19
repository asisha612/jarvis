document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const voiceButton = document.getElementById('voice-button');

    let conversationMemory = {};

    sendButton.addEventListener('click', sendMessage);
    voiceButton.addEventListener('click', startVoiceRecognition);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            displayMessage(userMessage, 'user');
            userInput.value = '';
            respondToMessage(userMessage);
        }
    }

    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function respondToMessage(message) {
        const response = generateResponse(message);
        setTimeout(() => {
            displayMessage(response, 'jarvis');
            speakResponse(response);
        }, 1000);
    }

    function generateResponse(message) {
        const lowerCaseMessage = message.toLowerCase();
        const keywords = lowerCaseMessage.split(' ');

        const responses = {
            'hello': 'Hello! How can I assist you today?',
            'hi': 'Hi there! How can I help you?',
            'hii': 'Hi there! How can I help you?',
            'hey': 'Hey! How can I assist you today?',
            'how are you': 'I am just a program, but I am functioning as expected.',
            'what is your name': 'I am Jarvis, your personal assistant made by asisha kabi.',
            'what can you do': 'I can assist you with a variety of tasks. Just ask me anything!',
            'who is prime ministers of india': 'Narendra modi!',
            'who created you': 'I was created by asisha kabi.',
            'who am i': 'You are a curious user interacting with me!',
            'what is odisha': 'Odisha, formerly known as Orissa, is a state located in eastern India. It is known for its rich cultural heritage, beautiful temples, and vibrant festivals.',
            'what is the capital of odisha': 'The capital of Odisha is Bhubaneswar.',
            'what are the major cities in odisha': 'Some of the major cities in Odisha include Bhubaneswar, Cuttack, Puri, and Rourkela.',
            'what is the population of odisha': 'The population of Odisha is approximately 41.9 million people.',
            'what are the main industries in odisha': 'Some of the main industries in Odisha include agriculture, mining, manufacturing, and tourism.',
            'what are the famous tourist places in odisha': 'Some of the famous tourist places in Odisha include the Jagannath Temple in Puri, the Konark Sun Temple, the Odisha State Museum, and the Chilika Lake.',
            'what is the best time to visit odisha': 'The best time to visit Odisha is during the winter months from October to February.',
            'who is the current chief minister of odisha': 'The current Chief Minister of Odisha is mohan charan majhi.',
            'who is salman khan': ' the biggest super star of india.',
            'what is the portfolio of naveen patnaik': 'Naveen Patnaik is the Chief Minister of Odisha and holds several portfolios including Home, General Administration, and more.',
            'what is the portfolio of ranendra pratap swain': 'Ranendra Pratap Swain is the Minister of Agriculture, Fisheries, and Animal Resources Development in the Government of Odisha.',
            'ms dhoni': ' most sucessfull cricketr of world.'
        };

        for (let keyword of keywords) {
            if (responses[keyword]) {
                return responses[keyword];
            }
        }

        return handleUnknownQuery(lowerCaseMessage);
    }

    function handleUnknownQuery(message) {
        const commonFallbacks = [
            'I am not sure how to respond to that.',
            'Could you please rephrase that?',
            'I didn’t quite catch that. Can you ask in a different way?',
            'I am still learning. Can you try asking something else?'
        ];

        return commonFallbacks[Math.floor(Math.random() * commonFallbacks.length)];
    }

    function startVoiceRecognition() {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.start();

        recognition.onresult = (event) => {
            const voiceMessage = event.results[0][0].transcript;
            userInput.value = voiceMessage;
            sendMessage();
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
        };

        recognition.onend = () => {
            console.log('Speech recognition service disconnected');
        };
    }

    function speakResponse(response) {
        const utterance = new SpeechSynthesisUtterance(response);
        speechSynthesis.speak(utterance);
    }
});