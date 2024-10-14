import './style.css';
import { resources } from './Resource.ts';
import { Sprite } from './Sprite.ts';
import { Vector2 } from './Vector2.ts';

const canvas: HTMLCanvasElement | null = document.querySelector('#canvas-game');
const ctx = canvas?.getContext('2d');

const skySprite =
  'sky' in resources.images
    ? new Sprite({
        resource: resources.images.sky,
        frameSize: new Vector2(320, 180),
      })
    : null;

const groundSprite =
  'ground' in resources.images
    ? new Sprite({
        resource: resources.images.ground,
        frameSize: new Vector2(320, 180),
      })
    : null;

const heroSprite =
  'hero' in resources.images
    ? new Sprite({
        resource: resources.images.hero,
        frameSize: new Vector2(32, 32),
        vFrames: 3,
        hFrames: 8,
        frame: 1,
      })
    : null;

const draw = () => {
  if (ctx) {
    if (skySprite) {
      skySprite.drawImage({
        ctx,
        x: 0,
        y: 0,
      });
    }

    if (groundSprite) {
      groundSprite.drawImage({
        ctx,
        x: 0,
        y: 0,
      });
    }

    if (heroSprite) {
      const heroPos = new Vector2(16 * 5, 16 * 5);
      heroSprite.drawImage({
        ctx,
        x: heroPos.x,
        y: heroPos.y,
      });
    }
  }
};

setInterval(() => {
  draw();
}, 300);
