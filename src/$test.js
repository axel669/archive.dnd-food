import pubsub from "pubsub-js"

import history from "./state/history.js"
import party from "./state/party.js"

window.test ={}

test.history = {
    addEvents: () => {
        history.push({type: "test.add", name: "First"})
        history.push({type: "test.add", name: "second"})
    },
    new: () => {
        pubsub.publish("food.add", {name: "wat"})
        pubsub.publish("consume.add", {name: "wat 2"})
    }
}

test.party = {
    add: () => {
        party.add({name: "Test", food: 1, water: 1})
        party.add({name: "Test 2", food: 1, water: 1})
    }
}
