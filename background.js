chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension IA Résumeur installée ✅");
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => alert("Extension IA activée sur cette page !")
  });
});
