function logPerson () {
console.log(`Person: ${this.name}, ${this.age}, ${this.job}`)
}

const person1 = {
    name: 'mihail',
    age: 22,
    job: 'frontend'
}
const person2 = {
    name: 'elena',
    age: 25,
    job: 'backend'
}

function bind (ctx, method) {
    return function (...args) {
        method.apply(ctx, args)
    }
}

bind(person1, logPerson)()
bind(person2, logPerson)()