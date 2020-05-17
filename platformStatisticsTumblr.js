function getStatisticsTumblr(){
	const invocation = new XMLHttpRequest();
      const url = "https://sma-a4.herokuapp.com/";
      //http://sma-a4.herokuapp.com/nume_platforma/profile
      const nume_platforma = "tumblr/"	
      const actiune = "profile/posts/stats"			

        if (!invocation) return;
        const requestDataLogin = `email=${sessionStorage.getItem("current_email")}&password=${sessionStorage.getItem("current_pass")}`;

        invocation.open("POST", url + "auth/login" , true);
        invocation.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );

        invocation.withCredentials = true;

        var count = 0;
        var tempo = 0;

        console.log(url);

        invocation.onreadystatechange = function () {
          if (tempo == 4){	
            //console.log(this.response);
            var responseLines = this.responseText.split("\n");
           // console.log(responseLines[1]);	
            var obj=JSON.parse(responseLines[1]);

            removeChildren();

            alert_message = '';

            alert_message = alert_message + 'AVG_COMM: ' + obj.comments_avg+ '\n'+ 'SUM_COMM: ' + obj.comments_sum+ '\n'+ 'likes_avg: ' + obj.likes_avg+ '\n' + 'Likes_sum: ' + obj.likes_sum+ '\n' + 'shares_avg: ' + obj.shares_avg+ '\n'+ 'shares_sum: ' + obj.shares_sum;
            modifyHTML( obj.comments_avg, obj.comments_sum,  obj.likes_sum, obj.likes_avg, obj.shares_sum ,obj.shares_avg);
      
            console.log(alert_message);
        }
        else
        	tempo++;
          if (count == 0) {
            count = 1;
            this.open("GET", url + nume_platforma + actiune , true);
            this.send();
          }
        };

        invocation.send(requestDataLogin);

        function modifyHTML (comments_avg, comments_sum, likes_sum, likes_avg, shares_sum, shares_avg) {
            var elem = document.createElement('div')
            var heading = document.createElement('h4')
            var comments_avg_p = document.createElement('p')
            var comments_sum_p = document.createElement('p')
            var likes_avg_p = document.createElement('p')
            var likes_sum_p = document.createElement('p')
            var shares_sum_p = document.createElement('p')
            var shares_avg_p = document.createElement('p')

            var node = document.createTextNode('Platform statistics:')
            var comments_avg_n = document.createTextNode('Average number comments: ' +comments_avg)
            var comments_sum_n = document.createTextNode('Sum number comments: ' + comments_sum)
            var likes_avg_n = document.createTextNode('Average number likes: ' + likes_avg)
            var likes_sum_n = document.createTextNode('Sum number likes: ' + likes_sum)
            var shares_sum_n = document.createTextNode('Sum number shares: ' + shares_sum)
            var shares_avg_n = document.createTextNode( 'Average number shares: ' + shares_avg)
            
            heading.appendChild(node)
            comments_avg_p.appendChild(comments_avg_n)
            comments_sum_p.appendChild(comments_sum_n)
            likes_avg_p.appendChild(likes_avg_n)
            likes_sum_p.appendChild(likes_sum_n)
            shares_sum_p.appendChild(shares_sum_n)
            shares_avg_p.appendChild(shares_avg_n)

            elem.appendChild(heading)
            elem.appendChild(comments_avg_p)
            elem.appendChild(comments_sum_p)
            elem.appendChild(likes_avg_p)
            elem.appendChild(likes_sum_p)
            elem.appendChild(shares_avg_p)
            elem.appendChild(shares_sum_p)

            var original = document.getElementById('content-area')
            original.append(elem)
          }
          
          function removeChildren () {
            const myNode = document.getElementById('content-area')
            while (myNode.lastElementChild) {
              myNode.removeChild(myNode.lastElementChild)
            }
          }
          

}