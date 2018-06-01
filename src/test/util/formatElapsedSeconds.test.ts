import { formatElapsedSeconds} from '../../util/formatElapsedSeconds';

test('should correctly format large amounts', () => {
    // tslint:disable-next-line:no-magic-numbers
    expect(formatElapsedSeconds(3600)).toBe('01:00:00');

    // tslint:disable-next-line:no-magic-numbers
    expect(formatElapsedSeconds(10)).toBe('00:00:10');
});