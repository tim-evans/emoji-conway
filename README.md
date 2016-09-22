## Conway

A client / server Conway game of life.

## Running

To run the app, run `npm install` and open `dist/index.html`, which includes the compiled JavaScript and HTML page that runs it.

## Developing

This app is built using Broccoli, a build tool. To run this project on localhost, you'll need to install `broccoli-cli` to get started:

```bash
npm install -g broccoli-cli
```

Once you've installed broccoli, the dependencies of the app need to be installed:

```bash
npm install
```

Once all the dependencies are installed, the app can be run by running `broccoli serve`.

The server is run by executing `npm start`. Once these two pieces are up and running, you can run the app in development mode.

## Building

The frontend portion of the app can be built using the following set of commands:

```bash
rm -rf dist
broccoli build dist
```

This should build the app under the `dist/` directory in the root of the project.
