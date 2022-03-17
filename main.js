//Listener

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("messageForm").addEventListener('submit', saveMessage);
    fetchMessages();
});

function saveMessage(event) { 
    event.preventDefault();

    var messageForm = document.getElementById("messageForm");
    var formData = new FormData(messageForm);
    
    var message = {
        user: formData.get("username"), 
        message: formData.get("message"),
    }
    console.log(message);

    if(localStorage.getItem("messages") == null) { 
        var messages = [];
        messages.push(message);
        localStorage.setItem("messages", JSON.stringify(messages));
    } else { 
        var messages = JSON.parse(localStorage.getItem("messages"));
        messages.push(message);
        localStorage.setItem("messages", JSON.stringify(messages));
    }

    messageForm.reset();

    fetchMessages();
}

function fetchMessages() { 
    var messages = JSON.parse(localStorage.getItem("messages"));
    var messageList = document.getElementById("messages");

    messageList.innerHTML = '';

    for(let i = 0; i < messages.length; i++) {
        var username = messages[i].user;
        var message = messages[i].message;

        messageList.innerHTML += messageFactory(username, message);
    }
}

function messageFactory(username, message) {
    return `<div class="message card">
        <h7>User: ${username}</h7>
        <span>${message}</span>
    </div>`
}