
function SetHealthICONs(health:number,MaxHealth?:number|5) {
    /*
        <span style="line-height: 24pt;">Health:</span>
        <span class="material-icons">favorite</span>
        <span class="material-icons">favorite</span>
        <span class="material-icons">favorite</span>
        <span class="material-icons">favorite</span>
        <span class="material-icons">favorite_border</span> 
     */
    let outElem=document.createElement("div");
    let CdivElem=document.getElementById("HealthDiv");
    let LabelText=document.createElement("span");
    console.log(CdivElem)
    LabelText.innerText="Health";
    outElem.appendChild(LabelText)
    for (let index = 0; index < MaxHealth; index++) {
        let healthElem=document.createElement("span")
        healthElem.classList.add("material-icons");
        healthElem.style.color="red"
        if (index<health){
            healthElem.innerText="favorite";
        }else{
            healthElem.innerText="favorite_border"
        }
        outElem.appendChild(healthElem)
    }
    for (let index = 0; index < CdivElem.children.length; index++) {
        CdivElem.removeChild(CdivElem.children.item(index))
    }   
    for (let index = 0; index < outElem.children.length; index++) {
        CdivElem.appendChild(outElem.children.item(index))
    }
    console.log(CdivElem)
    outElem.remove();
    LabelText.remove();
}