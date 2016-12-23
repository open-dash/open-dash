# OpenDash

A realtime dashboard to view/control all of your home automation toys.

[![CircleCI](https://circleci.com/gh/open-dash/open-dash.svg?style=svg)](https://circleci.com/gh/open-dash/open-dash)

## Deploy

OpenDash can be deployed with [Docker](https://docker.com) and [Docker Compose](https://docs.docker.com/compose/overview/). See [Docker install docs](https://docs.docker.com/engine/installation/) for your platform.

To launch an official prebuilt image of OpenDash, create a docker-compose.yml and add the following:

```yaml
opendash:
  image: opendash/opendash:latest
  links:
    - mongo
  ports:
    - 80:3000
  environment:
    MONGO_URL: mongodb://mongo:27017/opendash

mongo:
  image: mongo:latest
  command: mongod --storageEngine=wiredTiger
```

Now you can start the app and database by running the following command from the same directory as your `docker-compose.yml`.

```sh
docker-compose up -d
```

...and the app should be available at http://localhost

## Development

Before cloning this project to work with it locally or build from source, make sure you have installed all of the dependencies for your operating system. For more info, see the [install docs](docs/installation.md).

Once you've installed the dependencies for your OS, you're ready to download, build, and run OpenDash. Note that the instructions below are specifically for local development/testing. Docker should be used for production deployments. More production deployment details for various platforms coming soon.

### Install

```sh
git clone https://github.com/open-dash/open-dash.git

cd open-dash

meteor npm install
```

### Configure

**Default Settings**

Client side user creation is disabled, so you will need to set a default user (or users) in a `settings.json` file.  Note that `admin` is currently the only role with access to everything, so be sure to set that for your user. You can also import any application settings the same way.  If you run the app with a `settings.json` like below, it will create the default users (only if none exist) and the remaining settings will be inserted into the Settings collection (if the given field is not already defined in the database).

Once you've imported settings, you can run the app without your `settings.json` because your settings will now be saved in the database and can be viewed/updated at the `/settings` route.

**Example settings.json**

The latest example settings.json will always be available in the root of the app and will contain all currently supported values. It is recommended that you copy that into your own file and make sure to never commit it to source control (since it contains things like default passwords and API keys)

I recommend creating a settings file for development and one for production so you use different API keys in each environment.

```sh
# create a copy to modify from the provided example
cp settings.json settings.dev.json
```

Now open your new `settings.dev.json` file and add any desired users or settings.

```js
// settings.dev.json

{
  // Add as many users to the array as you'd like.
  // Note that they will only be created if there are 0 users in the database.
  "defaultUsers": [
    {
      "email": "admin1@example.com",
      "username": "admin",
      "password": "admin123",
      "roles": ["admin"]
    },
    {
      "email": "admin2@example.com",
      "username": "admin2",
      "password": "admin456",
      "roles": ["admin"]
    }
  ],

  "app" : {
    "title" : "OpenDash",
    "adminEmail" : ""
  },

  "mail" : {
    "smtpUrl" : ""
  },

  "smartthings" : {
    "clientId" : "",
    "clientSecret" : ""
  },

  "kadira" : {
    "appId" : "",
    "appSecret" : ""
  },

  "segment" : {
    "writeKey" : "  "
  }
}
```

### Run

```sh
# start the app and specify your settings file
meteor --settings settings.dev.json

# running on http://localhost:3000
```

You new user(s) will be created and your settings saved in the database. Any subsequent app starts can simply be:

```sh
# start the app
meteor

# running on http://localhost:3000
```
