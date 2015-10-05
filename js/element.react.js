"use strict";

var Element = React.createClass({
  getInitialState: function() {
    return {
      current: 0,
      numState: 4
    };
  },

  componentDidMount: function() {
    this.componentWillReceiveProps(this.props);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  componentWillReceiveProps: function(nextProps){
    clearInterval(this.interval);
    this.setState({current: nextProps.current});
    if(nextProps.trasitionOn)
      this.interval = setInterval(this.tick, nextProps.interval);
  },

  tick: function() {
    this.setState({
      current: Math.floor(Math.random()*this.state.numState)
    });
  },

  render: function() {
    var children = [];
    // var pos = 0;
    var colors = ['red', 'white', 'blue', 'green'];

    var style = {
      top: 400,
      left: 128*2 * (1+this.props.id),
      background: colors[this.state.current]
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