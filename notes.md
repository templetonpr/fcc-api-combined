# FCC API Combined

All FreeCodeCamp API projects combined into a single application

https://github.com/templetonpr/fcc-api-combined

start: set DEBUG=fcc-api-combined:* & npm start

### Env Vars

- FMD_SAVE_FILES
  - default is false
  - set to true to save uploaded files to `/uploads`

- FMD_MAX_SIZE
  - default is 1000000 (1MB)
  - maximum file size per upload. Anything above this will not save.

- PORT
  - port

- DATABASE_URL
  - postgreSQL database url

- ON_HEROKU
  - default false
  - runs some additional database code to make Heroku happy
  - set this to true when running on Heroku

- NODE_ENV
  - "development" by default (if not set)
  - set this to "production" when running in production mode.

### To Do

- fmd
  - [x] Add File Metadata code to routes/fileMetadata.js
  - [x] If file stream goes above FMD_MAX_SIZE, upload should fail
  - [x] Get FMD_MAX_SIZE and FMD_SAVE_FILES from app.js instead of loading seperately in routes/fileMetadata.js
  - [ ] Tests
      - [x] GET /fmd
      - [ ] POST /fmd

- ts
  - [x] Add timestamp ms code to routes/timestamp.js
  - [x] Write instructions page for /ts/
  - [x] Tests
      - [x] GET /ts
      - [x] GET /ts/:date

- hp
  - [x] Add header parser code to routes/headParse.js
  - [x] Write instructions page for /hp/
  - [ ] Tests
      - [x] GET /hp
      - [ ] GET /hp/whoami

- urls
  - [ ] Add URL shortener code to routes/urlShortener.js
  - [ ] Write instructions page for /urls/
  - [ ] Tests
      - [x] GET /urls
      - [ ] GET /urls/new
      - [ ] POST /urls/new
      - [ ] GET /urls/:shortCode

- img
  - [ ] Add Image Search code to routes/imgSearch.js
  - [ ] Add fake response to use until real api is finalized
  - [ ] Decide on image search api to use (probably google custom search)
    - https://developers.google.com/custom-search/json-api/v1/overview
    - https://developers.google.com/custom-search/json-api/v1/reference/cse/list
  - [ ] Tests
      - [x] GET /img
      - [ ] GET /latest
      - [ ] GET /img/search/:searchterm
      - [ ] GET /img/search/:searchterm?offset=n

- [ ] Use async
    - https://github.com/caolan/async
- [ ] Integrate debug with entire app (or remove entirely)
    - https://www.npmjs.com/package/debug
- [ ] Improve and standardize error handling
- [ ] Make sure all env vars are correctly namespaced
- [ ] Improve /views/layout.pug
- [ ] Write combined API docs
- [ ] Create combined web app
- [x] Write tests
    - [x] Create backend tests with Mocha
        - https://mochajs.org/
        - https://github.com/chaijs/chai-http
        - http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/
    - [ ] Create frontend testing page /tests (dev only) that tests each componant
- [ ] Create combined db util code (use yargs to specify what to do)

---

## Timestamp

https://www.freecodecamp.com/challenges/timestamp-microservice

### User Stories

- I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016).
- If it does, it returns both the Unix timestamp and the natural language form of that date.
- If it does not contain a date or Unix timestamp, it returns null for those properties.

### API

- GET /ts/
  - responds with instructions

- GET /ts/:datetime
  - (where :datetime is either a unix timestamp or a date in `MMMM, D, YYYY` format)
  - responds with `{"unix": unix timestamp,"natural": MMMM D, YYYY}` for a valid date or
    `{"unix":null,"natural":null}` for an invalid date

---

## Header Parser

https://www.freecodecamp.com/challenges/request-header-parser-microservice

### User Stories
- I can get the IP address, language and operating system for my browser.

### API

- GET /hp/
  - responds with instructions

- GET /hp/whoami
  - responds with
`{
  "ipaddress": your public ip address,
  "language": your language,
  "software": your operating system
}`

---

## URL Shortener

https://www.freecodecamp.com/challenges/url-shortener-microservice

### User Stories

- I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
- If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
- When I visit that shortened URL, it will redirect me to my original link.

### API

- GET /urls/
  - responds with instructions

- GET /urls/new
  - form to post new url

- GET /urls/:shortCode
  - if :shortCode is in db, redirect to the corresponding url
  - else return `{"error": "URL doesn't exist."}`

- POST /urls/new
  - body must contain "original_url": url
  - if url is in database, return `{"original_url": original url, "short_url": shortened url}`
  - if url is new, insert it, then return `{"original_url": original url, "short_url": shortened url}`
  - if url is invalid, return `{"error": error message}`

---

## Image Search Abstraction Layer

https://www.freecodecamp.com/challenges/image-search-abstraction-layer

### User Stories

- I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
- I can paginate through the responses by adding a ?offset=2 parameter to the URL.
- I can get a list of the most recently submitted search strings.

### API

- GET /img/
  - responds with instructions page

- GET /img/latest
  - return list of last ten searches in the format: `{"term": search term, "when": timestamp}`

- GET /img/search/:searchterm [ ?offset=n ]
  - return list of ten image data objects in the format: 
`{
    "url": image url,
    "alt": image alt text,
    "thumbnail": thumbnail url,
    "context": original page url
}`
  - optionally offset by the offset parameter

---

## File Metadata

https://www.freecodecamp.com/challenges/file-metadata-microservice

### User Stories

- I can submit a FormData object that includes a file upload.
- When I submit something, I will receive the file size in bytes within the JSON response

### API

- GET /fmd/
  - responds with instructions page

- POST /fmd/
  - accepts a file
  - responds with an error json if there was a problem
  - otherwise, responds with `{"name": file name, "size": file size in bytes}`

---
