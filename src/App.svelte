<script>
	import { onMount } from 'svelte';
	import store from './store.js';

	let id = new Date().getTime();
	let session = {
		started: false,
		players: [],
		winner: undefined,
	}

	onMount(() => {
		store.subscribe(currentMessage => {
			try {
				session = JSON.parse(currentMessage);	
			} catch (error) {
				console.log(error);
			}
		})
	})

	function startSession() {
		store.sendMessage(JSON.stringify({ ...session, started: true }));
	}

	function joinSlot() {
		store.sendMessage(JSON.stringify({ ...session, players: [ ...session.players, { id }] }));
	}

	function fight() {
		store.sendMessage(JSON.stringify({ ...session, winner: session.players[Math.floor(Math.random() * 2)].id }));
	}
</script>

{#if !session.started}
	<button on:click={startSession}>Criar partida</button>
{/if }

{#if session.players.length < 2 && session.started && session.players.find(player => player.id === id) === undefined}
	<button on:click={joinSlot}>Entrar slot {session.players.length + 1}</button>
{/if }

{#if session.players.length === 2}
	<button on:click={fight}>Começar partida</button>
{/if}

{#if session.winner && session.winner === id}
	<h1>Você venceu!</h1>
{/if}

{#if session.winner && session.winner !== id}
	<h1>Você perdeu!</h1>
{/if}

{#if !session.winner && session.players.length > 0}
	<h2>Jogadores na sala:</h2>
	<ul>
	{#each session.players as player, i}
		<li>{player.id}</li>
	{/each}
	</ul>
{/if}

