---
title: 🧮 Technical Direction
parent: Void Survivors
layout: default
nav_order: 24
---

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

----

## 🧮 Technical Direction Summary
Platforms:\
Primary: Web for iPhone, Android, Windows, MacOSX, and Linux.\
Secondary: Native applications for iPhone, Android, Windows, MacOSX, and Linux.

Game Engine:\
In-house developed.

Libraries/Technologies Leveraged:\
WebGL, WebGPU, WebRTC, Kubernetes, Cloud provided services.

Languages:\
C, WebAssembly, Typescript.

Content Generation Tools:\
MagicaVoxel, Photoshop.

----

## 🪘 Technical Pillars 🪘

These pillars help drive decisions in all aspects of the games technology.

### 🗝️ Hyper Accessible
The game should support as many people as possible, on as many devices as possible, in as many situations as possible.

🔓 Low download requirements for low bandwidth tolerance.\
🔓 Highly device and OS accessible (Win, Mac, Linux, iPhone, Android).\
🔓 Low hardware requirements (Older phones, laptops, ...).\
🔓 Low bandwidth and connectivity common on public transport or remote areas.

### ✨ High Content Density
The game client should support a high density of players and content on screen.

⭐ Up to hundreds of players on screen at one time.\
⭐ Lots of abilities.\
⭐ Lots of invaders.\
⭐ Lots of particle and destruction effects.

### 🎪 Massively Scalable
The game world should support a large amount of varied size teams from small to large and for large amounts of players joining the game spontaneously.

🔺 All teams should be placed within the same world, allowing players to discover them by exploring the void.\
🔺 Support for scaling up game servers to support a large community joining within seconds.\
🔺 Support for scaling down game servers to conserve hosting expenditure.

----

## 🖥️🎮 Web Game Client Technology Stack

### 🌐 Web Browser (Chrome, Safari, Firefox, ...)
Web browsers were chosen because they are available on all major platforms, including desktops, laptops, mobile phones, and even smart TV's. It is the easiest way to make the game device inclusive.

Web browsers have reached a maturity with their graphics fidelity (WebGL/WebGPU), their runtime performance (WASM), and their networking capabilities (WebRTC), to ensure that a low-fidelity game can be developed and run at a high-fps.

Web applications can be packaged into native applications for PC, Mac, and mobile phones using progressive-web app technologies such as Electron. If the game wishes to leverage the hardware acceleration and API advantages of a native application, this route is a proven option.

### ✨ Simulation Architecture
The simulation architecture used will be an Entity-Component-System architecture using Data-Oriented principles to optimize performance for a large amount of unique entities on screen.

This style of architecture has been popularized by Unity's ECS implementation and has a proven ability to allow low-end hardware to support thousands of unique objects being simulated at high frame rates.

### 👾 Graphics
WebGL is the graphics library that will be targeted until WebGPU has reached mass availability, as currently it is only available in Chrome browsers.

The graphics interface will be developed in-house, interfacing with WebGL directly, opposed to using an existing interface such as BabylonJS or ThreeJS. This was chosen as the graphical optimizations that can be realized for a voxel based graphical style outweigh the development cost of building this interface. Our team has previous expertise in developing such interfaces.

Lot's of the characters, enemies, and effects will be the same which will allow for instancing on the GPU to provide better frame rates for low end devices. 

### 💡 Lighting
The lighting system should be simplistic and stylized instead of aiming for photorealism, ie it should avoid expensive lighting and shadow methods such as Raytracing and Shadow Mapping.

### 🎾 Physics
The physics in the game will be low-fidelity to reduce performance load on low-powered devices as the amount of collidable elements (players, invaders, ...) will be high. The results of colliding with an enemy will not result in a physical reaction, such as being pushed back, but will result in damage taken. This results in far less computation required and thus supports lower-end hardware and is the typical behavior in bullet-heaven game.

### 🏃‍♀️ Animation
The animation in the game will be simple interpolation of key frames without using skeletal, procedural, or computationally expensive systems such as Inverse-Kinematics. This results in lower production cost for animations, a less computational expensive animation system, and less bandwidth required to transmit animated assets.

### 🧠 Artificial intelligence
The AI in the game will be simplistic to reduce performance load on low-powered devices as the amount of intelligent simulated agents (invaders) will be high. Invaders will be simulated using a simplistic finite state machine as it is highly performant, compared to that of behavior tree or more complicated GOAP graph, and will use simplistic steering behaviors (flocking, avoidance, interception, ...) to create more sophisticated grouping behaviors. 

### 🖧 Networking
WebRTC data channels will be used for the bulk of game communications as they are UDP based and ideal for low-latency low-bandwidth operations and allow for peer-to-peer connections at ~70% success rate for NAT punchthrough. It also removes the need for persistent connections which can be inconsistent on public transport and in low bandwidth environments, such as those in low socioeconomic areas.

WebSockets will be used for communicating to content providers and other backend providers that do not require low latency, for usages such as streaming in required assets to play the game.

HTTP REST requests will be used for communication to various API's, such as authentication.

