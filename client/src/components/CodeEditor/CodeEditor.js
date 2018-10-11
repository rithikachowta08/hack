import React, { Fragment } from "react";

// Import Brace and the AceEditor Component
import AceEditor from "react-ace";

// Import a Mode (language)
import "brace/mode/java";
import "brace/mode/javascript";
import "brace/mode/c_cpp";
import "brace/mode/python";

// Import a Theme (okadia, github, xcode etc)
import "brace/theme/pastel_on_dark";

export default class CodeEditor extends React.Component {
  onChange = newValue => {
    // console.log("change", newValue);
  };

  render() {
    return (
      <Fragment>
        <AceEditor
          mode={this.props.language}
          theme="pastel_on_dark"
          fontSize={16}
          highlightActiveLine={true}
          style={{ textTransform: "none", width: "800px" }}
          onChange={this.onChange}
          name="code-div"
          editorProps={{
            $blockScrolling: false
          }}
        />
      </Fragment>
    );
  }
}
