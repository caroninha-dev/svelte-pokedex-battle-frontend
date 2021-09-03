import { writable } from 'svelte/store';

const messageStore = writable('');

const socket = new WebSocket('ws://d9a5-2804-14d-baa7-9cb8-f014-e59b-c77c-8891.ngrok.io');

// Connection opened
socket.addEventListener('open', function (event) {
    console.log("It's open");
});

// Listen for messages
socket.addEventListener('message', function (event) {
    messageStore.set(event.data);
});

const sendMessage = (message) => {
	if (socket.readyState <= 1) {
		socket.send(message);
	}
}


export default {
	subscribe: messageStore.subscribe,
	sendMessage
}