### 🖳 Language
WebAssembly will be the language that will run on each player's device through the Web Browser. The team will use the C language to write logic which will then be transpiled into WebAssembly via the clang toolchain.

The client engine is separated into independent modules which include the core runtime engine and the game systems. Each game system is independently built and linked which allows for a quick iteration and runtime hot reloading when developing logic for a single system, opposed to needing build and reload the entire game.

### ❓ Why not use a pre-existing engine?
There are many engines that export a builds to the web, such as Unity, UE4, and Godot, however all of those options fail to hit several of the technical goals and accessibility targets that this game desires.

Specifically, all of those engines struggle to export Web builds that run well on low-end hardware, even struggling to hit high frame rates on average gaming machines, and deliver game builds and assets that result in large initial downloads for users. Due to this these reasons, thse engines are a poor choice for meeting our accessibility goals.

Further, getting those engines to support the high content density desired, in web exports, is a development challenge.

There are engines specifically for developing web based games, such as BabylonJS and PlayCanvas, however those provide no feature support for the networking and high content density requirements for the game, and the advantages of each engine were not deemed justifyable for the restrictions imposed for this specific project.

These engine options were investigated in the ideation phase of this project.

The Web platform and low simulation & graphical fidelity requirements of this game means that building a custom engine provides the ability to optimize around these requirements.

In tests done in the ideation phase it was validated that the fidelity bar could be hit using a simple custom engine on low powered devices, running at a frame rate that exceeded all other tested engines.

There are numerous web based games that have chosen to invest in their own engine, including Krunker.io debatably the most played 3D multiplayer web game available, and no discovered examples of web based 3D multiplayer games with 30+ FPS that were developed using one of the aforementioned engines.

The content generation pipelines will however use existing technologies, specifically MagicaVoxel for generating 3D assets, and the engine will integrate with those.

Although the initial cost for developing this technology is high it means the product is positioned in a place where it is hard for substitutes or new entrants.

See the Accessibility Plan for more information on how a custom engine allows us to achieve a more accessible and better experience for our players.

----

## ☁️ Game Backend Technology Stack

### 🎮 Game Server
Game servers will handle all non-client side interactions and ensuring the consistency of the simulation for all players. The game client will have a lot of authority regarding what events take place, such as whether a player was inflicted by damage, and the game server will do some light validation of these events. This poses the risk of players cheating, however as a cooperative game this will not have the exploitation rewards compared to a competitive game. The game server will flag any clear invalidations of the game rules which may result in a player being banned.

The game server will be written in the C language and executed as binaries in the Alpine Linux OS inside of a container. Similar to the game client, each game system will be a separate container and orchestrated separately allowing for quick iteration speed in development and rolling updates to specific systems in production.

Game servers will have authority over a single team and will handle migrating new teams as teams merge or seperate. As new teams form game servers will be horizontally scaled to account for the new team.

Game servers will be vertically scalable to account for a team changing in size dramatically, ie as a team grows in player numbers it will have more hardware resources available to it.

Game servers will be spatially distributed to allow players exploring the void to enter and exit them through moving in the game world.

Once target devices have been identified, during development performance tests will continuously be run to ensure that the devices have consistent and high performance. One route to raising performance is to offload computation to the game server. This will be done as a last-resort basis as more computation will cause scalability and cost efficiency issues in production.

James Knight has worked on these types of spatially distributed game servers at 3 separate MMO development companies over his career, and is competent in being able to architect and implement them.

### 📦 Orchestration
Kubernetes will serve as the orchestrator for all the game servers and in-house developed auxiliary services. Kubernetes was chosen as it allows for ease of deployment to any cloud provider (AWS, Google Cloud, Azure, ...) and reduces the need for cloud services during the development period as each developer can run a Kubernetes cluster on their local machine via Docker Desktop.

Kubernetes supports auto-scaling, with strong integration with all major cloud providers, which will be highly leveraged during the live operation of the game to converse expenditure and scale up to support a spontaneous influx in players.

### 🐕‍🦺 Auxiliary Services
The game will require a set of services which are readily provided by existing game service providers (Epic Games, Unity, ...) or cloud providers. These services will ideally be leveraged rather than built in-house, to reduce development costs.

Such services include:
* Authentication
* Authorization
* User account persistence
* Game session statistics persistence
* Configuration
* Analytics
* Payment processing
* Version control
* Artifact distribution
* CI/CD pipeline

### 🖼️ Content Delivery
The game client will be delivered using the common mechanisms for delivering websites, using a CDN at the edge. This client will contain the most common and required assets (Models, textures, ...). To reduce the size of the initial client download, most assets will be downloaded on demand as required. These will be delivered using a separate CDN optimized for streaming on-demand binary assets.

### ☁️ Hosting
The backend will be distributed amongst atleast one cloud provider, potentially one for the kubernetes deployment and atleast one for the auxiliary services. AWS is the likely candidate as their costing structure seems to be most efficent for this project, and they are providing free credits and support to this project through the Australian Games Tech group.