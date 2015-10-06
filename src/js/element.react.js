"use strict";

var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var Element = React.createClass({
  getInitialState: function() {
    return {
      current: 0,
    };
  },

  componentDidMount: function() {
    this.componentWillReceiveProps(this.props);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  // {id, initial, action, state}
  componentWillReceiveProps: function(nextProps){
    // debugger
    var newState = nextProps.state;
    switch(nextProps.action){
      case "sync":
        clearInterval(this.interval);
        if(newState.syncState)
          this.setState({current: newState.syncTo});
        else
          this.tick();

        if(newState.running)
          this.interval = setInterval(this.tick, newState.interval*1000);  
      break;
      case "stop":
        clearInterval(this.interval);
      break;
      default:
    }

    // if(nextProps.sync == false)
    //   return;

    // clearInterval(this.interval);
    
    // if(nextProps.syncState)
    //   this.setState({current: nextProps.state.syncTo});

    // if(nextProps.trasitionOn)
    //   this.interval = setInterval(this.tick, nextProps.interval);
  },

  tick: function() {
    var self = this;
    var newState = getNextMarkovState(Matrix, self.state.current);
    this.setState({
      current: newState
    });
  },

  render: function() {
    var children = [];
    // var pos = 0;

    var style = {
      top: 400,
      left: 128*2 * (1+this.props.id),
      background: Colors[this.state.current]
    };

    return (
      <CSSTransitionGroup
        className="animateExample"
        transitionName="example">
        <div key={1} className = "animateItem" style = {style}>{this.props.initial}</div>
      </CSSTransitionGroup>
    );
  }
});

// module.exports=Element;