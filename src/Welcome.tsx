import * as React from 'react';

export function Welcome({ setOpenAIKey }) {
  const inputRef = React.useRef(null);
  const handleSubmit = () => {
    const key = inputRef.current.value;
    if (!key) return;
    setOpenAIKey(key);
  };
  return (
    <div className="welcome">
      <form onSubmit={handleSubmit}>
        <h1>Molly, the Artificial Conciousness</h1>
        <p>Enter your OpenAI API Key</p>
        <input name="openai_key" ref={inputRef} size={53} />
        <input type="submit" />
        <p style={{ color: 'grey', fontSize: '0.8em' }}>
          Don't be afraid, it's only sent from your browser to the OpenAI API
        </p>
      </form>
    </div>
  );
}
