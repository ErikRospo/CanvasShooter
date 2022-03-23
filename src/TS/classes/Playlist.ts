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
    shuffle(current?: HTMLAudioElement) {
        let toplay = randomChoiceNot(this.songs, [current]) as HTMLAudioElement
        toplay.play()
    }
    public set ContinuePlaying(v: boolean) {
        const ShuffleAfter = (event: Event) => {
            this.shuffle(event.target as HTMLAudioElement)
        };
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