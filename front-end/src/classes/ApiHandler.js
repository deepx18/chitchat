export default class ApiHandler {
    // constructor(parameters) {
    // }

    static async getMessages (room_id, setter) {
        await fetch(`http://localhost:8000/api/messages?room_id=${room_id}`, {
            mode: 'cors', // Default, but explicit
        })
        .then((res) => res.json())
        .then( (data) => setter(data) )
    }

    static async postMessage (data) {
        await fetch(`http://localhost:8000/api/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            mode: 'cors', // Default, but explicit
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then( (data) => console.log(data) )
    }

    static async getUser (user_id) {
        let user;
        await fetch(`http://localhost:8000/api/users/${user_id}`, {
            mode: 'cors', // Default, but explicit
        })
        .then((res) => res.json())
        .then( (data) => user = data )

        return user;
    }
    
    static async getChats (user_id, setter) {
        await fetch(`http://localhost:8000/api/chats?user_id=${user_id}`, {
            mode: 'cors', // Default, but explicit
        })
        .then((res) => res.json())
        .then( (data) => setter(data) )
    }

}