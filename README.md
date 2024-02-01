![Simplicit&eacute; Software](https://platform.simplicite.io/logos/logo250-grey.png)
* * *

Node.js&reg; demo
=================

This project is a simple web frontend example using
the [Simplicit&eacute;&reg; node.js&reg; &amp; brower JavaScript API](https://www.npmjs.com/package/simplicite)
to connect to a Simplicit&eacute;&reg; demo backend instance from the **server-side**.

Usage
-----

This project is packaged to deploy on CloudFoundry but can also be used locally.

To run it locally you need to install (or update) the required packages:

```bash
npm install
```

Then you can run the application by:

```bash
npm run start
```

The following environment variables are required to point to the appropriate Simplicit&eacute;&reg; backend instance:

- `SIMPLICITE_URL`: URL of the instance (e.g. `http://<host>:<port>[/<context>]`)
- `SIMPLICITE_USERNAME`: user name
- `SIMPLICITE_PASSWORD`: user password

- the `/` root page displays the demo product catalog
- the `/user` page displays information about the user

Usage on CloudFoundry
---------------------

Adjust the `manifest.yml` to your needs:

- The deployment name, host and domain
- The host, port, root environment variables pointing to the above Simplicit&eacute;&reg; instance

To deploy manually use:

```bash
cf push
```

To undeploy manually use:

```bash
cf delete <deployment name>
```

License
=======

Copyright 2014-2021 Simplicit&eacute; Software

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at:

[](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
