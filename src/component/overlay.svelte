<script>
    import {Portal} from "svelte-doric"

    import GridCard from "./grid-card.svelte"
</script>

<style>
    overlay-window {
        position: fixed;
    }
</style>

<Portal>
    <overlay-window>
        <slot />
    </overlay-window>
</Portal>
