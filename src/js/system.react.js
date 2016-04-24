"use strict";

// var Element = require('./element.react');

// var redux=require('redux');
// window.redux = redux;

// import { createStore } from 'redux';
// var a=1;

var System = React.createClass({
  getInitialState: function() {
    return {
      numElement : NumDancer,
      numShowing: 0,
      initials: DancerInitials,
      intervals : 1,
      action: "sync", //stop
      elementState: {
        syncState: true,
        syncTo: 5,
        running: false,
        interval: 1
      }
    };
  },

  orderedIntro:function(states, step, random){
    var self = this;
    var update = this.state.elementState;
    update.syncState = true;
    if(random){
      var idx = Math.floor(Math.random()*states.length);
      update.syncTo = states.splice(idx, 1);
    }else{
      update.syncTo = states.shift();
    }
    console.log("orderedIntro, update to:", update.syncTo);
    update.running = false;
    this.setState({elementState: update});
    setTimeout(function(){
      if(states.length>0)
        self.orderedIntro(states, step);
    }, step*1000);
  },
  groupMarkov:function(numIteration, step){
    numIteration --;
    var self = this;
    var update = this.state.elementState;
    update.syncState = true;
    update.syncTo = getNextMarkovState(Matrix, this.state.elementState.syncTo);
    console.log("group Markov, update to:", update.syncTo);
    update.running = false;
    this.setState({elementState: update});
    setTimeout(function(){
      if(numIteration>0)
        self.groupMarkov(numIteration, step);
    }, step*1000);
  },
  individualMarkov:function(totalDuration, step, speedUp, deltaStep){
    //sec, sec, bollen
    var nextStep = step;
    totalDuration -= step;
    if(speedUp)
      nextStep = step > deltaStep ? step - deltaStep : step      

    var self = this;
    var update = this.state.elementState;
    update.syncState = false;
    console.log("individual Markov ", totalDuration, step);
    update.running = false;
    this.setState({elementState: update});
    setTimeout(function(){
      if(totalDuration>0)
        self.individualMarkov(totalDuration, nextStep, speedUp, deltaStep);
    }, step*1000);
  },
  stopElements: function(){
    var self = this;
    var update = this.state.elementState;
    update.syncState = true;
    update.syncTo = DarkState;
    update.running = false;
    this.setState({elementState: update});
  },
  playActions:function(actions){
    var self = this;
    var action = actions.shift();
    console.log(action);

    var actionDuration = 0;

    switch(action.action){
      case "orderedIntro":
        this.orderedIntro(action.states, action.step, action.random);
        actionDuration = action.states.length * action.step;
      break;
      case "groupMarkov":
        this.groupMarkov(action.numIteration, action.step);
        actionDuration = action.numIteration * action.step;
      break;
      case "individualMarkov":
        // debugger
        this.individualMarkov(action.totalDuration, action.step, action.speedUp, action.deltaStep);
        actionDuration = action.totalDuration;
      break;
      case "stop":
        this.stopElements();
        actionDuration = -1;
      break;
      default:
    }

    if(actionDuration > 0)
      setTimeout(function(){
        if(actions.length>0)
          self.playActions(actions);
      }, actionDuration * 1000);
  },

  componentDidMount: function() {
    var self = this;
    document.addEventListener('keydown', this.onKeyDown);
    // this.playActions(Actions);
  },

  onKeyDown:function(e){
    var self =this;
    console.log(e.keyCode);
    switch(e.keyCode){
      case 32: //space
        self.setState({numShowing: self.state.numShowing+1});
        self.playActions(_.clone(Actions, true));
      break;
      case 37: //left arrow, remove a user
        self.setState({numShowing: self.state.numShowing-1});
      break;
      case 39: //right arrow, add a user
        self.setState({numShowing: self.state.numShowing+1});
      break;
      default:
    }
  },

  render: function() {
    var self = this;
    var children = [];
    _.range(0, this.state.numElement).forEach(function(i){
      if(i<self.state.numShowing){
        children.push(<Element key={i} 
          id={i} 
          initial = {self.state.initials[i]}
          action = {self.state.action}
          state = {self.state.elementState}
        />);
      }
    })

    return (
      <div>
        {children}
      </div>
    );
  }
});

// module.exports = System;