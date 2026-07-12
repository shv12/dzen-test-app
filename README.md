The application consists of two servers - Next.js part (runs on 3000 port) and NodeJS server (serves Websocket connection. Runs on 3001 port).

1. Set up system

Install Git, Node and pnpm.

<pre>
sudo apt-get install git node
npm install -g pnpm
</pre>

2. Clone Git repo. Create next-client/.env.

3. Create MySQL or TiDB cluster. Fill in .env with connection string data.

<pre>
TIDB_HOST=gateway01.eu-central-1.prod.aws.tidbcloud.com
TIDB_USER=
TIDB_PASSWORD=
TIDB_NAME=dzen_test_app_db
</pre>

Change TIDB_HOST to value from connection string. Port value is 4000.
For run Node server-socket on different host - add NEXT_PUBLIC_SOCKET_URL.

4. Install node_modules

<pre>
cd next-client
pnpm install
cd ../socket-server
pnpm install
cd ..
pnpm install
</pre>

5. Run dev servers - <code>pnpm dev</code>

6. Init DB. In browser go to <code>http://localhost:3000/seed/</code>. Wait for init DB script finish.

7. Go to <code>http://localhost:3000/</code> for view project.
