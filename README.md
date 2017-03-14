# Loopback REST API Seed for Predix

This project is a simple seed project for quickly developing REST APIs based on the [Loopback framework](https://loopback.io) for Node.js.

## Getting Started

1. Create a Predix account at [Predix.io](http://predix.io).
2. Download the [Cloud Foundry CLI tools](https://github.com/cloudfoundry/cli#downloads)
3. `cf login` with your Predix.io account
4. Clone this project and cd into the directory
5. `npm install`
5. `cf push {your-app-name-here} --no-start`  You don't have to have the app created yet, the first push will also create the app.  Note however, that the app name must be unique across all of Predix.
6. `cf create-service postgres shared-nr {your-database-service-name-here}` As with app names, your database service name must all be unique across all of Predix.
7. `cf bind-service {your-app-name-here} {your-database-service-name-here}`
7. `cf set-env {your-app-name-here} NODE_ENV predix` This is how you set an environment variable in your instances
8. `cf start {your-app-name-here}`
9. You should see output like the following:

```
requested state: started
instances: 1/1
usage: 256M x 1 instances
urls: lb-api.run.aws-usw02-pr.ice.predix.io
last uploaded: Thu Feb 23 16:54:26 UTC 2017
stack: cflinuxfs2
buildpack: node.js 1.5.19
```

Visit the https url as listed in `urls`, eg. https://lb-api.run.aws-usw02-pr.ice.predix.io

## Working with Loopback

### Creating Models

Download and install the loopback-cli: `npm install -g loopback-cli`.
Loopback will walk you through the process of creating a model in its generator by running `lb model`

After you've added a model, remember to `git add *`, since several files will be created in that process.
Then `cf push {your-app-name-here}` again to push your repo up to Predix.

Loopback will auto-update your database with any changes required to tables due to new or updated models, including `ALTER` and `CREATE` statements.
No data will be lost in this process.  You still may want more control over this process, and you can simply remove the `server/boot/db-auto-update.js` file to disable this feature.


### Exploring the API

Loopback automatically generates a swagger-compliant file for you, and exposes the swagger api explorer at the `/explorer` endpoint.

### Generating SDKs

Loopback can automatically generate an Angular2 SDK using the [Loopback SDK Generator](https://github.com/mean-expert-official/loopback-sdk-builder) project.
It is already included as a dependency in this project.

Just `npm run sdk:angular2` and the resulting SDK will be output into the client folder in your project.

### CI/CD and Environment Files

Loopback json config files can all be prefexed with an environment name, eg: datasources.json can have a corresponding datasources.local.json and datasources.prod.json.  If the NODE_ENV matches the second dot portion of the filename, it loads that version of the file.

Additionally, all json config files are overriden by .js versions of the same file name.  So datasources.json is overriden by datasources.js.  This is useful if you need envionrment-variables included in your configs via `process.ENV`.  The seed project uses this for setting the postgres connection and listening port, for instance.
