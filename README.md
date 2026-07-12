The project is the application for manage Orders and Products.
User can create and delete Orders and fill selected Order with Products. Products also can be deleted from Order.
A Product consists of required fields: - Product type (can be selected or typed new); - Product name - Guarantee from (date) - Guarantee until (date) - Price in UAH
Also it contains optional field: - Price in USD

The application interface supports two languages - English and Russian and user can switch between them in runtime.

The application consists of two servers - Next.js part (runs on 3000 port) and NodeJS server (serves Websocket connection. Runs on 3001 port).

===To run system via Docker===

1. Set up system

Install Git and Docker

<pre>
sudo apt install git
snap install docker
</pre>

2. Clone the project repo and create .env files in root directory and in next-client and socket-server directories.

<pre>
git clone https://github.com/shv12/dzen-test-app.git
cd dzen-test-app
echo 'MYSQL_ROOT_PASSWORD=rootpassword' >> .env
echo 'TIDB_HOST=database' >> next-client/.env
echo 'TIDB_USER=root' >> next-client/.env
echo 'TIDB_PASSWORD=rootpassword' >> next-client/.env
echo 'TIDB_NAME=dzen_test_app_db' >> next-client/.env
echo 'NEXT_PUBLIC_SOCKET_URL=https://localhost:3001/' >> next-client/.env
echo 'PORT=3001' >> socket-server/.env
</pre>

4. First build and run Docker container.

<pre>
sudo docker compose up --build
</pre>

5. Visit project at http://localhost:3000/

===To run system without Docker===

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

6. Init DB. In browser go to <code>http://localhost:3000/en/seed/</code>. Wait for init DB script finish.

7. Go to <code>http://localhost:3000/</code> for view project.
