const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');
const typingIndicator = document.getElementById('typing-indicator');

async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;
  addMessage(message, 'user');
  messageInput.value = '';
  typingIndicator.style.display = 'block';
  try {
    const response = await fetch(`https://darkness.ashlynn.workers.dev/chat/?prompt=${encodeURIComponent(message)}&model=gpt-4o-mini`);
    const data = await response.json();
    typingIndicator.style.display = 'none';
    if (data.successful === 'success' && data.response) {
      addMessage(data.response, 'bot');
    } else {
      addMessage('Error: Invalid command.', 'bot');
    }
  } catch (error) {
    console.error(error);
    typingIndicator.style.display = 'none';
    addMessage('Error: Unable to process command.', 'bot');
  }
}

function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', `${sender}-message`);
  
  if (sender === 'bot') {
    const avatar = document.createElement('img');
    avatar.src = 'BotShadow.jpg';
    avatar.alt = 'Bot';
    avatar.classList.add('avatar');
    messageDiv.appendChild(avatar);
  }

  const messageContent = document.createElement('div');
  messageContent.classList.add('message-content');
  messageContent.textContent = text;
  messageDiv.appendChild(messageContent);

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

addMessage('Selamat datang di Website X TKJ 1 - Ai, Apa yang bisa saya bantu hari ini?', 'bot');