"use strict";

// var redux=require('redux');

var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var System = React.createClass({
  getInitialState: function() {
    return {
      numElement : NumDancer,
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

  orderedIntro:function(states, step){
    var self = this;
    var update = this.state.elementState;
    update.syncState = true;
    update.syncTo = states.shift();
    console.log("orderedIntro, update to:", update.syncTo);
    update.running = false;
    this.setState({elementState: update});
    setTimeout(()=>{
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
    setTimeout(()=>{
      if(numIteration>0)
        self.groupMarkov(numIteration, step);
    }, step*1000);
  },
  individualMarkov:function(totalDuration, step, speedUp, deltaStep){
    //sec, sec, bollen
    totalDuration -= step;
    if(speedUp)
      step = step > 1 ? step - deltaStep : step      

    var self = this;
    var update = this.state.elementState;
    update.syncState = false;
    console.log("individual Markov ", totalDuration, step);
    update.running = false;
    this.setState({elementState: update});
    setTimeout(()=>{
      if(totalDuration>0)
        self.individualMarkov(totalDuration, step, speedUp, deltaStep);
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
        this.orderedIntro(action.states, action.step);
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
      setTimeout(()=>{
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
        self.playActions(Actions);
      break;
      default:
    }
  },

  render: function() {
    var self = this;
    var children = [];
    _.range(0, this.state.numElement).forEach(function(i){
      children.push(<Element key={i} 
        id={i} 
        initial = {self.state.initials[i]}
        action = {self.state.action}
        state = {self.state.elementState}
      />);
    })

    return (
      <div>
        {children}
      </div>
    );
  }
});