# Kindle Kiosk Dash

This is a simple webpage that will display like a digital photoframe but show an apps dash when the screen is pressed.

This was created to be used as the start page for Fully Kiosk Browser on a kindle fire.

# Setup

Clone the repo and run `yarn install`.

Copy the example .env file to create your own `cp .env.example .example` and update values

Copy the example config file to create your own `cp Config.js.example Config.js`

Within the config file you can enter the paths to your photos and apps. To get the URL for apps you can use intents, the simplest way to get this is to go into Fully Kiosk Browser -> Settings -> Kiosk Mode -> Single App Mode -> Select an app and copy the URL it gives and turn off single app mode again.

For example the config might look somthing like ...

```
images: ["/images/1.jpg", "/images/2.jpg"],
apps: [
  {
    label: "Disney+",
    iconUrl: "/apps/disney+.png",
    href: "intent:#Intent;component=com.disney.disneyplus/com.bamtechmedia.dominguez.main.MainActivity;end",
  },
]
```

Run `yarn build`

You can then serve the build directory using a webserver yourself or use included docker compose file to serve using the the nginx docker image on port 8181

`docker-compose up -d`

For example, use docker on a Raspberry Pi on your network, and set Fully Kiosk Browser start page to the IP on the pi on port 8181.

# Auth
HTTP basic auth is used, a user and password will need to be created.  The auth directory is linked with docker as a volume.  You can run the below to create a user.

```
sudo htpasswd -c docker/nginx/auth/nginx.htpasswd user1
```

# SSL
By default the supplied docker compose setup will run the app on port 8282.

You can use SSL by creating certs named "default" in `docker/nginx/ssl`.  These can generated using a commaind like...

```
openssl req -newkey rsa:2048 -nodes -keyout docker/nginx/ssl/default.key -x509 -days 365 -out docker/nginx/ssl/default.crt
```

The nginx `app.conf` file needs to be updated to use SSL and the `docker-compose.yml` may need to be updated to use a different point depending on the setup.
