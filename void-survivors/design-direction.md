---
title: Design Direction
parent: Void Survivors
layout: default
nav_order: 20
---

# To Do
* Design Pillars
* FTUE

----

## 🪜 Design Pillars 🪜

### Hyper Accessibility

### Community engager
* make leader feel important and be recognizable

### Shareable

### Multi-taskable

### Short Sessions
### Leave anytime, join anytime

### Positive reinforcement

----

## 🏃 Player Motivations 🏃
### 🤝 Cooperation
Players are highly motivated to seek each other out and team up. Players progress faster in groups, are able to help each other out directly using their character abilities.
### 🏆 Competition
Teams will have statistics of individual performance (damage, healing, ...) displayed at all times which will motivate players to top the team leaderboard.
### 🔥 Destruction
The combat will cause destruction to the environment and enemies in an over-the-top fireworks-display comical manner.
### 💪 Progression
In a short 15 minute session players will progress rapidly in their character and be reset at the end of the session. In the metagame players can empower their characters by expending currecny.
### 🔎 Discovery
Players will be able to discover a variety of unique and different environments, characters, and enemies over their sessions.


----

## 🌀 Gameplay Loop 🌀

```mermaid

    %%{init: {'theme':'dark'}}%%

    stateDiagram-v2
    direction TB
    accTitle: Gameloop

    state "Explore the void 🧙" as EXPLORE
    state "Find players 🧝🧞" as FIND_P
    state "Invite players 🔗" as INVITE_P
    state "Grow Sanctuary 🌱" as GROW_S
    state "Gain Life Essence 🌿" as GAIN_LE
    state "Level Up ⬆️" as LVL_P
    state "Defend Sanctuary 🛡️🌱" as DEFND_S
    state "Defeat Void Invaders 👹🐸🧌" as DEFEAT_E
    state "💀 Defeated 💀" as DEFEATED
    state "More players find and join the sanctuary 🧝🧞" as FIND_S
    state "Invaders get stronger 💪👹" as LVL_I

    classDef def fill:black,color:white,font-weight:bold,stroke:purple
    classDef team fill:black,color:white,font-weight:bold,stroke:blue
    classDef sanct fill:black,color:white,font-weight:bold,stroke:green
    classDef invader fill:black,color:white,font-weight:bold,stroke:red
    classDef loss fill:black,color:white,font-weight:bold,stroke:red,stroke-width:3
    class EXPLORE def
    class FIND_P,INVITE_P,FIND_S team
    class GROW_S,GAIN_LE,DEFND_S,LVL_P sanct
    class DEFEAT_E,LVL_I invader
    class DEFEATED loss

    note left of GAIN_LE
        Also used for metagame progression
    end note

    [*] --> EXPLORE
    EXPLORE --> FIND_P
    EXPLORE --> INVITE_P
    FIND_P --> GROW_S
    INVITE_P --> GROW_S: join.me/Pewdiepie
    GROW_S --> GAIN_LE
    GAIN_LE --> LVL_P: Life essence🌿 acts as experience points
    LVL_P --> DEFND_S
    DEFND_S --> DEFEATED: 🖤🖤🖤
    DEFND_S --> DEFEAT_E: 💖🖤🖤
    DEFEAT_E --> LVL_I: The larger the 🌱 the stronger invaders 
    LVL_I --> FIND_S
    FIND_S --> GROW_S: The larger the 🌱 the easier to find
     
```

----

## 🎯 Players Goal 🎯
The players🧙 goal is to gain as much life essence🌿 as possible. Life essence is used to upgrade characters💪 in the metagame. The longer the player is able to defend the sanctuary🌱, the more life essence is gained.

Players are able to last longer by:
1. Finding players🧙 to team up with by inviting them via a link🔗 or finding them in the void, which adds more defenders🛡️ to the sanctuary🌱.
2. Gathering life essence🌿 from the sanctuary efficently by avoiding taking damage💖 from enemies👹.
3. Starting stronger💪 by upgrading characters in the metagame using life essence🌿.

----

## 💪 Meta Game Loop 💪

```mermaid
    %%{init: {'theme':'dark'}}%%

    stateDiagram-v2
    direction TB
    accTitle: Metagame loop

    state "📱🎮⌨️ Play" as PLAY
    state "🌿 Gain Life Essence" as GET_LE
    state "💀 Defeated 💀" as DEFEATED
    state "🏆 Unlock achievements" as ACHIEVE
    state "💪 Upgrade characters by spending 🌿 life essence" as UPGRADE

    classDef def fill:black,color:white,font-weight:bold,stroke:purple
    classDef upgrade fill:black,color:white,font-weight:bold,stroke:gold
    classDef sanct fill:black,color:white,font-weight:bold,stroke:green
    classDef loss fill:black,color:white,font-weight:bold,stroke:red
    class PLAY def
    class GET_LE sanct
    class ACHIEVE upgrade
    class UPGRADE upgrade
    class DEFEATED loss

    PLAY --> GET_LE
    GET_LE --> DEFEATED
    DEFEATED --> ACHIEVE: Based on personal performance
    ACHIEVE --> UPGRADE: Spend life essence🌿
    UPGRADE --> PLAY: Allows lasting longer💪
```

---

## 🧝🧞🧙 Characters 🧙🧞🧝


---

## 🛠️ Mechanics 🛠️


---