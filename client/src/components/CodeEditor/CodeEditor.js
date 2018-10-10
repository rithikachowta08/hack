import React from "react";

// Import Brace and the AceEditor Component
import AceEditor from "react-ace";

// Import a Mode (language)
import "brace/mode/java";

// Import a Theme (okadia, github, xcode etc)
import "brace/theme/github";

export default class CodeEditor extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  onChange = newValue => {
    console.log("change", newValue);
  };

  render() {
    return (
      <div>
        <AceEditor
          mode="javascript"
          theme="monokai"
          fontSize={16}
          highlightActiveLine={true}
          style={{ textTransform: "none" }}
          onChange={this.onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{
            $blockScrolling: false
          }}
        />
      </div>
    );
  }
}