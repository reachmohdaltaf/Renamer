async function renameFiles() {
    const folderPath = document.getElementById("folderPath").value;
    const newExtension = document.getElementById("newExtension").value;
    const messageEl = document.getElementById("message");

    if (!folderPath || !newExtension) {
        messageEl.textContent = "Please enter both folder path and new extension.";
        return;
    }

    const response = await fetch("/rename-files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderPath, newExtension })
    });

    const data = await response.json();
    messageEl.textContent = data.message;
}
