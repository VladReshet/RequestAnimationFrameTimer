var Timer = (function(){
    var listeners = {
        interval : [],
        timeout : []
    };

    return {
        setInterval: function (callback, time) {
            return listeners.interval.push({
                last: new Date().getTime(),

                handler: function (current) {
                    var dif = current - time;

                    if (dif >= this.last) {
                        this.last = current;

                        callback();
                    }
                }
            }) - 1;
        },

        clearInterval: function (id) {
            listeners.interval[id] = null;
        },

        setTimeout: function (callback, time) {
            listeners.timeout.push({
                last: new Date().getTime(),

                handler: function (current, number, where) {
                    var dif = current - time;

                    if (dif >= this.last) {
                        callback();

                        where[number] = null;
                    }
                }
            });
        },

        frame: function () {
            var current = new Date().getTime();

            listeners.interval.map(function (i) {
                i && i.handler(current);
            });

            listeners.timeout.map(function (i, e, a) {
                i && i.handler(current, e, a);
            });

            requestAnimationFrame(this.frame.bind(this));
        },

        init: function () {
            this.frame();
        }
    }
})();
