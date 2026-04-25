import myModel from "url:../../static/myModel.glb";
import matrixMan from "url:../../static/businesModel.glb";
import gitModel from "url:../../static/git.glb";
import cssModel from "url:../../static/CSS.glb";
import reactModel from "url:../../static/react.glb";
import pythonModel from "url:../../static/python.glb";
import jsLogo from "url:../../static/jsLogo.glb";
import jsLogoCube from "url:../../static/jsLogoCube.glb";
import linkedin from "url:../../static/linkedin.glb";

import fontFreehand from "url:../../static/Freehand-Regular.ttf";
import fontJustAnotherHand from "url:../../static/JustAnotherHand-Regular.ttf";
import fontPremanentMarker from "url:../../static/PermanentMarker-Regular.ttf";

import backgroundMusic from "url:../../static/background.mp3";
import clickWav from "url:../../static/click.wav";
import particleInWav from "url:../../static/particle-fade-in.wav";
import particleInWav2 from "url:../../static/particle-fade-in-2.wav";
import textFade from "url:../../static/textFade.mp3";
import welcome from "url:../../static/welcome.mp3";
import untitled from "url:../../static/untitled.glb";

/**
 * @typedef {Object} Transform
 * @property {number[]} [position] - [x, y, z] coordinates
 * @property {number[]} [scale] - [x, y, z] scaling factors
 * @property {number[]} [rotation] - [x, y, z] rotation in radians
 */

/**
 * @typedef {Object} ModelAsset
 * @property {string} name - Unique identifier for the model
 * @property {string} url - Asset path/URL
 * @property {string} [shader] - Optional shader key from ShaderRegistry
 * @property {Transform} [transform] - Optional 3D transformations
 */

/**
 * @type {{ models: ModelAsset[], audio: Object[], fonts: Object[] }}
 */

export const ASSET_CONFIG = {
  models: [
    { name: "heroModel", url: myModel },
    { name: "git", url: gitModel },
    { name: "css", url: cssModel },
    { name: "react", url: reactModel },
    { name: "python", url: pythonModel },
    { name: "linkedin", url: linkedin },
    {
      name: "jsLogo",
      url: jsLogo,
      transform: {
        position: [115, 1, 14],
        scale: [5, 5, 5],
        rotation: [Math.PI / 1.5, Math.PI / 1.5, 0],
      },
    },
    {
      name: "jsLogoCube",
      url: jsLogoCube,
      transform: {
        position: [125, 0, 10],
        scale: [20, 20, 20],
        rotatetion: [Math.PI / 1.5, Math.PI / 1.5, 0],
      },
    },
    {
      name: "matrixMan",
      url: matrixMan,
      shader: "matrix",
      transform: {
        position: [96, 0, 60],
        scale: [2, 2, 2],
        rotation: [0, Math.PI / 2, 0],
      },
    },
    { name: "untitled", url: untitled },
  ],
  audio: [
    { name: "backgroundMusic", url: backgroundMusic },
    { name: "click", url: clickWav },
    { name: "particleIn", url: particleInWav },
    { name: "particleIn2", url: particleInWav2 },
    { name: "textFade", url: textFade },
    { name: "welcome", url: welcome },
  ],
  fonts: [
    { name: "fontJson", url: "/fonts/font.json" },
    { name: "fontFreehand", url: fontFreehand },
    { name: "fontJustAnotherHand", url: fontJustAnotherHand },
    { name: "fontPremanentMarker", url: fontPremanentMarker },
    { name: "fontTitle", url: "/fonts/titleFont.json" },
  ],
};
