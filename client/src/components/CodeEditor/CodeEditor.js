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
import "brace/mode/php";
import "brace/mode/python";
import "brace/theme/monokai";

class CodeEditor extends Component {
  state = {};

  onChange = newValue => {
    let templateString = `${newValue}`;
    this.props.setCode(templateString);
  };

  render() {
    return (
      <Fragment>
        <AceEditor
          value={this.props.code}
          mode={this.props.language}
          theme="monokai"
          fontSize={16}
          highlightActiveLine={true}
          style={{ textTransform: "none", width: "700px", height: "700px" }}
          onChange={this.onChange}
          name="code-div"
          editorProps={{
            $blockScrolling: Infinity
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
