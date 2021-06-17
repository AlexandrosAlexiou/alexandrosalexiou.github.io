const timestamp = new Timestamp();
jQuery(function($, undefined) {
    $('#terminal').terminal(function(command) {
        switch(command.toLowerCase()) {
            case 'help':
                this.echo(printList(commands));
                break;
            case 'skills':
                this.echo(printList(skills));
                break;
            case 'edu':
                this.echo(printList(edu));
                break;
            case 'social':
                this.echo(printList(social));
                break;
            case 'info':
                this.echo(printList(info));
                break;
            case 'cv':
                this.echo(`<a class="cv" href="cv_alexandros_alexiou.pdf" target="_blank">${cv}</a>`, {raw: true});
                break;
            default:
                this.error('> Command not found. Type help for a list of commands.');
        }
    }, {
        greetings: ``,
        name: 'Personal Website',
        height: window.innerHeight,
        width: window.innerWidth,
        prompt: 'about@alexandrosalexiou: ~ $ ',
    }).echo(
        `<a class="cv" href="cv_alexandros_alexiou.pdf" target="_blank">Developer free version of my CV</a>`,
        {raw: true}
    ).echo(
        `Last login: ${timestamp.day}-${timestamp.month}-${timestamp.year} at ${timestamp.hours}:${timestamp.minutes}:${timestamp.seconds} on ttys000`
    ).echo(
        `Type <span class="help"> help </span> for a list of <span class="help"> commands </span>`,
        {raw: true}
    )
});
