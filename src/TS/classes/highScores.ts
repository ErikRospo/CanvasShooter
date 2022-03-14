class HighScore {
    scores: number[]
    constructor() {
        this.scores = [];
    }
    addScore(score: number): void {
        if (score != 0) this.scores.push(score);
        this.sort();
    }
    sort() {
        this.scores.sort((a: number, b: number) => a - b);
        this.scores.reverse();
    }
    public get Html(): string {
        let ScoreElement = document.createElement("ol");
        this.sort();
        for (let index = 0; index < Math.min(this.scores.length, 10); index++) {
            const element = this.scores[index];
            var node = document.createElement("li");
            switch (index) {
                case 0:
                    node.style.color = "#ffd700"
                    node.appendChild(document.createTextNode(element.toString(10)));
                    break;
                case 1:
                    node.style.color = "#c0c0c0"
                    node.appendChild(document.createTextNode(element.toString(10)));
                    break;
                case 2:
                    node.style.color = "#CD7F32"
                    node.appendChild(document.createTextNode(element.toString(10)));
                    break;
                default:
                    node.appendChild(document.createTextNode(element.toString(10)));
                    break;
            }
            // node.appendChild(document.createTextNode(element.toString(10)));


            ScoreElement.appendChild(node)
        }
        return ScoreElement.innerHTML
    }
}