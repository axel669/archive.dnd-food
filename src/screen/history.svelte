<script>
    import {Card} from "svelte-doric"

    import history, {_history} from "../state/history.js"

    window.wat = history
</script>

{#each $history as event}
    <Card>
        <card-content>
            <div>Type: {event.type}</div>
            <div>{event.id}</div>
            <pre>{JSON.stringify(event.data, null, 2)}</pre>
        </card-content>
    </Card>
{/each}
