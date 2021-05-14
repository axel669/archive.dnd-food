<script>
    import {Card} from "svelte-doric"

    import GridCard from "../component/grid-card.svelte"

    import party from "../state/party.js"

    const sum = (array, map) => array.reduce(
        (t, n) => t + map(n),
        0
    )

    $: size = $party.members.length
    $: totalFood = sum(
        $party.members,
        p => p.food
    )
    $: totalWater = sum(
        $party.members,
        p => p.water
    )
</script>

<style>
    screen-layout {
        display: grid;
        gap: 4px;
        padding: 4px;
        grid-template-columns: 1fr 1fr;
        align-items: start;
        grid-template-areas:
            "size list"
            "consume list"
            ". list"
        ;
    }

    fieldset {
        border: 1px solid var(--primary);
        border-radius: 4px;
        margin-left: 0px;
        margin-right: 0px;
        margin-bottom: 0px;
    }
    fieldset > legend {
        color: var(--text-normal);
    }
</style>

<screen-layout>
    <fieldset style="grid-area: size;">
        <legend>Party Info</legend>
        <div>Size: {size}</div>
    </fieldset>

    <fieldset style="grid-area: consume;">
        <legend>Resources/day</legend>
        <div>Food: {totalFood}</div>
        <div>Water: {totalWater}</div>
    </fieldset>

    <fieldset style="grid-area: list;">
        <legend>Members</legend>
        {#each $party.members as char}
            <div>{char.name}</div>
        {/each}
    </fieldset>

    <!-- <GridCard area="size">
        <card-content>
            <div>Party Size: {size}</div>
        </card-content>
    </GridCard> -->

    <!-- <GridCard area="consume">
        <card-content>
            <div>Food: {totalFood}</div>
            <div>Water: {totalWater}</div>
        </card-content>
    </GridCard> -->

    <!-- <GridCard area="list">
        <card-content>
            {#each $party.members as char}
                <div>{char.name}</div>
            {/each}
        </card-content>
    </GridCard> -->
</screen-layout>
