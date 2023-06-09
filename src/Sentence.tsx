import * as React from 'react';

export function Sentence({ text }) {
  if (text.startsWith('Interlocutor')) {
    return (
      <li className="interlocutor">
        <span>{text.substr(13)}</span>
      </li>
    );
  } else if (text.startsWith('Molly  (to herself)')) {
    return (
      <li className="molly_to_herlself">
        <span>{text.substr(20)}</span>
      </li>
    );
  } else if (text.startsWith('Molly (to herself)')) {
    return (
      <li className="molly_to_herself">
        <span>{text.substr(19)}</span>
      </li>
    );
  } else if (text.startsWith('Molly (to myself)')) {
    return (
      <li className="molly_to_herself">
        <span>{text.substr(18)}</span>
      </li>
    );
  } else {
    return (
      <li className="molly">
        <span>{text.substr(6)}</span>
      </li>
    );
  }
}
