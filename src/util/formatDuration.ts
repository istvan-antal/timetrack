enum Duration {
    Second = 1,
    Minute = 60,
    Hour = 3600,
    Day = 86400,
    Week = 604800,
}

const units = {
    [Duration.Second]: ['second', 'seconds'],
    [Duration.Minute]: ['minute', 'minutes'],
    [Duration.Hour]: ['hour', 'hours'],
    [Duration.Day]: ['day', 'days'],
    [Duration.Week]: ['week', 'weeks'],
};

// tslint:disable-next-line:no-any
const ordersOfMagnitude: Duration[] = Object.keys(units).map(item => +item).sort((a, b) => b - a) as any;

export default (duration: number) => {
    let result = '';
    let i = 0;
    let remainder = duration;

    while (i < ordersOfMagnitude.length) {
        const orderOfMagnitude = ordersOfMagnitude[i];
        if (remainder / orderOfMagnitude >= 1) {
            const value = Math.floor(remainder / orderOfMagnitude);
            result = `${result} ${value} ${units[orderOfMagnitude][value > 1 ? 1 : 0]}`.trim();
            remainder %= orderOfMagnitude;
        }
        i += 1;
    }
    return result;
};