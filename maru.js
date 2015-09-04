  function myfunc(){
    var getJSON = function(url) {
      return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if (status == 200) {
              resolve(xhr.response);
            } else {
            reject(status);
            }
        };
      xhr.send();
      });
    };
    var total;
  user=document.getElementById('git_user'); //get the user name from the entered text
  console.log(user.value);
  repo=document.getElementById('git_repo'); // get the repo name from the entered repo
  getJSON('https://api.github.com/repos/'+user.value+'/'+repo.value).then(function(data) {
    total=parseInt(data.open_issues_count);
    result.innerText ='Total no of open issues are '+ data.open_issues_count; //display the result in an HTML element
  }, function(status) { //error detection....
    alert('Something went wrong.Maybe the following git user/repo does not exists');
    result.innerText='';
  });
getJSON('https://api.github.com/repos/'+user.value+'/'+repo.value+'/issues').then(function(data) {
   console.log(data);
   var size_1=0;
      size_7=0;
      size_8=0;
   for(var key in data)
   {
    if(data.hasOwnProperty(key))  //loops through all objects 
    {
      if(data[key].state=='open' && data[key].closed_at==null)
      {
      date_created_at_org=data[key].created_at;
      date_created_at=date_created_at_org.split('T');  //date is in format of YYYY-MM-DDT00.00. So split and get the date
      date_arr=date_created_at[0]; //first value is the date
      //console.log(date_arr);
      date_seperated=date_arr.split('-'); //date is in format YYYY-MM-DD so we need only DD so split
      date=parseInt(date_seperated[2]);console.log("date is when issue created",date);
      var date_today = new Date(); //gets current time
      date_today = parseInt(date_today.getDate());//get current date
      console.log("todays date is",date_today);
      if(date_today-date<=1 && date_today-date >=0)
      {
        if(date_today-date == 1)
        {
          time_arr=date_created_at[1];
          time_seperated=time_arr.split(':');
          hours=parseInt(time_seperated[0]);
          console.log("hour is",hours)
          if(parseInt(new Date().getHours() )<= hours)
            size_1++;
        }
        else size_1++;
      }
      console.log("size is",size_1);
      if( parseInt(Math.abs(date_today-date)) >1 )
      {
         if(date_today<=7)
         {
          if(date >=30-(7-date_today))
            size_7++;
         }
         else
         {
          if(date+7 >= date_today)
            size_7++;
         }
      }console.log("size_7 is",size_7)
   }
   }}size_8=total-size_1-size_7;
   document.getElementById("show").innerHTML="No of issues open in last 24 hours are "+size_1+"<br>"+" No of issues open in last 7 days are "+size_7+"<br>"+" No of issues open more than 7 days are"+size_8;

}, function(status) { //error detection....
  alert('Something went wrong.Maybe the following git user/repo does not exists');
  result.innerText='';
document.getElementById("show").innerHTML='';});
}
