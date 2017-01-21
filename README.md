# Giphy Link Preview for Mixmax

This is an open source Mixmax Link Resolver. See <http://developer.mixmax.com/docs/overview-link-resolvers> for more information about how to use this example code in Mixmax.

## Running locally

1. Install using `npm install`
2. Run using `npm start`

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl https://localhost:9146/resolver?url=http%3A%2F%2Fgiphy.com%2Fgifs%2Fexcited-the-office-yes-t3Mzdx0SA3Eis --insecure
```

## Why do we run it in https locally?

Mixmax slash command APIs are required to be served over https. This is because they are queried directly from the Mixmax client in the browser (using AJAX) that's running on an HTTPS domain. Browsers forbid AJAX requests from https domains to call http APIs, for security. So we must run an https server with a locally-signed certificate.