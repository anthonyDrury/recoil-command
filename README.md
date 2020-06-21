# Protectorb

[https://proctectorb.vercel.app/](https://proctectorb.vercel.app/)
Protectorb was inspired by Missile Command, an Atari game released in 1980.

Protectorb sees users firing blue orbs at incoming red orbs in order to defend their blue line. When the line is hit by the incoming red orbs the players loses points. Though if the player hits the red orbs they will gain points and destroy both blue and red orb. Though keep track of your yellow power bar! Without it you can't shoot.

## Developing locally

In the project directory, you can install with your preferred package manager like:

### `yarn|npm install`

Installs necessary packages for local development and execution.

### `yarn|npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Technical breakdown

This project was mostly developed as an experiment for trying the experimental state management [recoil.js by facebook](https://github.com/facebookexperimental/Recoil/blob/master/README.md). The fact that components only re-render when the data they are subscribed to changes made me think it could potentially be valuable in JS game development.

The project worked a lot better than I initially believed. With the project being able to run fairly well even when I was rendering all visible items new positions every 50ms.

To improve efficiency, when an item moves out of view it is no longer rendered by react and the rendering function does not take them into account. Though the `atom` still exists, as currently there is no way to delete atoms. This would mean there is a memory leak, and theoretically if the player plays for a long time the applications performance will dwindle.
