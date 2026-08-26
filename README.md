# PortfolioSite

An interactive 3D developer portfolio built with **Three.js**, **JavaScript**, and **Parcel**. The experience presents Marko Vasic’s professional profile as an explorable digital environment rather than a conventional static portfolio page.

> **Live site:** [markovasicdeveloper.github.io/PortfolioSite](https://markovasicdeveloper.github.io/PortfolioSite)

## Overview

PortfolioSite is a browser-based 3D experience designed to communicate frontend and software-engineering skills through interaction, animation, sound, and real-time rendering. Visitors enter a custom Three.js scene and explore a portfolio world containing projects, technologies, profile content, and interactive visual elements.

The application is organized as a small client-side engine. Rendering, input, assets, sound, interaction, UI, and world composition are separated into focused modules, while configuration files define the content and behavior of the experience.

## Highlights

- **Interactive Three.js environment** with a custom scene, camera movement, raycasting, 3D text, animated objects, project panels, and technology displays.
- **Asset-driven architecture** for loading and managing `.glb`, audio, image, and font assets.
- **Centralized managers** for rendering, camera control, input, audio, interaction, raycasting, loading, orientation, and error reporting.
- **Responsive browser experience** with mobile-orientation handling and an explicit entry flow that respects browser audio-autoplay restrictions.
- **Audio system** supporting background music, sound effects, mute state, master volume, and browser audio unlocking.
- **Automated test suite** covering core managers, error handling, UI infrastructure, world objects, Three.js dioramas, and animation-related behavior.
- **Production build and GitHub Pages deployment** powered by Parcel and `gh-pages`.

## Technology Stack

| Area                   | Technology                                 |
| ---------------------- | ------------------------------------------ |
| Rendering              | [Three.js](https://threejs.org/)           |
| Language               | Modern JavaScript with ES modules          |
| Bundler and dev server | [Parcel](https://parceljs.org/)            |
| Animation              | [GSAP](https://gsap.com/)                  |
| Testing                | [Vitest](https://vitest.dev/) with JSDOM   |
| Static analysis        | ESLint using the flat configuration format |
| Deployment             | GitHub Pages through `gh-pages`            |
| 3D assets              | GLB models                                 |
| Audio                  | MP3 and WAV assets                         |
| Typography             | Local TTF font assets                      |

## Architecture

The codebase follows a lightweight layered architecture rather than placing the entire experience inside a single entry file.

### Application entry point

`src/main.js` bootstraps the application. It initializes error reporting, the scene manager, asset loading, input handling, sound, HUD, orientation support, raycasting, and the loading screen. World construction and the render loop begin after the required assets have finished loading.

### Core systems

The `src/core` directory contains engine-level services that are independent of the portfolio world wherever possible:

- `AssetManager` loads and exposes models, audio, images, and other resources.
- `SceneManager` owns the Three.js scene, camera, renderer, resize behavior, and render loop.
- `CameraController` translates user input into navigation through the experience.
- `InputManager` normalizes browser input and tracks movement deltas.
- `InteractionManager` coordinates configured interactive targets and actions.
- `RaycasterManager` resolves pointer intersections with 3D objects.
- `SoundManager` manages background music, effects, mute state, and master volume.
- `ErrorReport` and the error classes provide centralized error handling and user-facing failure behavior.

### World composition

The `src/world` directory composes the portfolio environment from reusable world objects. It contains the background, road, frog character, project panels, technical text, 3D text, text management, and the main `World` composition class.

### Three.js infrastructure

The `src/infrastructure/three` directory contains reusable Three.js-specific infrastructure, including asset extension configuration and diorama abstractions. The hero diorama is further decomposed into stage building, animation commands, interruption handling, and the hero character implementation.

### UI infrastructure

The `src/infrastructure/ui` directory contains the loading screen, HUD, orientation handling, and error UI. This keeps browser-facing interaction concerns separate from the 3D world and rendering systems.

### Configuration-driven behavior

The `src/config` directory defines assets, interaction rules, panels, project content, technology text, title configuration, frog triggers, and hero-diorama settings. Moving content and interaction parameters into configuration makes the world easier to extend without changing core engine code.

## Repository Structure

```text
PortfolioSite/
├── src/
│   ├── config/                         # Portfolio content and behavior configuration
│   ├── core/                           # Rendering, assets, input, sound, errors, interaction
│   │   └── errors/
│   ├── infrastructure/
│   │   ├── three/                      # Three.js and diorama infrastructure
│   │   └── ui/                         # Loading, HUD, orientation, and error UI
│   ├── world/                          # 3D portfolio world and world entities
│   ├── index.html                      # Browser entry document
│   ├── main.js                         # Application bootstrap
│   └── styles.css                      # Global presentation styles
├── static/                             # GLB, audio, image, and font assets
├── .parcelrc                           # Parcel asset transformers and static-file reporter
├── eslint.config.mjs                   # ESLint rules and code-quality constraints
├── vitest.config.js                    # Vitest and JSDOM configuration
├── package.json                        # Scripts and dependencies
└── package-lock.json                   # Reproducible dependency lockfile
```

## Requirements

Use the following tools to work with the project locally:

- **Node.js 18 or newer**
- **npm 9 or newer**
- A modern browser with WebGL support

Because the project loads 3D models, audio, and other static assets, it should be run through the Parcel development server or a production static server rather than opened directly with a `file://` URL.

## Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/MarkoVasicDeveloper/PortfolioSite.git
cd PortfolioSite
npm ci
```

For a local development installation where dependencies may need to be resolved without the lockfile, use:

```bash
npm install
```

## Runtime Flow

The application follows this high-level lifecycle:

1. The browser loads the canvas and loading UI.
2. `ErrorReport` is initialized for centralized failure handling.
3. Core managers are created for the scene, assets, input, audio, UI, and raycasting.
4. The asset manager loads configured models, audio, fonts, and images while reporting progress.
5. The user selects **Enter**, allowing the application to request mobile orientation handling and unlock browser audio playback.
6. The world is constructed after assets are ready.
7. The camera, interaction system, and world update inside the render loop.
8. User input drives navigation, object interaction, animation, sound effects, and portfolio exploration.

## Author

**Marko Vasic**

- GitHub: [MarkoVasicDeveloper](https://github.com/MarkoVasicDeveloper)
- Portfolio: [markovasicdeveloper.github.io/PortfolioSite](https://markovasicdeveloper.github.io/PortfolioSite)
