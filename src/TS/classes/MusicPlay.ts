class Music {
    private music: HTMLAudioElement[];
    private current: number;
    private volume: number;
    private muted: boolean;
    private Continue: boolean;
    constructor(music: HTMLAudioElement[]) {
        this.music = music;
        this.current = 0;
        this.volume = 1;
        this.muted = false;
        this.Continue = true;

    }
    public get Current(): HTMLAudioElement {
        return this.music[this.current];
    }
    public get Volume(): number {
        return this.volume;
    }
    public set Volume(value: number) {
        this.volume = value;
        this.music.forEach((value) => {
            value.volume = this.volume;
        });
        this.muted = this.volume == 0;
    }
    public get Muted(): boolean {
        return this.muted;
    }
    public set Muted(value: boolean) {
        this.muted = value;
        this.music.forEach((value) => {
            value.muted = this.muted;
        });
    }
    public play(): void {
        this.stopAll();

        try {
            this.music[this.current].play();
        } catch (DOMException) {
            return;
        }
    }
    public pause(): void {
        this.music[this.current].pause();
    }
    public next(): void {
        this.current = (this.current + 1) % this.music.length;
        this.music[this.current].play();
    }
    public previous(): void {
        this.current = (this.current - 1 + this.music.length) % this.music.length;
        this.music[this.current].play();
    }
    public toggle(): void {
        if (this.music[this.current].paused) {
            this.music[this.current].play();
        } else {
            this.music[this.current].pause();
        }
    }
    public shuffle(): void {
        this.current = randomInt(0, this.music.length - 1);
        this.music[this.current].play();
    }
    public set continue(value: boolean) {
        this.Continue = value;
        if (this.Continue) {
            this.music[this.current].onended = () => {
                this.next();
            };
        }
        else {
            this.music[this.current].onended = () => {
                this.music[this.current].pause();
            };
        }
    }
    public stop(): void {
        this.music[this.current].pause();
        this.music[this.current].currentTime = 0;
    }
    public stopAll(): void {
        this.music.forEach((value) => {
            value.pause();
            value.currentTime = 0;
        });
    }
    //define a function that gets the number of songs currently playing
    public get playing(): number {
        let count = 0;
        this.music.forEach((value) => {
            if (!value.paused) {
                count++;
            }
        });
        return count;
    }
}