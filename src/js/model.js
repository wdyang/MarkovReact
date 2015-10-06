"use strict";

var DancerInitials = ["Es", "Sh", "Er", "L", "D", "Su"];
var NumDancer = DancerInitials.length;
var NumState= 4;
var Colors = ['red', 'white', 'blue', 'green', 'black'];
var DarkState = NumState;

var Matrix = [
	[0.2, 0.5, 0.3, 0],
	[0, 0.2, 0.5, 0.3],
	[0.3, 0, 0.2, 0.5],
	[0.5, 0.3, 0, 0.2]
];

var getNextMarkovState=function(mat, current){
	var probabilities = mat[current];
	var steps = _.reduce(probabilities,(res, ele)=>{
		var acc = res.length > 0 ? _.last(res) + ele : ele;
		return res.concat(acc);
	}, []);

	var dice = Math.random() * _.sum(probabilities);
	return steps.filter(function(s){return s<dice; }).length;
};

var getRandomState = function(){
	return Math.floor(Math.random()*NumState);
};

var Model=function(){
};

var Actions=[
	{
		action: "orderedIntro",
		states: [0,1,2,3],
		step: 0.3
	},
	{
		action: "groupMarkov",
		numIteration: 4,
		step: 0.3
	},
	{
		action: "individualMarkov",
		totalDuration: 4,
		step: 0.5,
		speedUp: false
	},
	{
		action: "individualMarkov",
		totalDuration: 20,
		step: 4,
		speedUp: true,
		deltaStep: 1
	},
	{
		action: "stop"
	}
];