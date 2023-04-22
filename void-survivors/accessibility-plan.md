---
title: ♿ Accessibility Plan
parent: Void Survivors
layout: default
nav_order: 35
---

This page defines the plan for developing and validating Void Survivors is accessible to as many people as possible.

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

## Overview

Universe Builders believes that games should be playable by anyone - with anyone - at any time.\
We develop games with no segregation or exclusionary mechanics, such as skill level or time invested.\
Void Survivors is designed with hyper accessibility in mind to support as many players in as many situations as possible.

Void Survivors has currently considered accessibility for the following groups:
* Players in low-socioeconomic areas.
* Players with vision impairments.
* Players with movement impairments.
* Players in low-connectivity networking environments, such as public transport or on mobile networks.
* Players in low-bandwidth networking environments, such as remote areas.
* Players with input requirements and preferences, including accessibility controllers.
* Players with cognitive impairments and ADHD.
* Players with different skill levels.
* Players with different gameplay motivations, such as preferring to avoid combat or stressful situations.

## Vision impairment accessibility plan
Vision impairment affects ~45% of the population.\
The Web platform has always prioritized accessibility and has a rich experience for color blindness and other vision impairments, through readily available browser extensions.\
These extensions allow for players with vision impairments to play our game with their customized preferences.\
Further, these extensions allow our developers to simulate vision impairments to allow testing of our graphics, to ensure that the graphics are appropriate for visually impaired individuals.\
As part of our development plan we intend to get advice from access consultants and test the game with various vision impaired individuals.

A list of such extensions is available by [Color Blind Awareness Org](https://colorblindawareness.org/chrome-extensions/).

## Device accessibility plan
One barrier that is incredibly frustrating for players is when two players have the same game, but on different devices, and are disallowed from playing with each other. Void Survivors runs on numerous devices without any restriction of cross playing between them.\
The design of Void Survivors strongly considered how to present a game that feels like a native experience regardless of whether you are playing on a touch interface mobile device, on a laptop with a keypad, or on a desktop with a gamepad.\
The design process included excluding mechanics that wouldn't be accessible on certain devices, such as precise targetting mechanics on touch devices, and distilling the UI to be appropriate on large and small screens.\
The choice of technologies ensured that we are able to successfully produce a game that can run effectively on the largest array of devices and inputs, specifically by choosing Web as the target platform and investing in custom technology to optimize for it.\
The devices that Void Survivors will be avilable on are MacOSX, Linux, Windows, iPhone, and Android.

## Low-powered device accessibility plan
More than 54% of the world's mobile and laptop devices are considered to be low-powered, offering a small CPU, integrated GPU, and low battery life. This is proportionally higher in low-socio economic area's, such as in developing countries and remote communities, where an estimated 84% of devices are considered to be low-powered.\
To support low-powered devices (low CPU, GPU, and battery life) common in low socio-economic environments it is vital to make the game as efficent as possible on those devices.\
This was a strong consideration in the choosing of the game genre and mechanics, eg:
* the art style is a highly-optimizable voxel representation for small GPUs
* the physics is simplistic with little collision resolution for small CPUs
* the AI is simplistic with behaviors able to be reused for numerous agents in the group, for small CPUs

The choice to invest in developing a custom engine provides ultimate control over the ability to optimize and deliver the best experience for low-powered devices, at the cost of a longer development cycle.

## Movement impairment accessibility plan
Movement impairments affect ~25% of population.\
The Web has focused on movement impairment accessibility for decades and has a mature set of tools that Void Survivors will leverage to support individuals with movement impairments.\
Specifically using the Web's Gamepad API, Void Survivors is able to support a massive range of gamepads and accessibility controllers.\
The game was designed in a way to be playable with minimal inputs, including using just one finger tapping or holding for mobile devices.\
Different control schemes will be offered, and are appropriate, for the game including click-to-move and hold-to-move, where hold-to-move is often problematic for those with movement impairments.\
The game is controllable with keypads, touchpads, gamepads, accessibility controllers (including eye tracking), on a large range of devices.

## Low bandwidth network environment accessibility plan
Users in remote areas, on restrictive internet plans such as common in low-socioeconomic households, and users on mobile networks have low bandwidth availability, ie having small download caps or expensive bandwidth costs.\ Games are typically excellent at supporting low bandwidth players, an average 30-minute game of Call of Duty or League of Legends use less bandwidth than downloading a single HD image from Facebook (~40MB).\
However most games require large downloads to be able to play and typical engines perpetuate this problem by offering little support to streaming assets and minimizing build sizes.\
Void Survivors will require no installation, by the nature of the Web, and the initial download size will be optimized to package the bare minimum assets, in a highly compressed format, and further assets will be streamed in on demand.\
Assets will be offered in various definitions - allowing users to specify downloading standard-definition assets or high-definition assets based on their requirements. 

## Low connectivity network environment accessibility plan
People using satellite connections, in remote areas using degraded equipment, on highly congested networks shared with lots of users, using mobile networks while roaming, and on public transport all face the problem of network jitter which causes dropouts and disconnections.\
These environments have been optimized for, by choosing a UDP-based networking transport, which is connection free and highly tolerant of dropped and corrupted data. Further, a peer-to-peer networking topology will be used, using WebRTC, which allows for players to connect directly to other players instead of having to be routed through a server that may be geographically distant from them.\
These approaches allow for a highly tolerant networking environment where users can lose connectivity for extended periods of time without being removed or disconnected from a session.

## Skill level and gameplat motivations accessibility plan
Games frequently segregate players based on skill levels through explicit means of matchmaking or by implicit means of content difficulty. Further games commonly force players into situations that may be stressful, regardless of the role they choose. Universe Builders strives to make games that have no exclusionary or segregation mechanics.\
The foremost way that Void Survivors allows players of different skill levels and motivations to play together is by offering a range of character classes that have different play styles and skill level requirements. For example the Healer class can be played with low skill level in a purely team support way, as they are motivated away from combat and towards groups of players.\
In contrast the Rogue class is recommended to have high skill level, as it requires environmental awareness, is combat focused, and to play effectively requires strategic risk taking.\
Having this wide range of skill level accessibility means that players can choose a class that suits them at a particular point in time, and allows players with little experience of games to be impactful and valuable to a team.

## Cognitive impairment and ADHD accessibility plan
Cognitive impairments affect ~8% of the population, ADHD affects ~18% of the population.\
Void Survivors is designed to allow to be played casually, allowing for people to lose concentration and be multi-tasking whilst playing.\
Players will never be punished within the game, through losing items or status, instead players will be rewarded consistently and fairly and never in a way that would make players feel punished for not reaching a reward level.\
Players are able to join at any time and leave at any time, removing any feelings of commitment to a particular session.\
These strategies support people with ADHD and cognitive impairments as they provide a stress-free reward-oriented and low focus requirement experience.
