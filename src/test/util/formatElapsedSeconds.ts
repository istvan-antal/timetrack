import { formatElapsedSeconds} from '../../util/formatElapsedSeconds';
const { expect } = require('chai');

describe('util/formatElapsedSeconds', () => {
    it('should correctly format large amounts', () => {
        // tslint:disable-next-line:no-magic-numbers
        expect(formatElapsedSeconds(3600)).to.equal('01:00:00');
    });
});