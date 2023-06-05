import * as React from "react";
import "./style.css";

import { Welcome } from "./Welcome";
import { Discussion } from "./Discussion";

export function App() {
  const [openAIKey, setOpenAIKey] = React.useState<string>();

  return openAIKey ? (
    <Discussion openAIKey={openAIKey} />
  ) : (
    <Welcome setOpenAIKey={setOpenAIKey} />
  );
}
