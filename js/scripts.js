let prompt = document.getElementById("prompt");
let answerBox = document.getElementById("answer");
let submit = document.getElementById("submit");

submit.addEventListener("click", submitPrompt);

let parsedResponses = [];

async function submitPrompt() {
  if (prompt.value === "") {
    alert("Please input a prompt");
    return;
  }

  answerBox.value = "Loading...";

  let modelObj = { model: "codellama:13b", prompt: prompt.value };

  let data = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    body: JSON.stringify(modelObj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let responseText = await data.text();

  let responseArray = responseText.split("\n");

  responseArray = responseArray.filter((item) => item.trim() !== "");

  let parsedResponses = responseArray
    .map((response) => JSON.parse(response))
    .filter((parsedObj) => parsedObj.response !== "\n");

  printAnswer(parsedResponses);
}

function printAnswer(answer) {
  answerBox.value = "";

  for (let i = 0; i < answer.length; i++) {
    answerBox.value += answer[i].response;
  }
}
