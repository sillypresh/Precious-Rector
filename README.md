# World Clock

A clean, responsive digital clock that displays the current time across six time zones: New York, London, Lagos, Dubai, Tokyo, and Sydney.

## Run locally

Open `index.html` in a browser, or serve the folder with any static web server:

```bash
npx serve .
```

The app uses the browser's native `Intl.DateTimeFormat` API, so daylight-saving changes and time-zone calculations are handled automatically without an external API.
