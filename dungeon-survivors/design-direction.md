---
title: Design Direction
parent: Dungeon Survivors
layout: default
nav_order: 20
---

# To Do
* Design Pillars
* Gameplay Loop
* Level up faster than enemies get stronger (graphs)
* FTUE

## Player Motivations
### 🤝 Cooperation
Players will have lots of ways to cooperate directly with other players and are highly motivated to seek each other out and team up.
### 🏆 Competition
Teams will have metrics and achievements based on personal performance of individuals within their team.
### 🔥 Destruction
Players will be able to cause destruction to the environment and enemies in an over-the-top fireworks-display comical manner.
### 💪 Progression
Players will feel stronger in a single session during gameplay and upgrade their characters during the meta gameplay.
### 🔎 Discovery
Players will be able to discover different environments, characters, and enemies over their sessions.

## 🌀 Gameplay Loop 🌀

\* Icons on the right of each state indicate the player motivation.

```mermaid
    stateDiagram-v2

    state "🧙 Explore 🔎" as EXPLORE
    state "👹 Find Enemies 🔎" as FIND_E
    state "🧙 Find Players 🤝🏆" as FIND_P
    state "👹 Defeat Enemies 🔥" as DEFEAT_E
    state "🪙 Gain Gold 💪" as GET_GLD
    state "⭐ Gain Experience 💪" as GET_EXP
    state "⬆️ Level Up 💪" as P_LVL
    state "💀 Defeated 💀" as DEFEATED

    note right of GET_GLD
        Metagame progression
    end note

    EXPLORE --> FIND_E
    EXPLORE --> FIND_P
    FIND_E --> DEFEATED: 🖤🖤🖤
    FIND_E --> DEFEAT_E: 💖🖤🖤
    FIND_P --> DEFEAT_E
    DEFEAT_E --> GET_GLD
    GET_GLD --> GET_EXP
    GET_EXP --> P_LVL
    P_LVL --> EXPLORE   
```

```mermaid
    stateDiagram-v2

    state "⏱️ Time Passed" as TIMER
    state "👹 Enemies level up 🔎" as E_LVL
    state "👹 Enemies spawn quicker" as E_QUICK
    state "💀 Difficulty increased 💀" as DIFFICULTY

    TIMER --> E_LVL
    TIMER --> TIMER: ⏱️ 1 minute
    TIMER --> E_QUICK
    E_LVL --> DIFFICULTY
    E_QUICK --> DIFFICULTY
```

## 🎯 Players Goal 🎯
The players🧙 goal is to gain as much gold🪙 as possible, allowing for upgrades💪 in the metagame. The longer the player stays alive the more gold🪙 is gained. 

Players are able to last longer by:
1. Leveling up faster💪 than enemies👹.
2. Finding players🧙 to group up with.
3. Starting stronger💪 (metagame).

## Meta Game Loop

```mermaid
    stateDiagram-v2

    state "📱🎮⌨️ Play" as PLAY
    state "🪙 Gain Gold" as GET_GLD
    state "💀 Defeated" as DEFEATED
    state "🏆 Achievements" as ACHIEVE
    state "💪 Upgrade" as UPGRADE

    PLAY --> GET_GLD
    GET_GLD --> DEFEATED
    DEFEATED --> ACHIEVE
    DEFEATED --> UPGRADE: 🪙 Spend Gold
    UPGRADE --> PLAY: 💪 allows lasting longer
```
