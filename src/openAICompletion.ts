const DEFAULT_PARAMS = {
  model: 'text-davinci-003',
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};

export function openAICompletion({ openAIKey }) {
  return async function query(prompt) {
    const params = { ...DEFAULT_PARAMS, prompt };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(openAIKey),
      },
      body: JSON.stringify(params),
    };
    const response = await fetch(
      'https://api.openai.com/v1/completions',
      requestOptions
    );
    const data = await response.json();
    const completion = data.choices[0].text;
    return (
      completion
        // keep only the first line, as Molly sometimes does questions and answers
        .split('\n')[0]
        // remove leading and trailing spaces
        .trim()
        // remove leading column
        .replace(/^\:/, '')
    );
  };
}
