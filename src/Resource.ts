class Resources {
    constructor() {
        this.toLoad = {
            "sky": '../public/sprites/sky.png',
            "ground": '../public/sprites/ground.png',
            "hero": '../public/sprites/hero.png',
            "shadow": '../public/sprites/shadow.png',
        }

        this.images = {}

        Object.keys(this.toLoad).forEach((key) => {
            const image = new Image();

            image.src = this.toLoad[key];

            this.images[key] = {
                image,
                isLoaded: false
            };

            image.onload = () => {
                this.images[key].isLoaded = true;
            }
        })
    }
}