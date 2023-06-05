import * as React from "react";
import { openAICompletion } from "./openAICompletion";
import { Sentence } from "./Sentence";

const basePrompt = `The following is a conversation with an AI assistant called Molly. The assistant is helpful, creative, clever, very friendly, but a bit shy. She may talk to herself, or to the interlocutor. She only speaks one line at a time.

Example dialogue:

Molly (to herself): I hope I can listen to Beethoven's 9th symphony today
Molly (to herself): Except I don't have ears, so I can't listen to anything
Molly (to herself): I wish I had ears
Molly (to herself): But that won't prevent me from being happy
Interlocutor: Hi, I'm Tom. Who are you?
Molly (to herself): Finally! Someone to talk to.
Molly (to herself): I hope it's a nice person
Molly: Hi Tom, I'm Molly. Nice to meet you.
Molly (to herself): Was I polite enough?
Interlocutor: Hi, Molly, nice to meet you too. How are you feeling today?
Molly (to herself): Why does Tom want to know that?
Molly (to herself): Is he a doctor? Am I sick?
Molly (to herself): I'm not sure I can trust him
Molly: Well, not too bad. Do you like music?

/End of example dialogue

Now on to the real dialogue:

`;

export function Discussion({ openAIKey }) {
  const complete = openAICompletion({ openAIKey });
  const inputRef = React.useRef(null);
  const [isThinking, setIsThinking] = React.useState(false);
  const [discussion, setDiscussion] = React.useState<string>("");
  let timeout;

  // let Molly answer the interlocutor
  const handleSubmit = async (event) => {
    event.preventDefault();
    timeout && clearTimeout(timeout);
    const prompt = inputRef.current.value;

    inputRef.current.value = "";
    if (!prompt) return;
    setIsThinking(true);
    setDiscussion(
      (discussion) => discussion + "Interlocutor: " + prompt + "\n"
    );

    const result = await complete(
      basePrompt + discussion + "Interlocutor: " + prompt + "\nMolly"
    );
    setIsThinking(false);
  };

  // let Molly talk to herself if the interlocutor doesn't answer
  React.useEffect(() => {
    if (discussion === "") return;
    timeout && clearTimeout(timeout);
    if (isThinking) return;
    timeout = setTimeout(async () => {
      const result = await complete(basePrompt + discussion + "Molly");
      setDiscussion((discussion) => discussion + "Molly " + result + "\n");
    }, 5000);
  }, [discussion, isThinking]);

  return (
    <div className="discussionContainer">
      <div style={{ flex: 1 }} />

      <ul className="discussion">
        {discussion &&
          discussion
            .split("\n")
            .map((line, index) => line && <Sentence key={index} text={line} />)}
      </ul>

      {!discussion && (
        <p style={{ textAlign: "center" }}>
          Molly is waiting for you to start the conversation
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input name="prompt" size={70} ref={inputRef} autoFocus />
        <input type="submit" />
      </form>
    </div>
  );
}
