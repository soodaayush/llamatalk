let prompt = document.getElementById("prompt");
let answerBox = document.getElementById("answer");
let submit = document.getElementById("submit");

console.log(prompt);

submit.addEventListener("click", submitPrompt);

let parsedResponses = [];

async function submitPrompt() {
  answer.textContent = "";

  let modelObj = { model: "llama2:13b", prompt: prompt.value };

  let data = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    body: JSON.stringify(modelObj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let responseText = await data.text();

  // Split the response into individual JSON objects
  let responseArray = responseText.split("\n");

  // Remove empty strings from the array
  responseArray = responseArray.filter((item) => item.trim() !== "");

  // Parse each JSON object and filter out objects with response "\n"
  let parsedResponses = responseArray
    .map((response) => JSON.parse(response))
    .filter((parsedObj) => parsedObj.response !== "\n");

  printAnswer(parsedResponses);
}

function printAnswer(answer) {
  for (let i = 0; i < answer.length; i++) {
    answerBox.textContent += answer[i].response;
  }
}
