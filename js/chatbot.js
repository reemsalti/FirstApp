const API_URL = '/api/chat';

async function sendMessageToAPI(message) {
  const typingIndicator = document.getElementById('typing-indicator');
  typingIndicator.classList.remove('hidden');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userMessage: message }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('API error:', error);
      throw new Error('Failed to send message to the API');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error in sendMessageToAPI:', error);
    throw error;
  } finally {
    typingIndicator.classList.add('hidden');
  }
}

function createMessageElement(content, sender) {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${sender}-bubble`; 

  const labelElement = document.createElement('div');
  labelElement.className = 'message-label';
  labelElement.innerText = sender === 'user' ? 'Me:' : 'FitAssistant:';

  const contentElement = document.createElement('span');
  contentElement.className = 'message-content';
  
  const caretElement = document.createElement('span');
  caretElement.className = 'caret';
  caretElement.innerText = "|";  // or whatever you want your caret to be
  
  messageElement.appendChild(labelElement);
  messageElement.appendChild(contentElement);

  if (sender === 'assistant') {
    contentElement.style.visibility = 'hidden';
    let i = 0;
    const type = () => {
      if (i < content.length) {
        contentElement.style.visibility = 'visible';
        contentElement.innerText = content.substr(0, i+1);
        i++;
        setTimeout(type, 50);
      } else {
        messageElement.removeChild(caretElement);
      }
    }
    setTimeout(type, 700); // Wait 500ms before typing
    messageElement.appendChild(caretElement);
  } else {
    contentElement.innerText = content;
  }
  
  return messageElement;
}


function addMessageToChat(messageElement) {
  const chatContainer = document.getElementById('chat-container');
  chatContainer.appendChild(messageElement);
  
  // Save the current chat history in local storage
  localStorage.setItem('chatHistory', chatContainer.innerHTML);
}

function saveCurrentConversation() {
  const chatContainer = document.getElementById('chat-container');
  const conversation = chatContainer.innerHTML;

  const conversationElement = document.createElement('div');
  conversationElement.classList.add('conversation');
  conversationElement.innerHTML = conversation;
  

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', () => {
    conversationElement.remove();
  });

  conversationElement.appendChild(deleteButton);

 conversationList.push(conversation);
  localStorage.setItem('conversationList', JSON.stringify(conversationList));

  chatHistory.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const conversationList = JSON.parse(localStorage.getItem('conversationList')) || [];
  const conversationListElement = document.getElementById('conversation-list');

  const chatContainer = document.getElementById('chat-container');
  chatContainer.innerHTML = localStorage.getItem('chatHistory') || '';
  
  document.getElementById('start-new-conversation').addEventListener('click', () => {
    saveCurrentConversation();
  });

  const userInputForm = document.getElementById('user-input-form');

  userInputForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const inputField = document.getElementById('user-input');
    const chatContainer = document.getElementById('chat-container');

    const userMessage = inputField.value.trim();
    if (!userMessage) return;

    inputField.value = '';

    const userMessageElement = createMessageElement(userMessage, 'user');
    chatContainer.appendChild(userMessageElement);
    
    const assistantMessage = await sendMessageToAPI(userMessage);

    const assistantMessageElement = createMessageElement(assistantMessage, 'assistant');
    chatContainer.appendChild(assistantMessageElement);
  });
});
