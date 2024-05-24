import listen from "./stt.js";
import { think, restart, pdf_upload } from "./palmai.js";
import speak from "./visualizer.js";

const EXIT_KEYWORDS = [
  "stop",
  "exit",
  "bye",
  "quit",
  "that's enough",
  "that's all",
];

async function chat(user_message) {
  if (user_message === undefined) {
    user_message = await listen();
  }

  log("User", user_message);

  return new Promise(async (resolve) => {
    if (
      EXIT_KEYWORDS.filter((keyword) =>
        user_message.toLowerCase().includes(keyword)
      ).length > 0
    ) {
      let ai_message = await think(
        `Based on the chat history, I would like you to evaluate the candidate based on the following format:
        Summarization should NOT be on the base of resume but on the basis of the conversation.
                Summarization: summarize the conversation in a short paragraph.
               
                Pros: Give positive feedback to the candidate. 
               
                Cons: Tell the candidate what he/she can improves on.
               
                Score: Give a score to the candidate out of 100.
                s
                Sample Answers: sample answers to each of the questions in the interview guideline.
               
               Remember, the candidate has no idea what the interview guideline is.
               Sometimes the candidate may not even answer the question.
               `
      );
      log("AI", ai_message);
      document.getElementById("inputfield").style.display = "none";
      document.getElementById("visualizer").style.display = "none";
      document.getElementById("outputfield").style.height = "80vh";
      await speak(ai_message);
      // log( "AI", "Alright then, Goodbye!" )
      // await speak( "Alright then, Goodbye!" );
      resolve();
    } else {
      let ai_message = await think(user_message);
      log("AI", ai_message);

      await speak(ai_message);

      chat().then(resolve);
    }
  });
}

function log(speaker, message) {
  if (speaker === "AI") {
    const target = document.querySelector(".output");
    console.log(target);
    target.value = message;
  }

  console.log(`${speaker}:`);
  console.log("------------------------------------------");
  console.log(message);
  console.log("");
}

const startJourney = async () => {
  const shit = async (e) => {
    const key = e.key;

    if (key === "Enter") {
      const response = document.querySelector(".hash").value;
      document.querySelector(".hash").value = "";
      console.log(response);
      if (response.toLowerCase() === "yes") {
        // If yes, proceed with tailored interview
        log("AI", "Great! Please provide your resume.");
        await speak("Great! Please provide your resume.");
        const fileinput = document.getElementById("file");
        fileinput.click();
      } else {
        // If no, proceed with standard interview'
        log("AI", "Alright, let's proceed with the standard interview.");
        await speak("Alright, let's proceed with the standard interview.");
        document.querySelector(".hash").removeEventListener("keydown", shit);
        // Start the interview
        await main();
      }
    }
  };

  const shit2 = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const resp = await pdf_upload(
        file,
        "This is the candidate's resume, you can ask questions on the basis of this but don't judge on it's basis. REMEMBER WHEN I ASK YOU THE SUMMARY AT THE END DON'T JUDGE ON THE BASIS OF THIS RESUME"
      );
      document.querySelector(".hash").removeEventListener("keydown", shit);
      await main(resp.ai_message);
    } else {
      console.log("jai shree ram");
    }
  };

  document.getElementById("file").addEventListener("change", shit2);
  document.querySelector(".hash").addEventListener("keydown", shit);
  await restart();

  log(
    "AI",
    "Hello, Welcome to Hash IQ. Would you like the interview tailored to your resume? Please respond with 'yes' or 'no'."
  );
  await speak(
    "Hello, Welcome to Hash IQ. Would you like the interview tailored to your resume? Please respond with 'yes' or 'no'."
  );
};

async function main(
  msg = "Hey. What would you like to Interview on?"
) {
  let ai_message = msg;
  log("AI", msg);
  await speak(ai_message);

  // ai_message = await think("i'm ready");
  // log( "AI", ai_message );
  // await speak( ai_message );

  document.querySelector(".hash").addEventListener("keydown", async (e) => {
    const key = e.key;

    if (key === "Enter") {
      const text = document.querySelector(".hash").value;
      document.querySelector(".hash").value = "";
      console.log(text);
      await chat(text);
    }
  });

  await chat();
}

// setTimeout(main, 1000);

window.onload = startJourney;
