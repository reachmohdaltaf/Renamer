const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve frontend files

// API to change only the file extension
app.post("/rename-files", (req, res) => {
    const { folderPath, newExtension } = req.body;

    if (!folderPath || !newExtension) return res.status(400).json({ message: "Folder path and new extension are required" });

    try {
        const files = fs.readdirSync(folderPath);
        files.forEach((file) => {
            const oldPath = path.join(folderPath, file);
            const fileExt = path.extname(file);
            const fileName = path.basename(file, fileExt); // Keep original filename
            const newExt = `.${newExtension.replace(".", "")}`; // Ensure correct format
            const newPath = path.join(folderPath, `${fileName}${newExt}`);

            fs.renameSync(oldPath, newPath);
        });

        res.json({ message: "File extensions changed successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error renaming files", error });
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
