import React from 'react';
import { Form, FormGroup, Col, Button } from 'react-bootstrap';
import LangSelector from './controls/LangSelector';
import CodeEditor from './controls/CodeEditor';
import AlertDismissable from './controls/AlertDismissable';
import OutputBox from './controls/OutputBox';
import StatusImage from './controls/StatusImage';
import CompilerApi from '../api/CompilerApi';
import { ButtonToolbar } from 'react-bootstrap';
import "/Users/fareedbalogun/Desktop/my-app/code-editor-react/src/client/components/styles.css";
var example = `{   
  "object": "file",
  "type":"json",
  "name": "source_code.c",
  "argc": null,
  "value" : null,
  "arguments": [], 
  "include": ["stdio.h", "stdbool.h"," base64.h"],
  "variables": [],
  "functions": [
                  {   
                      "object": "function",
                      "type":"integer",
                      "name": "main",
                      "argc": 0,
                      "arguments": [], 
                      "include": [],
                      "variables": [],
                      "functions": [{"name":"args_error"}]
                  }, 
                  {   
                      "object": "function",
                      "type":"void",
                      "name": "welcome",
                      "argc": 0,
                      "value" : null,
                      "arguments": [], 
                      "include": [],
                      "variables": [],
                      "functions": [{"name":"usage"}]
                      
                  },
                  {   
                      "object": "function",
                      "type":"void",
                      "name": "usage",
                      "argc": 0,
                      "value" : null,
                      "arguments": [], 
                      "include": [],
                      "variables": [],
                      "functions": []

                  }, 
                  {   
                      "object": "function",
                      "type":"void",
                      "name": "do_and_print",
                      "argc": 0,
                      "value" : null,
                      "arguments": [], 
                      "include": [],
                      "variables": [  
                                      {   
                                          "object": "variable",
                                          "type":"integer - size_t",
                                          "name": "usage",
                                          "argc": null,
                                          "value" : 0,
                                          "arguments": null,
                                          "include": null,
                                          "variables": null,
                                          "functions": null
                                      }
                                  ],
                      "functions": []
                  },
                  {   
                      "object": "function",
                      "type":"void",
                      "name": "do_and_save",
                      "argc": 0,
                      "arguments": [], 
                      "include": [],
                      "variables": [  
                                      {   
                                          "object": "variable",
                                          "type":"FILE",
                                          "name": "dest_file",
                                          "argc": null,
                                          "value" : "directory",
                                          "arguments": null,
                                          "include": null,
                                          "variables": null,
                                          "functions": null
                                      }
                  ],
                      "functions": []
                  },
                  {   
                      "object": "function",
                      "type":"bool",
                      "name": "file_exits",
                      "argc": 0,
                      "value" : null,
                      "arguments": [], 
                      "include": [],
                      "variables": [],
                      "functions": []
                  },
                  {   
                      "object": "function",
                      "type":"void",
                      "name": "args_error",
                      "argc": 0,
                      "value" : null,
                      "arguments": [], 
                      "include": [],
                      "variables": [],
                      "functions": []
                  } 
              ]
}`;
let languages = ['JavaScript', 'Python', 'Java', 'C', 'C++'];
const languagesProd = ['JavaScript', 'Python'];

class Editor extends React.Component {
  constructor(props) {
    super(props);

    console.log(`env: ${process.env.NODE_ENV}`);
    if (process.env.NODE_ENV === 'production') {
      languages = languagesProd;
    }

    this.state = {
      selectedLang: 0, // JavaScript
      task: {
        lang: 'javascript',
        code: '',
      },
      response: {
        status: '0',
        message: '',
      },
    };

    this.handleRun = this.handleRun.bind(this);
    this.updateSolution = this.updateSolution.bind(this);
    this.handleLangChange = this.handleLangChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
  }

  componentDidMount() {
    CompilerApi.getTask('javascript')
      // .then(res => res.json())
      .then((task) => {
        console.log(task);
        this.setState({ task });
      });
  }

  handleCodeChange(code) {
    const { task } = this.state;
    task.code = code;
    console.log(code);
    return this.setState({ task });
  }

  handleRun(event) {
    event.preventDefault();
    const { task } = this.state;
    console.log(task);
    CompilerApi.run(task)
      .then((res) => {
        this.setState({ response: res });
      })
      .catch((error) => {
        console.log(error);
        // this.handleError(error);
      });
  }

  updateSolution(event) {
    // event.preventDefault();
    console.log(this.state.task);
    const field = event.target.name;
    const { task } = this.state;
    task[field] = event.target.value;
    return this.setState({ task });
  }

  handleLangChange(event) {
    const index = parseInt(event.target.value, 10);
    CompilerApi.getTask(languages[index]).then((task) => {
      console.log(task);
      this.setState({ task });
    });
    const response = { status: '0', message: '' };
    this.setState({ response });
    return this.setState({ selectedLang: index });
  }

  render() {
    return (
      
      <div className="container">
        
        <Form horizontal>
          <FormGroup controlId="code">
          <Col sm={12}>
              <ButtonToolbar>
                <Button bsStyle="info" class= "source_code" bsStyle="info" onClick={()=>{alert(example)}}>
                  Source Code Analysis
                </Button>
              </ButtonToolbar>
            </Col>
            <Col sm={12}>
              <LangSelector
                langs={languages}
                selectedIndex={this.state.selectedLang}
                onChange={this.handleLangChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="code">
            <Col sm={12}>
              <CodeEditor onChange={this.handleCodeChange} code={this.state.task.code} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2}>
              <Button bsStyle="info" type="button" onClick={this.handleRun}>
                Run
              </Button>
              <StatusImage
                hasError={this.state.response.status !== '0'}
                message={this.state.response.message}
              />
              
            </Col>
            <Col sm={10} />
          </FormGroup>
          <FormGroup>
            <Col sm={12}>
              <AlertDismissable
                show={this.state.response.status !== '0'}
                message={this.state.response.message}
              />
              
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={12}>
              <OutputBox
                show={this.state.response.status === '0'}
                message={this.state.response.message}
              />
            </Col>
          </FormGroup>
        </Form>
        <Col sm={12}>
              <ButtonToolbar>
                <Button bsStyle="info" class= "button"  href="/" >Logout</Button>
              </ButtonToolbar>
            </Col>
      </div>
    );
  }
}

export default Editor;
