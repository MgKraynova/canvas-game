type TProps = {
  render: () => void;
  update: (timeStep: number) => void;
};

export class GameLoop {
  render: () => void;
  update: (timeStep: number) => void;
  accumulatedTime: number;
  lastFrameTime: number;
  timeStep: number;
  rafId: null | number;
  isRunning: boolean;

  constructor({ update, render }: TProps) {
    this.update = update;
    this.render = render;

    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.timeStep = 1000/60; // 60 frames per second

    // request animation frame id
    this.rafId = null;
    this.isRunning = false; // is loop running
  }

  mainLoop = (timestamp: number) => {
    if (!this.isRunning) {
      return;
    }

    // сколько времени прошло с момента последнего вызова этой функции
    const deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    this.accumulatedTime += deltaTime;

    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep);
      this.accumulatedTime -= this.timeStep;
    }

    this.render();

    // без requestAnimationFrame анимация будет происходить слишком часто, и будет нехватка памяти
    this.rafId = requestAnimationFrame(this.mainLoop);
  }

  start = () => {
    if (!this.isRunning) {
      this.isRunning = true;
      this.rafId = requestAnimationFrame(this.mainLoop);
    }
  }

  stop = () => {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
      this.isRunning = false;

  }
}
