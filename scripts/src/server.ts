/**
 * Cloud Run HTTP server for running scripts
 *
 * This server accepts POST requests to trigger the resume sync job.
 * Designed to be deployed as a private Cloud Run service.
 */

import {createServer, IncomingMessage, ServerResponse} from 'http';
import {syncGoogleDocResume} from './syncGoogleDocResume';

const PORT = process.env.PORT || 8080;

async function handleRequest(req: IncomingMessage, res: ServerResponse) {
  const path = req.url || '/';

  if (req.method === 'GET' && path === '/health') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({status: 'ok'}));
    return;
  }

  if (req.method === 'POST' && path === '/sync-resume') {
    console.log('📋 Received sync-resume request');

    try {
      await syncGoogleDocResume();
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(
        JSON.stringify({
          success: true,
          message: 'Resume synced successfully',
        }),
      );
    } catch (error) {
      console.error('❌ Error syncing resume:', error);
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end(
        JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }),
      );
    }
    return;
  }

  // 404 for other paths
  res.writeHead(404, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({error: 'Not found'}));
}

const server = createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  console.log('📡 Health check: GET /health');
  console.log('🔄 Sync endpoint: POST /sync-resume');
});
