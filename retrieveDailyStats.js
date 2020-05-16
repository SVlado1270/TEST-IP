function retrieveDailyStatsTumblr() {
      const invocation = new XMLHttpRequest()
      const url = 'https://sma-a4.herokuapp.com/'
      // http://sma-a4.herokuapp.com/nume_platforma/profile
      const platforma = 'tumblr/' // se seteaza in functie de ce e nevoie
      const actiune = 'profile/posts/stats/timeline' // se seteaza in functie de ce e nevoie
    
      if (!invocation) return
      const requestDataLogin = `email=${sessionStorage.getItem('current_email')}&password=${sessionStorage.getItem('current_pass')}`
    
      invocation.open('POST', url + 'auth/login', true)
      invocation.setRequestHeader(
        'Content-type',
        'application/x-www-form-urlencoded'
      )
    
      invocation.withCredentials = true
    
      var count = 0
      var tempo = 0
    
      invocation.onreadystatechange = function() {
        if (tempo == 4) { // jeez christ bad code af dar asigura ca veti primi doar raspunsul la final (json-ul pe care-l asteptati)
          // console.log(this.response)
          var responseLines = this.responseText.split('\n')
          console.log(responseLines[1])
          var obj = JSON.parse(responseLines[1])
          removeChildren()
          for(var i = 0; i < obj.entries.length; i++){
            DailyStatstumblr(obj.entries[i].comments_avg, obj.entries[i].likes_avg, obj.entries[i].shares_avg, obj.entries[i].timestamp)
          }
        } else { tempo++ }
        if (count == 0) {
          count = 1
          this.open('GET', url + platforma + actiune +"?date_begin=" + sessionStorage.getItem('date_begin') + "&date_end=" + sessionStorage.getItem('date_end'), true)
          this.send()
        }
      }
    
      invocation.send(requestDataLogin)
    }
    
    function DailyStatstumblr(comments_avg, likes_avg, shares_avg, timestamp) {
      var elem = document.createElement('div')
      var heading = document.createElement('h4')
      var comments_avg_p = document.createElement('p')
      var likes_avg_p = document.createElement('p')
      var shares_avg_p = document.createElement('p')
      var timestamp_p = document.createElement('p')
    
      var heading_n = document.createTextNode('Your daily stats from Tumblr: ')
      var comments_avg_n = document.createTextNode('comments_avg: ' + comments_avg)
      var likes_avg_n = document.createTextNode('Number of likes_avg: ' + likes_avg)
      var shares_avg_n = document.createTextNode('Number of shares_abg: ' + shares_avg)
      var timestamp_n = document.createTextNode('Timestamp: ' + timestamp)
    
      heading.appendChild(heading_n)
      comments_avg_p.appendChild(comments_avg_n)
      likes_avg_p.appendChild(likes_avg_n)
      shares_avg_p.appendChild(shares_avg_n)
      timestamp_p.appendChild(timestamp_n)
    
      elem.appendChild(heading)
      elem.appendChild(comments_avg_p)
      elem.appendChild(likes_avg_p)
      elem.appendChild(shares_avg_p)
      elem.appendChild(timestamp_p)
    
      var original = document.getElementById('content-area')
      original.append(elem)
    }
    
    function retrieveDailyStatsLinkedIn() {
      const invocation = new XMLHttpRequest()
      const url = 'https://sma-a4.herokuapp.com/'
      // http://sma-a4.herokuapp.com/nume_platforma/profile
      const platforma = 'linkedin/' // se seteaza in functie de ce e nevoie
      const actiune = 'profile/posts/stats/timeline' // se seteaza in functie de ce e nevoie
    
      if (!invocation) return
      const requestDataLogin = `email=${sessionStorage.getItem('current_email')}&password=${sessionStorage.getItem('current_pass')}`
    
      invocation.open('POST', url + 'auth/login', true)
      invocation.setRequestHeader(
        'Content-type',
        'application/x-www-form-urlencoded'
      )
    
      invocation.withCredentials = true
    
      var count = 0
      var tempo = 0
    
      invocation.onreadystatechange = function() {
        if (tempo == 4) { // jeez christ bad code af dar asigura ca veti primi doar raspunsul la final (json-ul pe care-l asteptati)
          // console.log(this.response)
          var responseLines = this.responseText.split('\n')
          console.log(responseLines[1])
          var obj = JSON.parse(responseLines[1])
          removeChildren()
          for(var i = 0; i < obj.entries.length; i++){
            DailyStatslinkedin(obj.entries[i].comments_avg, obj.entries[i].likes_avg, obj.entries[i].shares_avg, obj.entries[i].timestamp)
          }
        } else { tempo++ }
        if (count == 0) {
          count = 1
          this.open('GET', url + platforma + actiune +"?date_begin=" + sessionStorage.getItem('date_begin') + "&date_end=" + sessionStorage.getItem('date_end'), true)
          this.send()
        }
      }
    
      invocation.send(requestDataLogin)
    }
    
    function DailyStatslinkedin(comments_avg, likes_avg, shares_avg, timestamp) {
      var elem = document.createElement('div')
      var heading = document.createElement('h4')
      var comments_avg_p = document.createElement('p')
      var likes_avg_p = document.createElement('p')
      var shares_avg_p = document.createElement('p')
      var timestamp_p = document.createElement('p')
    
      var heading_n = document.createTextNode('Your daily stats from LinkedIn: ')
      var comments_avg_n = document.createTextNode('comments_avg: ' + comments_avg)
      var likes_avg_n = document.createTextNode('Number of likes_avg: ' + likes_avg)
      var shares_avg_n = document.createTextNode('Number of shares_abg: ' + shares_avg)
      var timestamp_n = document.createTextNode('Timestamp: ' + timestamp)
    
      heading.appendChild(heading_n)
      comments_avg_p.appendChild(comments_avg_n)
      likes_avg_p.appendChild(likes_avg_n)
      shares_avg_p.appendChild(shares_avg_n)
      timestamp_p.appendChild(timestamp_n)
    
      elem.appendChild(heading)
      elem.appendChild(comments_avg_p)
      elem.appendChild(likes_avg_p)
      elem.appendChild(shares_avg_p)
      elem.appendChild(timestamp_p)
    
      var original = document.getElementById('content-area')
      original.append(elem)
    }

    function retrieveDailyStatsTwitter() {
      const invocation = new XMLHttpRequest()
      const url = 'https://sma-a4.herokuapp.com/'
      // http://sma-a4.herokuapp.com/nume_platforma/profile
      const platforma = 'twitter/' // se seteaza in functie de ce e nevoie
      const actiune = 'profile/posts/stats/timeline' // se seteaza in functie de ce e nevoie
    
      if (!invocation) return
      const requestDataLogin = `email=${sessionStorage.getItem('current_email')}&password=${sessionStorage.getItem('current_pass')}`
    
      invocation.open('POST', url + 'auth/login', true)
      invocation.setRequestHeader(
        'Content-type',
        'application/x-www-form-urlencoded'
      )
    
      invocation.withCredentials = true
    
      var count = 0
      var tempo = 0
    
      invocation.onreadystatechange = function() {
        if (tempo == 4) { // jeez christ bad code af dar asigura ca veti primi doar raspunsul la final (json-ul pe care-l asteptati)
          // console.log(this.response)
          var responseLines = this.responseText.split('\n')
          console.log(responseLines[1])
          var obj = JSON.parse(responseLines[1])
          removeChildren()
          for(var i = 0; i < obj.entries.length; i++){
            DailyStatstwiiter(obj.entries[i].comments_avg, obj.entries[i].likes_avg, obj.entries[i].shares_avg, obj.entries[i].timestamp)
          }
        } else { tempo++ }
        if (count == 0) {
          count = 1
          this.open('GET', url + platforma + actiune +"?date_begin=" + sessionStorage.getItem('date_begin') + "&date_end=" + sessionStorage.getItem('date_end'), true)
          this.send()
        }
      }
    
      invocation.send(requestDataLogin)
    }
    
    function DailyStatstwiiter(comments_avg, likes_avg, shares_avg, timestamp) {
      var elem = document.createElement('div')
      var heading = document.createElement('h4')
      var comments_avg_p = document.createElement('p')
      var likes_avg_p = document.createElement('p')
      var shares_avg_p = document.createElement('p')
      var timestamp_p = document.createElement('p')
    
      var heading_n = document.createTextNode('Your daily stats from Twitter: ')
      var comments_avg_n = document.createTextNode('comments_avg: ' + comments_avg)
      var likes_avg_n = document.createTextNode('Number of likes_avg: ' + likes_avg)
      var shares_avg_n = document.createTextNode('Number of shares_abg: ' + shares_avg)
      var timestamp_n = document.createTextNode('Timestamp: ' + timestamp)
    
      heading.appendChild(heading_n)
      comments_avg_p.appendChild(comments_avg_n)
      likes_avg_p.appendChild(likes_avg_n)
      shares_avg_p.appendChild(shares_avg_n)
      timestamp_p.appendChild(timestamp_n)
    
      elem.appendChild(heading)
      elem.appendChild(comments_avg_p)
      elem.appendChild(likes_avg_p)
      elem.appendChild(shares_avg_p)
      elem.appendChild(timestamp_p)
    
      var original = document.getElementById('content-area')
      original.append(elem)
    }
    
    function removeChildren() {
      const myNode = document.getElementById('content-area')
      while (myNode.lastElementChild) {
        myNode.removeChild(myNode.lastElementChild)
      }
    }