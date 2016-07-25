import { formatElapsedSeconds} from '../../src/util/formatElapsedSeconds';
const { expect } = require('chai');

describe('util/formatElapsedSeconds', () => {
    it('should correctly format large amounts', () => {
        expect(formatElapsedSeconds(3600)).to.equal('01:00:00');
    });
});