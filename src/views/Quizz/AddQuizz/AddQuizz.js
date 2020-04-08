import React, { Component } from 'react';
import {Card,CardHeader,CardBody,Form,FormGroup,Col,Label,Input,FormText,CardFooter,Button} from 'reactstrap';
import axios from 'axios';
import SuccessAlert from '../Question/successAlert';
import ErrorAlert from '../Question/ErrorAlert';

class AddQuizz extends Component {
  constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onchangeclass= this.onchangeclass.bind(this);
        this.onchangetimer=this.onchangetimer.bind(this);
        this.onsubmit=this.onsubmit.bind(this);
        this.state = {
            alert_msg : "",
            classe : "",
            Timer : "",
            Options : [],
            value :[],
            take : [],
            code : ''
           
        }
    }
    getQuestion()
    {
        axios.get('http://localhost:5000/Questions/questions')
          .then(res => {
            const Question = res.data;
            this.setState({Options : Question
              });
            console.log(this.state.Options)
          })
    }
    
    onchangeclass(e){
      this.setState({
        classe: e.target.value
      })
    }
    onchangetimer(e){
      this.setState({
        Timer: e.target.value
      })
    }
    componentDidMount() {
        this.getQuestion();
      }
    handleChange (e) {

      var options = e.target.options;
      var value = [];
              for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                  value.push(options[i].value);
                }
              }
        this.setState({value: value});
              console.log(this.state.value);
    }
      onsubmit(e){
        e.preventDefault();
        
        this.state.value.forEach(element => {
          axios.get(`http://localhost:5000/Questions/questions/${element}`)
            .then(res=> {
              console.log(res);
              this.setState({take: [...this.state.take,res.data]})
            })
        });
          
        const Quizz = {classe: this.state.classe,
          Question: this.state.take,
          Timer: this.state.Timer
        }
        if(this.state.take.length!==0){
        axios.post('http://localhost:5000/Quizz/Quizz', Quizz)
            .then(res => {
              this.setState({alert_msg : 'success',
                  value: [],
                  code : res.data.code
                })
                  
            }).catch(error => {
              this.setState({alert_msg:'error'});
            })
            
            
      }}
    render() {
       
        return(
            <Card>
                <CardHeader>{this.state.alert_msg==="success"?<SuccessAlert text={'successfully created, this is the code for this quizz : '+ this.state.code}/>:null}
                {this.state.alert_msg==="error"?<ErrorAlert/>:null}</CardHeader>
                
                    <Form className="form-horizontal" onSubmit={this.onsubmit}>
                    <CardBody>
                    <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="description">Class : </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="description" name="Class" placeholder="Enter Class..." autoComplete="Class" value={this.state.classe} onChange={this.onchangeclass}/>
                      <FormText className="help-block">Please enter your Class</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                  <Col md="3">
                      <Label htmlFor="multiple-select">Select Questions</Label>
                    </Col>
                    <Col md="9" xs="12">
                  <Input type="select" name="multiple-select" id="multiple-select" multiple={true}  onChange={this.handleChange}>
                  {
                  this.state.Options.map(optione => {
                    return <option 
                      key={optione.description}
                      value={optione._id}>{optione.description}
                      </option>;
                  })
                }
                      </Input>
                </Col>
                  </FormGroup>
                  <FormGroup row>
                  <Col md="3">
                      <Label htmlFor="Timer">Timer : </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number" min="0" id="Timer" name="Timer" placeholder="Enter Class..." autoComplete="Timer" value={this.state.Timer} onChange={this.onchangetimer}/>
                      <FormText className="help-block">Please enter how much time for this quizz in seconds</FormText>
                    </Col>
                  </FormGroup>
                   
                </CardBody>
                <CardFooter><Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button></CardFooter>
             </Form>
            </Card>
        )
    }


}
export default AddQuizz;