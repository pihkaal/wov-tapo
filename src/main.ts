import axios from "axios";

// yes
const SELECTOR =
  "html > body > div:first-of-type > div > div > div > div > div:first-of-type > div > div > div > div > div > div > div > div > div > div > div:first-of-type > div > div:first-of-type > div:first-of-type > div:nth-of-type(2) > div:first-of-type > div:first-of-type > div > div > div:first-of-type > div";

const interval = setInterval(() => {
  const targetNode = document.querySelector(SELECTOR);
  if (!targetNode) return;

  setTimeout(async () => {
    const password = await axios
      .post("http://localhost:6670/login", {
        // Nothing to steal here sorry
        password: "4c02/Sq7fkNkkZh3EKMe4b1fynEavVuhOn1DFleHVvo=",
      })
      .then((x) => x.data);
    const device = "bedroom-lights";

    const makeRequest = async (action: string, query?: string) => {
      await axios.get(
        `http://localhost:6670/actions/l920/${action}?device=${device}${query === undefined ? "" : `&${query}`}`,
        {
          headers: {
            Authorization: `Bearer ${password}`,
          },
        },
      );
    };

    await makeRequest("on");

    let state = true;

    const observer = new MutationObserver(async (mutationsList) => {
      console.log(mutationsList);

      const mutation = mutationsList[0];
      if (!mutation || mutation.type !== "characterData") return;

      const content = targetNode.textContent;
      if (!content) return;

      // Day - Discussion
      if (content.includes("Discussion")) {
        console.log("Discussion");
        if (!state) {
          await makeRequest("on");
          state = true;
        }

        await makeRequest("set-color", "color=LightSkyBlue");
      }
      // Day - Voting
      else if (content.includes("Voting")) {
        console.log("Voting");
        if (!state) {
          await makeRequest("on");
          state = true;
        }

        await makeRequest("set-color", "color=Tomato");
      }
      // Night
      else {
        console.log("Night");
        if (state) {
          await makeRequest("off");
          state = false;
        }
      }
    });

    observer.observe(targetNode, {
      characterData: true,
      subtree: true,
    });
    console.log(targetNode);
    console.log("observer setup");
  }, 500);

  clearInterval(interval);
}, 1000);
