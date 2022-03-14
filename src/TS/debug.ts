function AddDebugItem(value: any, id: string) {
    var node = document.createElement("li");
    node.id = id;
    node.innerText = value.toString()
    node.classList.add("debugItem")
    debugList.appendChild(node);
    return debugList
}
function SetDebugItem(value: any, id: string) {
    var node = document.getElementById(id)
    node.innerText = id.toString() + ": " + value.toString()
    return node
}
AddDebugItem(0, "playerHealth")