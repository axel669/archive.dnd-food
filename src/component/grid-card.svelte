<script>
    import {Card} from "svelte-doric"

    export let area
</script>

<style>
    grid-card {
        display: grid;
    }
</style>

<grid-card style="grid-area: {area};">
    <Card>
        <slot />
    </Card>
</grid-card>
