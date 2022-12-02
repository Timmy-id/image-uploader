import createServer from './index';
import database from './utils/db';
import { PORT } from './utils/config';
import logger from './utils/logger';

const app = createServer();

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    database();
});
