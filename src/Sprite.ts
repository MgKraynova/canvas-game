import { Vector2 } from './Vector2.ts';

type TProps = {
  resource: {
    image: CanvasImageSource;
    isLoaded: boolean;
  };
  frameSize: Vector2;
  hFrames?: number;
  vFrames?: number;
  frame?: any;
  scale?: number;
  position?: Vector2;
};

export class Sprite {
  resource: {
    image: CanvasImageSource;
    isLoaded: boolean;
  };
  frame: number;
  frameSize: Vector2;
  vFrames: number;
  scale: number;
  position: Vector2;
  hFrames: number;
  frameMap: any;

  constructor({ resource, frameSize, hFrames, vFrames, frame, scale, position }: TProps) {
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16, 16);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0, 0);
    this.frame = frame ?? 0;
    this.frameMap = new Map();

    this.buildFrameMap();
  }

  buildFrameMap() {
    let frameCount = 0;

    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          new Vector2(this.frameSize.x * h, this.frameSize.y * v),
        );
        frameCount++;
      }
    }
  }

  drawImage({ ctx, x, y }: { ctx: CanvasRenderingContext2D; x: number; y: number }) {
    if (!this.resource.isLoaded) {
      return;
    }

    let frameCoordinateX = 0;
    let frameCoordinateY = 0;

    const frame = this.frameMap.get(this.frame);

    if (frame) {
      frameCoordinateX = frame.x;
      frameCoordinateY = frame.y;
    }

    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    ctx.drawImage(
      this.resource.image,
      frameCoordinateX,
      frameCoordinateY, // Top Y corner of frame
      frameSizeX, // how much to crop from the sprite sheet (x)
      frameSizeY, // how much to crop from the sprite sheet (y)
      x, // where to place this on canvas tag x
      y, // where to place this on canvas tag y
      frameSizeX * this.scale, // how large to scale it (x)
      frameSizeY * this.scale, // how large to scale it (y)
    );
  }
}
