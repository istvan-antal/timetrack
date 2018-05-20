#!/bin/bash
printf '#!/bin/bash\nnpm test\n' > .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit