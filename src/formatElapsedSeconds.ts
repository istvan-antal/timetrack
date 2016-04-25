export function formatElapsedSeconds(secondsElapsed: number):string {
    let remainder = secondsElapsed;
    const hours = Math.floor(remainder / 3600);
    remainder = remainder % 3600;
    const minutes = Math.floor(remainder / 60);
    const seconds = remainder % 60;
    return zeroFill(hours) + ':' + zeroFill(minutes) + ':' + zeroFill(seconds);
}

function zeroFill(number: number): string {
    if (number < 10) {
        return '0' + number;
    }
    return '' + number;
}