$(document).ready(function(){
/*Using document ready runs code only after the DOM is ready for js code to run more on that here: https://learn.jquery.com/using-jquery-core/document-ready */
	function postData() {
		/*This function should create a post request using jquery. When posted it should:
			1) Add tweets to the 'database'
			2) After posted prepend message to list of messages and clear input box */
            
            //console.log($('#compose').val());
            
            var toAdd = {}
            toAdd.text = $('#compose').val();
            toAdd.userName = 'user';
            //console.log(toAdd);
            //console.log(JSON.stringify(toAdd));
            var stringified = JSON.stringify(toAdd);
            
            $.ajax({
                url: 'http://localhost:3000/messages',
                method: 'POST',
                data: stringified
            }).then(function(result) {
                $('#compose').val("");
            });
	}

	function getData() {
		/*This function should make a get request from 'database', parse the data and prepend each to the page*/
        
        $.ajax({
            url: 'http://localhost:3000/messages',
            method: 'GET'
        }).then(function(result) {
            //console.log(result);
            var posts = result.split("\n");
            for (var i in posts) {
                if (posts[i] == "") {
                    delete posts[i];
                }
            }
            for (var i in posts) {
                //console.log(posts[i]);
                posts[i] = JSON.parse(posts[i]);
            }
            //console.log(posts);
            
            for (var i in posts) {
                //console.log(posts[i].text);
                $('#container').prepend('<div class="post"><div class="post_username">' + posts[i].userName + '</div><div class="post_content">' + posts[i].text + '</div></div>')
            }
        });
	}

	/*Calls function once page loaded to display tweets to page*/
	getData();
    
    $('#send').click(function() {
       postData(); 
    });
});