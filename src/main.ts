import './style.css';
import { resources } from './Resource.ts';
import { Sprite } from './Sprite.ts';
import { Vector2 } from './Vector2.ts';
import { GameLoop } from './GameLoop.ts';
import { DOWN, Input, LEFT, RIGHT, UP } from './Input.ts';

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
        vFrames: 8,
        hFrames: 3,
        frame: 1,
      })
    : null;

const shadowSprite =
  'shadow' in resources.images
    ? new Sprite({
        resource: resources.images.shadow,
        frameSize: new Vector2(32, 32),
      })
    : null;

const input = new Input();

// сдвигаем героя на 5 клеток
const heroPos = new Vector2(16 * 6, 16 * 5);

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
      // но герой находится не по середине клетки, т к вокруг есть прозрачный фон
      const heroOffset = new Vector2(-8, -21);
      const heroPosX = heroPos.x + heroOffset.x;
      const heroPosY = heroPos.y + heroOffset.y;

      heroSprite.drawImage({
        ctx,
        x: heroPosX,
        y: heroPosY,
      });

      if (shadowSprite) {
        shadowSprite.drawImage({
          ctx,
          x: heroPosX,
          y: heroPosY,
        });
      }
    }
  }
};

const update = () => {
  if (!heroSprite) {
    return;
  }
  if (input.direction === DOWN) {
    heroPos.y += 1;
    heroSprite.frame = 0;
  }

  if (input.direction === UP) {
    heroPos.y -= 1;
    heroSprite.frame = 6;
  }

  if (input.direction === LEFT) {
    heroPos.x -= 1;
    heroSprite.frame = 9;
  }
  if (input.direction === RIGHT) {
    heroPos.x += 1;
    heroSprite.frame = 3;
  }
};

// setInterval(() => {
//   draw();
// }, 300);

const gameLoop = new GameLoop({ update, render: draw });
gameLoop.start();
