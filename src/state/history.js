import {derived} from "svelte/store"
import party from "./party.js"

const history = derived(
    [party],
    (sources) => {
        const [party] = sources
        return party.history
    }
)

export default history
