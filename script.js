const timestamp = new Timestamp();
jQuery(function($, undefined) {
    $('#terminal').terminal(function(command) {
        let s = command.toLowerCase();
        if (s === 'help') {
            this.echo(printList(commands));
        } else if (s === 'about') {
            this.echo(about, {raw: true});
        } else if (s === 'skills') {
            this.echo(printList(skills));
        } else if (s === 'edu') {
            this.echo(printList(edu));
        } else if (s === 'social') {
            this.echo(printList(social));
        } else if (s === 'info') {
            this.echo(printList(info));
        } else if (s === 'ls') {
            this.echo(`<a class="cv" style="display:inline-block; padding-top: 0.5rem; padding-bottom: 0.5rem" href="cv_alexandros_alexiou.pdf" target="_blank">${cv}</a>`, {raw: true});
        } else if (s === '') {
            this.echo('', {raw: true});
        } else {
            this.echo('<span class="error"> > Command not found. Type help for a list of commands. </span>', {raw: true});
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
