import React from 'react';
import PropTypes from 'prop-types';

// Import Brace and the AceEditor Component
import brace from 'brace';
import AceEditor from 'react-ace';
// Import a Mode (language)
import 'brace/mode/java';
// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/monokai';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/theme/terminal';
import 'brace/theme/xcode';
import 'brace/theme/twilight';
import 'brace/theme/textmate';
import 'brace/theme/xcode';
import 'brace/theme/twilight';
import 'brace/theme/textmate';
import 'brace/theme/kuroir';
import 'brace/theme/tomorrow';
import 'brace/theme/textmate';
import 'brace/theme/github';
import { useEffect, useState } from 'react';



const editorStyle = {
  border: '1px solid lightgray',
};

class CodeEditor extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      themeVariable: "github",

    };

    //const [themeVariable,setthemeVariable] = useState("solarized_dark");

    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
   
    
  }
  

  handleChange(event) { 

       this.setState({themeVariable: event.target.value});  
       console.log("/n New Theme: "+this.state.themeVariable+"\n");
       
      }

  onChange(newValue) {
    this.props.onChange(newValue);
    
  }

  

  render() {
    return (
      <div>
        <div class="field">
          <label>Theme:</label>
          <p class="control">
            <span class="select">
              <select name="Theme"  onChange={this.handleChange}>
                <option value="github">github</option>
                <option value="monokai">monokai</option>
                <option value="tomorrow">tomorrow</option>
                <option value="kuroir">kuroir</option>
                <option value="twilight">twilight</option>
                <option value="xcode">xcode</option>
                <option value="textmate">textmate</option>
                <option value="solarized_dark">solarized_dark</option>
                <option value="solarized_light">solarized_light</option>
                <option value="terminal">terminal</option>
              </select>
            </span>
          </p>
      </div>
      <AceEditor
        style={editorStyle}
        readOnly={false}
        onChange={this.onChange}
        width="100%"
        height="200px"
        mode="java"
        theme= {this.state.themeVariable}
        name="aceCodeEditor"
        // onLoad={this.onLoad}
        fontSize={14}
        showPrintMargin
        showGutter
        highlightActiveLine
        value={this.props.code}
        editorProps={{
          $blockScrolling: true,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        setOptions={{
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
        </div>
    );
  }
}

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CodeEditor;
