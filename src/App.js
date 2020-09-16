import React, { Component } from "react";
import instance from "./axios-internform.js";
import axios from "axios";
import "./App.css";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      skills: "UI",
      gender: "male",
      description: "",
      response: null,
      open: false,
      nameerror: false,
      emailerror: false,
      phoneerror: false,
      descerror: false,
    };
  }

  onNameChange = (event) => {
    this.setState({
      name: event.target.value,
      nameerror: false,
    });
  };

  onEmailChange = (event) => {
    this.setState({
      email: event.target.value,
      emailerror: false,
    });
  };

  onPhoneChange = (event) => {
    this.setState({
      phone: event.target.value,
      phoneerror: false,
    });
  };

  onSkillChange = (event) => {
    this.setState({
      skills: event.target.value,
    });
  };

  onDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
      descerror: false,
    });
  };

  onGenderChange = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };

  onSubmission = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!/\S/.test(this.state.name)) {
      this.setState({
        nameerror: true,
      });
    } else if (!re.test(this.state.email)) {
      this.setState({
        emailerror: true,
      });
    } else if (!/\d/.test(this.state.phone)) {
      this.setState({
        phoneerror: true,
      });
    } else if (!/\S/.test(this.state.description)) {
      this.setState({
        descerror: true,
      });
    } else {
      const submit = {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        gender: this.state.gender,
        skills: this.state.skills,
        description: this.state.description,
      };
      instance
        .put("", submit)
        .then((response) => {
          this.setState({ open: true });
        })
        .catch((error) => console.log(error));
    }
  };

  componentDidMount() {
    axios
      .get("https://internform-4364b.firebaseio.com/internform.json")
      .then((response) => {
        if (response.data) {
          this.setState({
            name: response.data.name,
            email: response.data.email,
            phone: response.data.phone,
            gender: response.data.gender,
            skills: response.data.skills,
            description: response.data.description,
          });
        }
      });
  }

  render() {
    const {
      name,
      email,
      phone,
      skills,
      gender,
      description,
      nameerror,
      emailerror,
      phoneerror,
      descerror,
    } = this.state;
    return (
      <div className="fullpage">
        <Container className="container-body">
          <h2 className="title">Get in Touch!</h2>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <TextField
                error={nameerror}
                value={name}
                onChange={this.onNameChange}
                label="Name"
                fullWidth
                size="small"
                variant="standard"
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                error={emailerror}
                value={email}
                onChange={this.onEmailChange}
                label="Email"
                variant="standard"
                fullWidth
                size="small"
                type="email"
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                error={phoneerror}
                value={phone}
                onChange={this.onPhoneChange}
                label="Phone"
                fullWidth
                variant="standard"
                size="small"
                type="number"
              />
            </Grid>
            <Grid item sm={12} style={{ paddingBottom: 0 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-label="position"
                  name="gender1"
                  value={gender}
                  onChange={this.onGenderChange}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio color="primary" />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio color="primary" />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item sm={12} style={{ paddingTop: 0 }}>
              <FormControl variant="standard" style={{ minWidth: 150 }}>
                <InputLabel id="skills-helper-label">Skills</InputLabel>
                <Select
                  labelId="skills-helper-label"
                  id="skills-helper"
                  value={skills}
                  onChange={this.onSkillChange}
                >
                  <MenuItem value="UI">UI</MenuItem>
                  <MenuItem value="UX">UX</MenuItem>
                  <MenuItem value="Backend">Backend</MenuItem>
                  <MenuItem value="CSS">CSS</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={12} style={{ paddingTop: "20px" }}>
              <TextField
                error={descerror}
                label="Description"
                value={description}
                onChange={this.onDescriptionChange}
                multiline
                fullWidth
                variant="outlined"
                rows={6}
              />
            </Grid>
            <Grid item sm={12} style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={this.onSubmission}
                className="buttonstyle"
                style={{ justifyContent: "center" }}
              >
                Send
              </Button>
            </Grid>
          </Grid>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={this.state.open}
            autoHideDuration={6000}
            message="Updated successfully"
          />
        </Container>
      </div>
    );
  }
}

export default Form;
