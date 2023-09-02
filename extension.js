const vscode = require("vscode");
const axios = require("axios");

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "scholar-search.searchScholar",
    async function () {
      const query = await vscode.window.showInputBox({
        prompt: "Enter your Google Scholar query",
      });

      if (!query) return;

      try {
        const queryParam = encodeURIComponent(query);
        const apiUrl = `https://scholar.google.com/scholar?q=${queryParam}`;

        vscode.env.openExternal(vscode.Uri.parse(apiUrl));
      } catch (error) {
        console.error("Error searching Google Scholar:", error);
        vscode.window.showErrorMessage("Error searching Google Scholar.");
      }
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
