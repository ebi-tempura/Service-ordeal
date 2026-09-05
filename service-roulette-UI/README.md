# Service Roulette — React

Responsive, browser-based version of Service Roulette. It uses browser storage,
so no backend, account, database, paid domain, or hosting is required.

## Run on your Mac

```bash
npm install
npm run dev -- --host
```

Open the local address shown in Terminal. To play on an iPad, connect it to the
same Wi-Fi network and open the Network address shown by Vite.

## Production check

```bash
npm test
npm run build
```

The game autosaves after every action. Use **Export Save** to download a JSON
backup and **Import Save** to restore one.
