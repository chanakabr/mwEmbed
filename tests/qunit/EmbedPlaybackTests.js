function runEmbedPlaybackTests(videoSelector) {
	
	module("Embed Player Loads");

	test("embed player is embedded", function() {
		ok( $('.mv-player', '.mwplayer_interface' ) );
	});

	test("embed player is skinned", function() {
		ok( $('.play-btn-large') );
	});
	
	module("Embed Player Plays",
	{
		setup: function() 
		{
			this.player = $( videoSelector ).get(0);
			this.player.play();
			this.passed = false;
		},
		teardown: function()
		{
			if ( this.player ) 
			{ 
				this.player.stop(); 
			}
			this.player = undefined;
			this.passed = undefined;
		}
	});

	asyncTest("playback begins", function() {
		var player = this.player;
		setTimeout( function()
		{
			equal( player.isPlaying(), true );
			start();
		}, 5000);
	});
		
	asyncTest("playhead progresses", function() {
		var player = this.player;
		var passed = this.passed;
		setTimeout( function()
		{
			if ( player.currentTime > 0 ) { passed = true; };
			ok( passed );
			start();
		}, 5000);
	});

	asyncTest("pause playback", function() {
		var player = this.player;
		setTimeout( function() 
		{
			player.pause();
			equal( player.isPlaying(), false );
			start();
		}, 5000);
	});

	asyncTest("resume playback", function() {
		var player = this.player;
		player.pause();
		setTimeout( function()
		{ 
			player.play();
			equal( player.isPlaying(), true );
			start();
		}, 5000);

	});

	asyncTest("seek to video beginning + 5 sec", function() {
		var player = this.player;
		var passed = this.passed;
		player.doSeek( 5 / player.duration );
		setTimeout( function()
		{ 
			if ( player.currentTime <= 11 & player.currentTime >= 5) 
			{ 
				passed = true;
			} else {
				passed = false;
			}
			equal( passed, true );
			start();
		}, 6000);
	});

	asyncTest("playback ends", function() {
		var player = this.player;
		var passed = this.passed;
		$(player).bind('ended', function() { passed = true } );
		var performTestSeek = function(player)
		{
			player.doSeek( (player.duration - 2) / player.duration );
		};
		setTimeout( performTestSeek(player), 6000);
		setTimeout( function()
		{
			equal( passed, true );
			start();
		}, 12000);
	});
};
