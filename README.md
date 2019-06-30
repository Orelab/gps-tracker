
# The project

We can find lots of cheap GPS trackers, aimed to be used with a server provided by some obscur chinese company.
The original server is generally based on the open-source solution OpenGTS. I'm shure this solution is great,
but, as a developer (and for fun), I wanted a more simple solution with services I could tune easilly.

So, here is my simple server made in Javascript on top of NodeJS :)


# Installation
```
git clone git@github.com:Orelab/gps-tracker.git
npm install
cp config.json.sample config.json
# update your config.json now
node index.js
```
Note that you'll have to tune your GPS tracker too. In mine, I had to send by SMS the following message
(see your tracker's documentation for more details) :
```
server,666666,1,domain.net,1337,0#
```
Of course, you'll have to put the same domain and port here that in config.json.


# Roadmap

```
1. make the server log the tracker position !
2. build an interface which allow to visualize the tracker position
3. tinker a geofencing functionality
4. add a process which prevent if the tracker stops emiting data
```
For now, as the project just started, I just released the first step, as a prototype :)

