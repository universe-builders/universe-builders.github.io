---
title: 🎨 Art Direction
parent: Void Survivors
layout: default
nav_order: 21
---

This page defines the direction of the art for the game Void Survivors.

This document is a WIP and will be completed in the Pre-Production phase of development. See [Development Plan](development-plan) for more info.

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

## 🪘 Art Pillars 🪘

These pillars help drive decisions and direction in all aspects of the art for Void Survivors.

### 🗝️ Hyper Accessible
Void Survivors should support as many people as possible, on as many devices as possible, in as many situations as possible.

🔓 Accessible graphics that are clear and understandable at a glance.\
🔓 Low hardware requirements (Older phones, laptops, ...).\
🔓 Consideration for individuals with visual impairments.\
🔓 Low download requirements for low bandwidth tolerance.\
🔓 Streamable assets for downloading on demand.\
🔓 The graphics should be appropriate for players PG+.

### 🔥 Destruction
Void Survivors has a primary player motivation for destruction, ie explosions, flashy visual effects, objects being smashed apart, and general mayhem.

🎆 All objects should be destructable and breakable, in a performant manner.\
🎆 Particle effects and other VFX should be highly leveraged.

### 📍 Low Fidelity
The simulation of Void Survivors is lower fidelity than many action titles, specifically by using simpler physics🎾 (collision and resolution) and artificial intelligence🧠 than most action titles. This is to allow performant computation on low-end hardware and allows for large swarms of enemies and players in a single team.

The art style should reinforce this this. As detailed in the 'Kingdoms and Castles' postmortem, players expect higher fidelity simulation the higher fidelity the graphics are. Kingdoms and Castles chose a very low-fidelity art style to match their low-fidelity simulation, and received critical and commercial success.

