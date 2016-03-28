export class TimerModel {
    private startTime: Date;
    private onUpdateHandlers: ((secondsDiff: number) => void)[] = [];
    private interval;

    constructor() {
        this.startTime = new Date();
        this.interval = setInterval(() => {
            let currentTime = new Date();
            let secondsDiff = Math.floor((currentTime.getTime() - this.startTime.getTime()) / 1000);
            this.onUpdateHandlers.forEach((fn) => {
                fn(secondsDiff);
            });
        }, 1000);
    }

    onUpdate(fn:(secondsDiff: number) => void) {
        this.onUpdateHandlers.push(fn);
    }

    destroy() {
        clearInterval(this.interval);
        this.onUpdateHandlers = [];
    }
};
