"use strict";

var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var System = React.createClass({
  getInitialState: function() {
    return {
      numElement : 6,
      initials: ["Es", "Sh", "Er", "L", "D", "Su"],
      intervals : [1,1.2,1.4,1.6,1.8, 2.0],
      trasitionOn: true
    };
  },

  changeInterval: function(factor){
    var newIntervals = this.state.intervals.map( v => v*factor);
    console.log(newIntervals);
    this.setState({intervals: newIntervals});
  },

  componentDidMount: function() {
    var self = this;
    document.addEventListener('keydown', this.onKeyDown);
    setTimeout(()=>{
      console.log('changing state');
      self.setState({trasitionOn: false});
      self.changeInterval(0.1)}, 5000);
    setTimeout(()=>{
      console.log('changing state');
      self.setState({trasitionOn: true});
      self.changeInterval(10)}, 10000);
  },

  onKeyDown:function(e){
    console.log(e.keyCode);
    switch(e.keyCode){
      
    }
  },

  render: function() {
    var self = this;
    var children = [];
    _.range(0, this.state.numElement).forEach(function(i){
      children.push(<Element 
        key={i} 
        id={i} 
        initial = {self.state.initials[i]}
        current={2}
        trasitionOn={self.state.trasitionOn}
        interval={self.state.intervals[i]*1000}
      />);
    })

    return (
      <div>
        {children}
      </div>
    );
  }
});