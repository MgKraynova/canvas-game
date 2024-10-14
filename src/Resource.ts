export type TImage = {
  [key: string]: {
    image: CanvasImageSource;
    isLoaded: boolean;
  };
}

export class Resources {
  toLoad: {
    [key: string]: string;
  };
  images: TImage;

  constructor() {
    this.toLoad = {
      sky: 'sprites/sky.png',
      ground: 'sprites/ground.png',
      hero: 'sprites/hero-sheet.png',
      shadow: 'sprites/shadow.png',
    };

    this.images = {};

    Object.keys(this.toLoad).forEach((key) => {
      const image = new Image();

      image.src = this.toLoad[key];

      // @ts-ignore
      this.images[key] = {
        image,
        isLoaded: false,
      };

      image.onload = () => {
        // @ts-ignore
        this.images[key].isLoaded = true;
      };
    });
  }
}

export const resources = new Resources();
