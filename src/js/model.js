"use strict";

var DancerInitials = ["Su", "Sh", "Er", "L", "Es", "D"];
var NumDancer = DancerInitials.length;
var NumState= 4;
// var Colors = ['red', 'white', 'blue', 'green', 'black'];
var Colors = ["#FF892B", "#E5E5E5", "#31A125", "#30ABC4",  "#555555"];
var DarkState = NumState;

var Matrix = [
	[0.2, 0.5, 0.3, 0],
	[0, 0.2, 0.5, 0.3],
	[0.3, 0, 0.2, 0.5],
	[0.5, 0.3, 0, 0.2]
];

var getNextMarkovState=function(mat, current){
	var probabilities = mat[current];
	var steps = _.reduce(probabilities,function(res, ele){
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
//fractal, fancy resturuant, wall, connect

var Actions=[
	{
		action: "individualMarkov",
		totalDuration: 60,  //Su 30, Sh 15, Er 15
		step: 1,
		speedUp: false,
	},
	{
		action: "individualMarkov",
		totalDuration: 60,
		step: 5,
		speedUp: false,
	},
	{
		action: "individualMarkov",
		totalDuration: 60,
		step: 10,
		speedUp: false,
	},
	// {
	// 	action: "orderedIntro",
	// 	states: [0,1,2,3],
	// 	step: 30,
	// 	random: true
	// },
	// {
	// 	action: "groupMarkov",
	// 	numIteration: 8,
	// 	step: 15
	// },
	{
		action: "orderedIntro",
		states: [0, 2, 3, 2, 0, 3, 3, 0, 1, 1, 1, 1],
		step: 15,
		random: false
	},
	// {
	// 	action: "individualMarkov",
	// 	totalDuration: 60,
	// 	step: 15,
	// 	speedUp: false
	// },
	// {
	// 	action: "individualMarkov",
	// 	totalDuration: 60,
	// 	step: 10,
	// 	speedUp: true,
	// 	deltaStep: 2
	// },
	{
		action: "stop"
	}
];