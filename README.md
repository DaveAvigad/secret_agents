# secret_agents

Private RestAPI

### Prerequisites


```
Node.js v10
```

### Installing

Install dependancies:

```
npm -i
```

create `.env` file or set environment variables:  

```
NODE_ENV=development
TZ=UTC

DB_USERNAME= #
DB_PASSWORD= #
DB_NAME= #
DB_HOSTNAME= #
DB_PORT= #
DB_LOGS=${<Boolean>}
DB_OPTIONS_USEUTC=${<Boolean>}
DB_OPTIONS_SUPPORTBIGNUMBERS=${<Boolean>}
DB_OPTIONS_DATESTRINGS=${<Boolean>}
DB_OPTIONS_MULTIPLESTATEMENTS=${<Boolean>}
DB_OPTIONS_MAXPOOLCONNECTIONS=${<Number>}
DB_OPTIONS_TIMEZONE=${timezone<String>}
GKEY=${your_google_api_key<String>}
```
Run the server:
```
npm run dev
```
Open browser at `localhost:3000`

## Example Client
[codepen.io](https://codepen.io/davidgeosurf/pen/Ooppbw?editors=1111)

## Running the tests

`npm run test`


## Built With

* [node.js](#)
* [google/maps](#)
* [boom](#)
* [express](#)
* [express-validator](#)
* [mysql2](#)
* [sequelize](#)
* [validator](#)
* [mocha/chai](#)
* [supertest](#)
* [babel-cli](#)


## Authors

* **DavidAvigad** - *FullStack Engineer* - [BISCIENCE](#)

## License

This project is licensed under the Apache License - see the [LICENSE.md](LICENSE.md) file for details
