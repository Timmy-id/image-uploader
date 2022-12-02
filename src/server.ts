import createServer from './index';
import { PORT } from './utils/config';
import logger from './utils/logger';

const app = createServer();

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
