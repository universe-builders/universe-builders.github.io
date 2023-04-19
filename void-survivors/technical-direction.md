---
title: 🧮 Technical Direction
parent: Void Survivors
layout: default
nav_order: 24
---

This page defines the direction of the technology (Engine, Content Pipeline, Multiplayer Servers, ...) used to develop and deploy the game Void Survivors.

This document is a WIP and will be iterated upon during the Pre-Production phase of the game's development.

----

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

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

## 🖥️🎮 Game Client Technology Stack

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

### 🎾 Physics
The physics in the game will be low-fidelity due to the amount of collidable elements that will be present. The results of colliding with an enemy will not result in a physical reaction, such as being pushed back, but will result in damage taken. This results in far less computation required and thus supports lower-end hardware and is the typical behavior in bullet-heaven game.

### 🖧 Networking
WebRTC data channels will be used for the bulk of game communications as they are UDP based and ideal for low-latency low-bandwidth operations and allow for peer-to-peer connections at ~70% success rate for NAT punchthrough. It also removes the need for persistent connections which can be inconsistent on public transport and in low bandwidth environments, such as those in low socioeconomic areas.

WebSockets will be used for communicating to content providers and other backend providers that do not require low latency, for usages such as streaming in required assets to play the game.

HTTP REST requests will be used for communication to various API's, such as authentication.

### 🖳 Language
WebAssembly will be the language that will run on each player's device through the Web Browser. The team will use the C language to write logic which will then be transpiled into WebAssembly via the clang toolchain.

The client engine is seperated into independent modules which include the core runtime engine and the game systems. Each game system is independently built and linked which allows for a quick iteration and runtime hot reloading when developing logic for a single system, opposed to needing build and reload the entire game.

----

## ☁️ Game Backend Technology Stack

### 🎮 Game Server
Game servers will handle all non-client side interactions and ensuring the consistency of the simulation for all players. The game client will have a lot of authority regarding what events take place, such as whether a player was inflicted by damage, and the game server will do some light validation of these events. This poses the risk of players cheating, however as a cooperative game this will not have the exploitation rewards compared to a competitive game. The game server will flag any clear invalidations of the game rules which may result in a player being banned.

The game server will be written in the C language and executed as binaries in the Alpine Linux OS inside of a container. Similar to the game client, each game system will be a seperate container and orchestrated seperately allowing for quick iteration speed in development and rolling updates to specific systems in production.

Game servers will have authority over a single team and will handle migrating new teams as teams merge or seperate. As new teams form game servers will be horizontally scaled to account for the new team.

Game servers will be vertically scalable to account for a team changing in size dramatically, ie as a team grows in player numbers it will have more hardware resources available to it.

Game servers will be spatially distributed to allow players exploring the void to enter and exit them through moving in the game world.

James Knight has worked on these types of spatially distributed game servers at 3 seperate MMO development companies over his career, and is competent in being able to architect and implement them.

### 📦 Orchestration
Kubernetes will serve as the orchestrator for all the game servers and in-house developed auxillary services. Kubernetes was chosen as it allows for ease of deployment to any cloud provider (AWS, Google Cloud, Azure, ...) and reduces the need for cloud services during the development period as each developer can run a Kubernetes cluser on their local machine via Docker Desktop.

Kubernetes supports auto-scaling, with strong integration with all major cloud providers, which will be highly leveraged during the live operation of the game to converse expenditure and scale up to support a spontaneous influx in players.

### 🐕‍🦺 Auxillary Services
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
The game client will be delivered using the common mechanisms for delivering websites, using a CDN at the edge. This client will contain the most common and required assets (Models, textures, ...). To reduce the size of the initial client download, most assets will be downloaded on demand as required. These will be delivered using a seperate CDN optimized for streaming on-demand binary assets.
