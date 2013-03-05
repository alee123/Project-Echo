
/*
 * GET home page.
 */
var echojs = require('echojs');

var echo = echojs({
  key: "XCVC9ZYTCHJC5TMUI"
});

exports.index = function(req,res){
	res.render('index', {title:'Mix It Up!'});
}

exports.play = function(req, res){
	//Finding information about original
	echo('song/search').get({  
		artist:'2pac',
		title:'thugz mansion',
		bucket:'audio_summary',
	},function(err,json){
		var url = json.response.songs[0].audio_summary.analysis_url;
		var tempo = json.response.songs[0].audio_summary.tempo;
		res.render('player', { title: 'YAY! Music!' , audioUrl: url, tempo:tempo});
	}) 
}  

exports.search=function(req,res){
	//Related song search
	echo('song/search').get({
		key:8,
		max_tempo:87.804,
		style:'classical',
		bucket: 'artist',
		bucket:['tracks', 'id:rdio-US']
	}, function (err, json) {
		res.send(json.response.songs)
	})
}