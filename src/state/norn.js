import {writable} from "svelte/store"

const wrapActions = (update, actions) => {
    const actionEntries = Object.entries(actions)

    return actionEntries.reduce(
        (converted, [name, func]) => {
            const wrapped = (...args) => update(
                current => func(current, ...args)
            )
            converted[name] = wrapped
            return converted
        },
        {}
    )
}
const norn = (initial, actions) => {
    const {subscribe, update} = writable(initial)
    const wrappedActions = wrapActions(update, actions)

    return {
        ...wrappedActions,
        subscribe
    }
}

export default norn
