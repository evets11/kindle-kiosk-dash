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
