jQuery(function ($, undefined) {
    const timestamp = new Timestamp();
    var scanlines = $(".scanlines");
    var tv = $(".tv");

    function exit() {
        $(".tv").addClass("collapse");
        term.disable();
    }

    var term = $("#term").terminal(
        function (command, term) {
            var cmd = $.terminal.parse_command(command).name.toLowerCase();
            if (cmd === "help") {
                this.echo(printList(commands));
            } else if (cmd === "about") {
                this.echo(about, { raw: true });
            } else if (cmd === "skills") {
                this.echo(printList(skills));
            } else if (cmd === "edu") {
                this.echo(printList(edu));
            } else if (cmd === "social") {
                this.echo(printList(social));
            } else if (cmd === "info") {
                this.echo(printList(info));
            } else if (cmd === "exit") {
                exit();
            } else if (cmd === "cls") {
                term.clear();
            } else if (cmd === "ls") {
                this.echo(
                    `<a class="cv" style="display:inline-block; padding-top: 0.5rem; padding-bottom: 0.5rem" href="cv_alexandros_alexiou.pdf" target="_blank">${cv}</a>`,
                    { raw: true }
                );
            } else if (cmd === "") {
                this.echo("", { raw: true });
            } else {
                try {
                    var result = window.eval(command);
                    if (result && result instanceof $.fn.init) {
                        term.echo("<#jQuery>");
                    } else if (result && typeof result === "object") {
                        tree(result);
                    } else if (result !== undefined) {
                        term.echo(new String(result));
                    }
                } catch (e) {
                    term.error(new String(e));
                }
            }
        },
        {
            name: "Personal Website",
            onResize: set_size,
            exit: false,
            greetings: "",
            onInit: function () {
                set_size();
                this.echo(
                    `<a class="cv" href="cv_alexandros_alexiou.pdf" target="_blank">Developer free version of my CV</a>`,
                    { raw: true }
                );
                this.echo(
                    `Last login: ${timestamp.day}-${timestamp.month}-${timestamp.year} at ${timestamp.hours}:${timestamp.minutes}:${timestamp.seconds} on ttys000`
                );
                this.echo(
                    `Type [[b;#33FF00;] help ] for a list of [[b;#33FF00;] commands]. Type [[b;#f22;]exit] for shutdown.`
                );
            },
            onClear: function () {
                console.log(this.find("video").length);
                this.find("video").map(function () {
                    console.log(this.src);
                    return this.src;
                });
            },
            prompt: "[[b;#33FF00;]about@alexandrosalexiou: ~ $ ]",
        }
    );

    if (!term.enabled()) {
        term.find(".cursor").addClass("blink");
    }

    function set_size() {
        // for window height of 170 it should be 2s
        var height = $(window).height();
        var width = $(window).width();
        var time = (height * 2) / 170;
        scanlines[0].style.setProperty("--time", time);
        tv[0].style.setProperty("--width", width);
        tv[0].style.setProperty("--height", height);
    }

    function tree(obj) {
        term.echo(treeify.asTree(obj, true, true));
    }
});
