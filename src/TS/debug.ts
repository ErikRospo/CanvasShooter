function AddDebugItem(value: any, id: string) {
    if (!DEBUGFLAG) {
        return null;
    }
    var node = document.createElement("li");
    node.id = id;
    node.innerText = value.toString()
    node.classList.add("debugItem")
    debugList.appendChild(node);
    return debugList
}
function SetDebugItem(value: any, id: string) {
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
    node.innerText = id.toString() + ": " + value.toString()
    return node
}
AddDebugItem(0, "playerHealth")