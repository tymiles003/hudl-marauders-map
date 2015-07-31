# Hudl Marauder's Map
### Overview
Have you ever walked up to the device cart only to find that the device you need is gone even...and wasn't checked
out (😱)?

Are you the type of scumbag to take a device from the cart without checking it out (😡)?

Well do I have news for you...The Marauder's Map has you covered. Some of The Map's *clutchest* features include:
 - mobile push notifications on that device you just took from rack but forgot to check out
 - mobile device check out from a native iOS app on the device
 - automatic device check in once you place the device back on the cart
 - locate that missing device within region of Hudl East, 2nd floor from the device cart or the web
 - improved web-based device check out, check in, and filtering

### How it Works
Several iBeacons have been strategically placed throughout the office by the team...one in the 'East' region of Hudl
East, one in the 'West', and one at the device cart:

![alt text](https://raw.githubusercontent.com/JRJurman/hudl-marauders-map/readme/public/img/hudl-zones/hudl-east-with-zones.png)

When you enter or leave close proximity to the cart with a device, the iBeacon on the cart is able to initiate an event
to either reminder you to check out the device (via a push notification and our slick mobile check out process) or
automatically check in the device.

Two other iBeacons allow The Map to determine roughly where a device is located in Hudl East, 2nd floor. Just visit the
web app for a nice little map that will tell you where to find that iPhone 6 running iOS 8.3 that you've been looking
for is.

All the other stuff is handle via good ol' fashioned Swift and JavaScript :D

### Deploy
 1. Clone this repo (duh)
 1. Install [Geddy](http://geddyjs.org), the Node.js web framework used to build the web app --> `$ sudo npm install geddy`
 1. `$ cd hudl-marauders-map`
 1. `$ geddy` --> your server is now running in development mode at `[localhost:4000](http://localhost:4000)`
 1. See [the documentation](http://geddyjs.org/documentation) for more info about deploying prod and other fancy stuff.
 1. Build the [iPhone app](https://github.com/pluddy/modi-marauders-map/) onto the device of your choice.
 1. Launching the app will register the device with the deployed instance of this app. After that, everything else
 should just work!

### Remaining Work
 - [ ] The Marauder's Map is currently deployed to a Digital Ocean box, running in development mode. We had some
 problems getting the production version (using MongoDB) running due to the ORM. Getting prod running would be dandy.
 - [ ] Deploying this somewhere more accessible than [104.131.19.33:4000](http://104.131.19.33:4000) would be great as
 well :D
 - [ ] More iBeacons would make The Map more useful. All you have to do is add the iBeacon to the app, tune its strength,
 and update the map image.

### Credits
The Marauder's Map was built by the \#SkunkTwerks2k15 team, consisting of Jesse Jurman
([@JRJurman](https://github.com/jrjurman)), Patrick Luddy ([@pluddy](https://github.com/pluddy)), Derek Nordgren
([@dnordgren](https://github.com/dnordgren)) and Jon Reynolds ([@SunburtReynolds](https://github.com/sunburtreynolds)).
