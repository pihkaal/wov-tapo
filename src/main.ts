// yes
const SELECTOR =
  "html > body > div:first-of-type > div > div > div > div > div:first-of-type > div > div > div > div > div > div > div > div > div > div > div:first-of-type > div > div:first-of-type > div:first-of-type > div:nth-of-type(2) > div:first-of-type > div:first-of-type > div > div > div:first-of-type > div";

const interval = setInterval(() => {
  const targetNode = document.querySelector(SELECTOR);
  if (!targetNode) return;

  setTimeout(async () => {
    const observer = new MutationObserver((mutationsList) => {
      const mutation = mutationsList[0];
      if (!mutation || mutation.type !== "characterData") return;

      const content = targetNode.textContent;
      if (!content) return;

      // Day - Discussion
      if (content.includes("Discussion")) {
      }
      // Day - Voting
      else if (content.includes("Voting")) {
      }
      // Night
      else {
      }
    });

    observer.observe(targetNode, {
      characterData: true,
    });
    console.log("observer setup");
  }, 500);

  clearInterval(interval);
}, 1000);
