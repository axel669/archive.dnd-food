import norn from "./norn.js"
import uuid from "./uuid.js"

const party = norn(
    {
        members: [],
        history: [],
    },
    {
        add: (current, data) => {
            const {members, history} = current
            const id = uuid()
            const evt = {
                id,
                data,
                type: "party.add"
            }
            return {
                members: [...members, data],
                history: [evt, ...history],
            }
        }
    }
)

export default party
