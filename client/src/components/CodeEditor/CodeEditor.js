import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setCode } from "../../actions/codeActions";
// Import Brace and the AceEditor Component
import AceEditor from "react-ace";

// Import a Mode (language)
import "brace/mode/java";
import "brace/mode/javascript";
import "brace/mode/c_cpp";
import "brace/mode/python";

// Import a Theme (okadia, github, xcode etc)
import "brace/theme/pastel_on_dark";

class CodeEditor extends Component {
  state = {};

  onChange = newValue => {
    this.props.setCode(newValue);
  };

  render() {
    return (
      <Fragment>
        <AceEditor
          value={this.props.code}
          mode={this.props.language}
          theme="pastel_on_dark"
          fontSize={16}
          highlightActiveLine={true}
          style={{ textTransform: "none", width: "500px" }}
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

const mapStateToProps = state => ({
  code: state.code.currentCode
});

export default withRouter(
  connect(
    mapStateToProps,
    { setCode }
  )(CodeEditor)
);
