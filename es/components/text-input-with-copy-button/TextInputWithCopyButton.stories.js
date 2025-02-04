import * as React from 'react';
import TextInputWithCopyButton from './TextInputWithCopyButton';
import notes from './TextInputWithCopyButton.stories.md';
export var example = function example() {
  return React.createElement(TextInputWithCopyButton, {
    label: "Copy this",
    value: "https://www.box.com/platform",
    buttonDefaultText: "Copy",
    buttonSuccessText: "Copied",
    type: "url"
  });
};
export default {
  title: 'Components|TextInputWithCopyButton',
  component: TextInputWithCopyButton,
  parameters: {
    notes: notes
  }
};
//# sourceMappingURL=TextInputWithCopyButton.stories.js.map