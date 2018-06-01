import formatDuration from '../formatDuration';

// tslint:disable:no-magic-numbers

test('formatDuration', () => {
    expect(formatDuration(60)).toBe('1 minute');
    expect(formatDuration(61)).toBe('1 minute 1 second');
    expect(formatDuration(120)).toBe('2 minutes');
});