import { happensIn } from "./happens-in";

describe("# happensIn", () => {
  it("works", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    div.innerHTML = `<div id="container-1" data-test><div id="click-target1"></div></div><div id="click-target2"></div>`;
    const target1 = document.getElementById("click-target1");
    const target2 = document.getElementById("click-target2");
    document.addEventListener("click", (e) => {
      if (e.target === target1) {
        expect(happensIn(e, "test")).toEqual(true);
      }
      if (e.target === target2) {
        expect(happensIn(e, "test")).toEqual(false);
      }
    });
    target1?.click();
    target2?.click();
  });
});
