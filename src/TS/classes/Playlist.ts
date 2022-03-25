class MusicPlayer {
    songs: HTMLAudioElement[]
    tracknum: number;
    constructor() {
        this.songs = [Music1, Music2, Music3, Music4, Music5];
        this.tracknum = 0;
    }

    public get track(): number {
        return this.tracknum
    }

    public set track(v: number) {
        this.tracknum = v;
        this.play(this.tracknum)
    }
    public get trackAudio(): HTMLAudioElement {
        return this.songs[this.tracknum]
    }
    AddTrack(v: HTMLAudioElement) {
        this.songs.push(v);
    }
    play(i: number) {
        this.songs.forEach(element => {
            element.pause()
            element.currentTime = 0;
        });
        this.songs[i].play()
    }
    stopAll() {
        this.songs.forEach(element => {
            element.pause();
            element.currentTime = 0;
        })
    }
    restartAll() {
        this.songs.forEach(element => {
            element.currentTime = 0;
        })
    }
    /**
     * @param {number} v: volume to set to. must be between 0 and 1
     */
    public set volume(v: number) {
        this.songs.forEach(element => {
            element.volume = v
        })
    }
    shuffle(current?: HTMLAudioElement) {
        let toplay = randomChoiceNot(this.songs, [current]) as HTMLAudioElement
        toplay.play()
        this.tracknum = this.songs.indexOf(toplay);
    }
    public set ContinuePlaying(v: boolean) {
        const ShuffleAfter = (event: Event) => {
            console.log(event)
            this.shuffle(event.target as HTMLAudioElement)
        };
        console.log(this)
        if (v) {
            this.songs.forEach(element => {
                element.addEventListener("onended", ShuffleAfter);
            });
        } else {
            this.songs.forEach((element) => {
                element.removeEventListener("onended", ShuffleAfter);
            })
        }
    }
}