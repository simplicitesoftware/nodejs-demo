![Simplicit&eacute; Software](http://www.simplicitesoftware.com/logos/logo250.png)
---

Web frontend demo
=================

This project is a web frontend demo using the Node.js API to connect
to a Simplicit&eacute;&reg; backend instance.

Usage
-----

This project is packaged to deploy on CloudFoundry but can also be used locally.

To run it clocally you need to install (or upgrade) dependencies:

	npm install q express jade simplicite

Then you can run the application by:

	node app.js

The base URL to point to is: `http://localhost:3000`

- the root page displays the demo product catalog
- the `/user` page displays information about the user
- the `/health` page displays health check data

Usage on CloudFoundry
---------------------

Adjust the `manifest.yml` to your needs:

- The deployment name, host and domain
- The host, port, root environment variables pointing to the above Simplicit&eacute;&reg; instance

To deploy manually use:

	cf push

To undeploy manually use:

	cf delete <deployment name>

License
=======


Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at:

[](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
