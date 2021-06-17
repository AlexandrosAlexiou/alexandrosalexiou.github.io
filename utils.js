class Timestamp {

    constructor() {
        const date = new Date();
        this.day = date.getDate() >= 10 ? date.getDate() : '0'+date.getDate()
        this.month = date.getMonth()+1 >= 10 ? date.getMonth()+1 : '0'+ (date.getMonth()+1)
        this.year = date.getFullYear();
        this.hours = date.getHours() >= 10 ? date.getHours() : '0'+date.getHours()
        this.minutes = date.getMinutes() >= 10 ? date.getMinutes() : '0'+date.getMinutes()
        this.seconds = date.getSeconds() >= 10 ? date.getSeconds() : '0'+date.getSeconds()
    }
}


function printList(messages) {

    const validURL = (url) => {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(url);
    }

    const validEmail = (email) => {
        const pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return pattern.test(String(email).toLowerCase()); // case insensitive
    }

    const list = document.createElement("ul");
    for (const message of messages) {
        const newItem = document.createElement("li");
        if ( validURL(message) ) {
            const anchor = document.createElement('a');
            anchor.setAttribute('href', message);
            anchor.setAttribute('class', "link");
            anchor.setAttribute('target', "_blank");
            anchor.innerText= message;
            newItem.appendChild(anchor)
        } else if ( validEmail(message) ) {
            const anchor = document.createElement('a');
            anchor.setAttribute('href', `mailto:${message}`);
            anchor.setAttribute('class', "link");
            anchor.innerText= message;
            newItem.appendChild(anchor)
        } else {
            newItem.innerHTML = message;
        }
        list.appendChild(newItem)
    }
    return list;
}
