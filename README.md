# Recoil Command

[https://proctectorb.vercel.app/](https://proctectorb.vercel.app/)
Recoil Command was inspired by Missile Command, an Atari game released in 1980.

Recoil Command sees users firing their missiles at incoming missiles in order to defend their blue base. When the line is hit by the incoming missiles the players loses points. Though if the player destroys the missiles they will gain points and destroy the incoming missile. Though keep track of your yellow power bar! Without it you can't shoot.

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

### Takeaways

While recoil.js is very impressive, and when used properly can save a lot of excess rendering, I find it difficult to think it is some magic bullet which now opens the gates for JS game development. Though I can definitely see it having a future in other use cases where lots of elements are required to be rendered at once, acting independently.

Though it will be interesting to watch how efficient this project becomes over time as Recoil.js is updated, I will attempt to stay on top of coming updates to monitor the efficiency gains and will log them here.

As of writing, recoil.js is currently on version 0.0.10, and Recoil-Command is using that latest version.
