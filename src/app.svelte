<script>
    import "./$test.js"
    import {
        AppStyle,
        Baseline as baseline,
        TronTheme as theme,

        Button,
        Card,
        Tabs,
        TabLabel,
        TabList,
        TabPanel,
    } from "svelte-doric"
    import {writable} from "svelte/store"

    import update from "@axel669/immutable-update"

    import History from "./screen/history.svelte"
    import Party from "./screen/party.svelte"

    import party from "./state/party.js"

    update.actions.$add = (value = 0, n) => value + n
    update.actions.$sub = (value = 0, n) => value - n
    update.actions.$remove = (array, name) => array.filter(i => i.name !== name)

    const events = [
        {type: "party.add", name: "Emi", food: 1, water: 1},
        {type: "party.add", name: "Brotor", food: 1, water: 1},

        {type: "find.add", name: "Barrel Stock", food: 10, water: 8},
        {type: "consume.add", name: "Barrel Stock", food: 2, water: 2},
    ]

    const eventToAction = {
        "party.add": info => ({
            $push: {
                name: info.name,
                food: info.food,
                water: info.water,
            }
        }),
        "party.remove": info => ({
            $remove: info.name
        }),
        "find.add": info => ({
            [`food.${info.name}.$add`]: info.food ?? 0,
            [`water.${info.name}.$add`]: info.water ?? 0,
        }),
        "find.remove": info => ({
            [`food.${info.name}.$sub`]: info.food ?? 0,
            [`water.${info.name}.$sub`]: info.water ?? 0,
        }),
        "consume.add": info => ({
            [`food.${info.name}.$sub`]: info.food ?? 0,
            [`water.${info.name}.$sub`]: info.water ?? 0,
        }),
        "consume.remove": info => ({
            [`food.${info.name}.$add`]: info.food ?? 0,
            [`water.${info.name}.$add`]: info.water ?? 0,
        }),
    }

    // const party = writable([])
    const storage = writable({
        food: {},
        water: {}
    })
    const eventTarget = {
        "party.add": party,
        "party.remove": party,
        "find.add": storage,
        "find.remove": storage,
        "consume.add": storage,
        "consume.remove": storage,
    }
    const eventInvert = {
        "party.add": "party.remove",
        "find.add": "find.remove",
        "consume.add": "consume.remove",
    }
    // const state = writable({
    //     party: {
    //         consume: {
    //             food: 0,
    //             water: 0,
    //         },
    //         members: [],
    //     },
    //     storage: {
    //         food: {},
    //         water: {}
    //     }
    // })
    const history = writable([])

    const sum = (array) => array.reduce(
        (t, n) => t + n,
        0
    )

    const applyEvent = (event) => {
        const action = eventToAction[event.type](event)

        eventTarget[event.type].update(
            current => update(current, action)
        )
        history.update(
            hist => [...hist, event]
        )
    }

    // $: partyFoodConsume = sum(
    //     $party.map(p => p.food)
    // )
    // $: partyWaterConsume = sum(
    //     $party.map(p => p.water)
    // )
    // $: foodTotal = sum(
    //     Object.values($storage.food)
    // )
    // $: foodTotalDays = Math.floor(foodTotal / partyFoodConsume)
    // $: waterTotal = sum(
    //     Object.values($storage.water)
    // )
    // $: waterTotalDays = Math.floor(waterTotal / partyWaterConsume)

    let nameAdd = ""
    let foodAdd = 0
    let waterAdd = 0
    const addThing = (type) =>
        () => {
            const event = {
                type,
                name: nameAdd,
                food: foodAdd,
                water: waterAdd,
            }
            nameAdd = ""
            foodAdd = 0
            waterAdd = 0
            applyEvent(event)
        }

    let selectedTab = "party"
</script>

<AppStyle {baseline} {theme} />

<Tabs bind:selectedTab>
    <TabList>
        <TabLabel value="party">Party</TabLabel>
        <TabLabel value="food">Food</TabLabel>
        <TabLabel value="history">History</TabLabel>
    </TabList>

    <TabPanel value="party">
        <Party />
    </TabPanel>

    <TabPanel value="food">
        <pre>{JSON.stringify($storage, null, 2)}</pre>
    </TabPanel>

    <TabPanel value="history">
        <History />
    </TabPanel>
</Tabs>

<!-- <div>
    Consumption
    <div>Food: {partyFoodConsume}/day</div>
    <div>Water: {partyWaterConsume}/day</div>
</div> -->
<!-- <div>
    Food: {foodTotal}, ({foodTotalDays} days)
    {#each Object.entries($storage.food) as [name, value]}
        <div>
            {name}: {value} servings
        </div>
    {/each}
</div>
<div>
    Water: {waterTotal}, ({waterTotalDays} days)
    {#each Object.entries($storage.water) as [name, value]}
        <div>
            {name}: {value} servings
        </div>
    {/each}
</div> -->

<!-- <Card>
    <card-content>
        <input type="text" bind:value={nameAdd} />
        <input type="number" bind:value={foodAdd} min={0} />
        <input type="number" bind:value={waterAdd} min={0} />
        <Button on:tap={addThing("party.add")} color="primary">
            Add Party member
        </Button>
    </card-content>
</Card>
<Card>
    <card-content>
        <input type="text" bind:value={nameAdd} />
        <input type="number" bind:value={foodAdd} min={0} />
        <input type="number" bind:value={waterAdd} min={0} />
        <Button on:tap={addThing("find.add")} color="primary">
            Add Foodstuff
        </Button>
    </card-content>
</Card> -->