![Kingdoms and castles](images/KC-Swineherd.webp)
[Kingdoms and castles postmorem (GDC Vault)](https://www.gdcvault.com/play/1025678/-Kingdoms-and-Castles)

### 🐲 Fantastical
Void Survivors is set in an environment that is whimsical and light hearted. It avoids heavy themes, horror elements, and realism. Players should get a sense of wonder and delight in the environment and elements within Void Survivors. The combat will be highly stylized and not use gore, blood, or any other violent themes.

🧚 Effects should be comical and highly animated.\
🧚 Themes should be vibrant.\
🧚 Invaders should be based in fantasy and myth.

----

## 👉 Direction 👉

To reinforce the art pillars, these sections define more specific direction to be followed in the construction of the art for Void Survivors.

### 👉 Voxel based models
Voxel based models are highly compressible compared to typical triangle based meshes, allowing for a huge amount of content to be transmitted to clients with a small amount of bandwidth.

Voxel models are easily procedurally destructable compared to typical triangle based meshes. This is achieved simply by adding force to the cubes in the voxel mesh allowing for explosions and other effects - compared to a typical triangle based mesh destruction system that requires definition of fragments which has a production and asset size overhead.

Voxel based models are low fidelity, reinforcing the low fidelity nature of the simulation.

The following reference images demonstrate voxel based meshes in games.

![1](images/voxel-1.jpg)\
[Source: Stone Hearth](https://store.steampowered.com/app/253250/Stonehearth/)
![1](images/voxel-2.png)\
[Source: Stone Hearth](https://store.steampowered.com/app/253250/Stonehearth/)
![1](images/voxel-3.jpg)\
[Source: Minecraft](https://www.minecraft.net/en-us)
![1](images/voxel-4.webp)\
[Source: Minecraft](https://www.minecraft.net/en-us)

### 👉 Isometric View
Having an isometric view allows for higher device accessibility and control scheme, as well as performance optimizations.

The isometric view provides simplicity when panning and zooming a camera, allowing for a simple control scheme.

The isometric view is great at providing perspective of relative sizes of elements, and is used frequently outside of games for visualization purposes which makes it more accessible to players without much experience in games.

Having a fixed isometric view, opposed to a perspective camera, allows for optimizing the rendering pipeline which will make it more performant on lower end devices. Further, isometric views require less graphical computation, compared to that of a perspective based renderer due to orthographic projections being the default projection of renderers.

The following reference images demonstrate the isometric viewpoint.

![1](images/iso-1.jpg)\
[Source: Team Porcupine](https://github.com/TeamPorcupine/ProjectPorcupine/issues/1081)
![1](images/iso-2.webp)\
[Source: Wakfu](https://mmorpg.gg/best-isometric-mmos/)
![1](images/iso-3.png)\
[Source: Unity](https://docs.unity3d.com/Manual/Quickstart2DPerspective.html)

### 👉 Flat World
Having a flat world, with no terrain altitude, allows for simpler controls and world generation.

A flat world is very simple to procedurally generate, compared to that of a world with different levels of terrain which requires mountains, rivers, and lakes. This reduces the production cost to develop the world.

A flat world makes Void Survivors far more accessible from a control scheme standpoint, requiring only panning and zooming to be able to interact effectively. In a non-flat world, rotating is required as objects may be obscured by terrain, eg an object hiding behind a mountain.

The following reference images demonstrate flat worlds.

![1](images/flag-1.jpg)\
[Source: Kingdoms and castles](https://www.gdcvault.com/play/1025678/-Kingdoms-and-Castles)
![1](images/flat-2.png)\
[Source: Age of Empires](https://www.gdcvault.com/play/1025678/-Kingdoms-and-Castles)
![1](images/flat-3.jpg)\
[Source: The Fertile Crescent](https://docs.unity3d.com/Manual/Quickstart2DPerspective.html)

### 👉 Desaturated colors and highlighted elements
There will be a large number of players and invaders on screen at once and it's important to remove cluttering from the screen.

To achieve this, damaging elements and elements that players should focus on (eg players that are dangerously close to being defeated when playing the healer class) should be highlighted and pop out of the background.

There are damaging elements in Void Survivors that should be clear to the player, so they can avoid damage and live as long as their skill allows them to, and provide them a high sense of locus of control. 

The following reference images demonstrate desaturated colors of elements except for a few key elements that should draw the players attention.

![1](art-reference/3gxZJvcnv9CiS8Q8f8Nt5d.jpg)\
[Source: Deaths Door](https://store.steampowered.com/app/894020/Deaths_Door/)
![1](art-reference/Screenshot%202023-03-12%20132848.png)\
[Source: Deaths Door](https://store.steampowered.com/app/894020/Deaths_Door/)
![1](art-reference/ss_5fc49d3c5fa34b0d0e6b6a5621f9062bec7ac4d7.1920x1080.jpg)\
[Source: Tunic](https://steamcommunity.com/app/553420)
![1](art-reference/hades_06jpg.webp)\
[Source: Hades](https://store.steampowered.com/app/1145360/Hades/)
![1](art-reference/ss_0893ef2bd93d4e9e2138006424d088523a5daecd.1920x1080.jpg)\
[Source: Enter the gungeon](https://store.steampowered.com/app/311690/Enter_the_Gungeon/)
![1](art-reference/20201020172914_1.webp)\
[Source: Hades](https://store.steampowered.com/app/1145360/Hades/)

### 👉 Flat Colors with gradients
To minimize on the assets required to play Void Survivors, textural elements should be used sparingly. Instead,flat colors and gradients, which can be encoded in a very small amount of mathematical code, should be used. 

Flat colors offer visual simplicity which reduces the noise that textural elements can create on small screens.

Flat colors make it easier to customize for visual impairments, and preferences can be provided to players (eg changing damaging elements from a red color to a player's preferred color).

The following reference images demonstrate games that use flat colors with gradients and sparingly use textual elements.

![1](art-reference/ss_83e57d823ecb8559cd3c70cef500b33d4b841787.1920x1080.jpg)\
[Source: Deaths Door](https://store.steampowered.com/app/894020/Deaths_Door/)
![1](art-reference/ss_b4ab5328b2ab7b7d09451fee1b273f36bfc9a788.1920x1080.jpg)\
[Source: Cube World](https://store.steampowered.com/app/1128000/Cube_World/)
![1](art-reference/cube-world.webp)\
[Source: Cube World](https://store.steampowered.com/app/1128000/Cube_World/)
![1](art-reference/ss_edad47b83a2bffd907deee00b2ac548449614fa2.1920x1080.jpg)\
[Source: Stone Hearth](https://store.steampowered.com/app/253250/Stonehearth/)
![1](art-reference/Tunic-Games-Culture.webp)\
[Source: Tunic](https://steamcommunity.com/app/553420)
![1](art-reference/3JwcQaj7LZ8dUvnEGqauYk.jpg)\
[Source: Tunic](https://steamcommunity.com/app/553420)
![1](art-reference/calder-moore-isoswamp-small.jpg)\
[Source: Calder Moore - Artstation](https://www.artstation.com/caldermoore/prints?print_type=art_poster)
![1](art-reference/Screenshot%202023-02-26%20161758.png)\
[Source: Minecraft Dungeons](https://store.steampowered.com/app/1672970/Minecraft_Dungeons/)
![1](art-reference/Screenshot%202023-02-26%20161838.png)\
[Source: Minecraft Dungeons](https://store.steampowered.com/app/1672970/Minecraft_Dungeons/)
![1](art-reference/20190909215607_1.jpg)\
[Source: Unrailed](https://store.steampowered.com/app/1016920/Unrailed/)
![1](art-reference/Screenshot%202023-03-12%20170932.png)\
[Source: Calder Moore - Artstation](https://www.artstation.com/caldermoore/prints?print_type=art_poster)
![1](art-reference/stonehearth_blacksmith_render_by_pandemictyler_d8sdebl-fullview.jpg)\
[Source: Stone Hearth](https://store.steampowered.com/app/253250/Stonehearth/)

### 👉 Soft lighting and shadows
Void Survivors is set in a fantasy environment that is whimsical and light hearted. To reinforce this, soft lighting and shadows should be used as opposed to realistic simulation of lighting and shadows.

The following reference images demonstrate soft lighting and shadows.

![1](art-reference/Deaths-Door-screen-5.jpg)\
[Source: Deaths Door](https://store.steampowered.com/app/894020/Deaths_Door/)
![1](art-reference/deaths-door3.webp)\
[Source: Deaths Door](https://store.steampowered.com/app/894020/Deaths_Door/)
![1](art-reference/imrs.jpg)\
[Source: Hades](https://store.steampowered.com/app/1145360/Hades/)
![1](art-reference/maxresdefault.jpg)\
[Source: Tunic](https://steamcommunity.com/app/553420)
![1](art-reference/082221.webp)
[Source: Tunic](https://steamcommunity.com/app/553420)

### 👉 Stylized Textures
Void Survivors is set in a fantasy environment that is whimsical and light hearted. To reinforce this, stylized and handpainted textures should be used opposed to realistic textures.

The following reference images demonstrate stylized handpainted textures and elements.

![1](art-reference/andrii-tuzenko-7%20-%20Copy.jpg)\
[Source: Andrii Tuzenko - Artstation](https://www.artstation.com/andrii_tuzenko)
![1](art-reference/castle_town__casual__isometric__low_poly__by_aaagameartstudio_de28gsa-pre.jpg)\
[Source: Andrii Tuzenko - Artstation](https://www.artstation.com/andrii_tuzenko)
![1](art-reference/sephiroth-art-golem-1600.jpg)
[Source: Sephiroth Art - Artstation](https://www.artstation.com/sephirothart)

### 👉 Character limbs aren't attached
Having characters limbs (hands, feet) not be attached to their torso allows for a far simpler key-frame animation system which is computationally less expensive, easier to produce assets for, and requires less bandwidth to transmit animated assets.

The following reference images demonstrate models without their limbs attached.

![1](art-reference/swamp1-1425665136.avif)\
[Source: Stone Hearth](https://store.steampowered.com/app/253250/Stonehearth/)

----

## Concept Art

To be completed by the Art Director in the Pre-Production phase. See [Development Plan](development-plan) for more info.

----

## Color Pallette

To be completed by the Art Director in the Pre-Production phase. See [Development Plan](development-plan) for more info.

----

## Animation Samples

To be completed by the Art Director in the Pre-Production phase. See [Development Plan](development-plan) for more info.

----

## Character Designs

To be completed by the Art Director in the Pre-Production phase. See [Development Plan](development-plan) for more info.

----

## UI Mockups

To be completed by the Art Director in the Pre-Production phase. See [Development Plan](development-plan) for more info.