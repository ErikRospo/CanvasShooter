function AddDebugItem(value: any, id: string) {
    if (!DEBUGFLAG) {
        return null;
    }
    var node = document.createElement("li");
    node.id = id;
    node.innerText = id + ": " + value.toString()

    node.classList.add("debugItem")
    debugList.appendChild(node);
    return debugList
}
function SetDebugItem(value: any, id: string, label?: string) {
    if (!DEBUGFLAG) {
        return null;
    }
    var node = document.getElementById(id);
    if (node == null) {
        AddDebugItem(value, id);
        node = document.getElementById(id);
    }
    if (node == null) {
        return null;
    }
    if (label == undefined || label == null) {
        label = id;
    }
    node.innerText = label + ": " + value.toString()
    return node
}
AddDebugItem(0, "playerHealth");
AddDebugItem(innerWidth, "indowWidth");
AddDebugItem(innerHeight, "windowHeight");
AddDebugItem(innerHeight * innerWidth, "WindowArea");
AddDebugItem(1 / (innerHeight * innerWidth), "ReciprocalWindowArea");
AddDebugItem(url, "Url");