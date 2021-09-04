'use strict';
var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var cookieParser = require('cookie-parser');
var session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');
var ClientOAuth2 = require('client-oauth2')
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);
var flash = require('express-flash');
var env = require('dotenv').config();
var redis = require('redis');
// var redisClient = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});
var REDIS_PORT = process.env.REDIS_PORT;
var REDIS_HOST = process.env.REDIS_HOST;
var redisClient = redis.createClient(REDIS_HOST, REDIS_PORT);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

var jobtrackAuth = new ClientOAuth2({
  clientId: process.env.JOBTRACK_CLIENT_ID,
  clientSecret: process.env.JOBTRACK_CLIENT_SECRET,
  accessTokenUri: 'https://api.jobtrack.io/oauth/token',
  authorizationUri: 'https://api.jobtrack.io/oauth/authorize',
  redirectUri: 'https://jobleads.ngrok.io/auth/jobtrack/callback',
})

// Build the providers/passport config
var config = {};
try {
  config = require('../providers.js');
} catch (err) {
  console.trace(err);
  process.exit(1); // fatal
}
app.middleware('auth', loopback.token({model: app.models.accessToken}));
app.middleware('session:before', cookieParser('job_leads'));
app.middleware('session', session({
  secret: 'job_leads',
  saveUninitialized: true,
  resave: true,
}));
boot(app, __dirname);
passportConfigurator.init();
app.use(flash());
passportConfigurator.setupModels({
  userModel: app.models.user,   // !!!!!!!!!! maybe use this if it us refering to type user
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential
});  //middleware we need!
for (var s in config) {
  var c = config[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
app.set('views', './views');
app.set('view engine', 'ejs');
// app.get('/', (req, res) => {
//   res.render('landing');
// });
app.get('/', (req, res) => {
  res.render('login');
});
app.get('/auth', ensureLoggedIn('/'), (req, res, next) => {
  const User = app.models.user;
  let signedIn = req.accessToken;
  const user = req.user;
  console.log(1,req.user); // pulls all of basic user info (username, candidate, empl, admin, approve, email, id)
  console.log(2,req.accessToken);
  console.log(44,signedIn);
  res.cookie("userId", signedIn.userId, {signed: true, maxAge: signedIn.ttl});
  // isAdminRole(app, req.user, function(status) {
  //   let user = req.user;
  //   user.isAdmin = status;
  //   //console.log(`AND THE USER IS::::: ${JSON.stringify(user)}`);
    res.render('landing', { signedIn,user });
  // });
});

app.post('/auth', (req, res) => {
  const User = app.models.user;
  // Establish a login session
  // provided by loopback User.login() method
  User.login({ email: req.body.email, password: req.body.password }, 'user',
    (err, token) => {
      // Login success callback TODO
      // UserID and access token storge
      if (err) {
        //TODO on login failure
        console.log(err.message);
        res.redirect("back");
      } else {
        //TODO on login success
        console.log("registration login success");
        let signedIn= token;
        res.cookie("userId", signedIn.userId, {signed: true, maxAge: signedIn.ttl});
        const { user } = signedIn.__data;
        console.log(222, signedIn);
        console.log(111, user);
        res.render('landing', { signedIn, user });
      }
    });
});
app.get('/logout/:token', (req, res) => {
  var User = app.models.user;
  User.logout(req.params.token, err =>{
    console.log(err|| 'Logged out');
    if(!err) {
      res.clearCookie("userId");
      res.redirect('/');
    }
  })
})

app.get('/auth/jobtrack', function (req, res) {
  
  var uri = jobtrackAuth.code.getUri()
  //captures code from response to send for token
  res.redirect(uri)
});

app.get('/auth/jobtrack/callback', function (req, res,) {
  console.log(876, res.cookie("userId"));
  
  jobtrackAuth.code.getToken(req.originalUrl)
    .then(function (user) {
      console.log(12, user.data) 
      console.log(13, user)
      return res.send(user.accessToken) //need to store the token into the database.
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.get('/jobtrack', function (req, res) {

  var header = {
    headers: {'Authorization': 'Bearer ' + '6dd90dc63a07859d675a430d50929c9992bf149edf90285ad8d129b6e3886a4d',
    'Content-type': 'application/vnd.api+json'
  }};

var get = {}

var post = {
  "data": {
    "type": "job-applications",
		"attributes": {
      "job-title": "Damn right 7",
			"status": "applied",
			"location": "San Diego",
			"url": "https://jobleads.ngrok.io"
    }
  }
};


// "relationships": { 
//   "company": "Isobar" 
//  }
// axios.get('https://api.jobtrack.io/api/v1/company-masters?autocomplete=Microsoft', header)

// .then( ( response ) => {
//   console.log(98, response.data.data[0] )
//   return res.json(response.data.data[0])
// })
// .catch(function(error) {
//   console.log(99, error);
// });

axios.post('https://api.jobtrack.io/api/v1/job-applications',post, header )

.then( ( response ) => {
  console.log(94, response.data )
  return res.json(response.data)
})
.catch(function(error) {
  console.log(95, error);
});
});

app.get('/signup', (req, res) => {
  res.render('signup')
})
app.post('/signup', (req, res) => {
  var User = app.models.user;
    var RoleMapping = app.models.RoleMapping;
    console.log(req.body.user);
    if (req.body.user == "candidate") { 
      let newUser = {};
      newUser.email = req.body.email.toLowerCase();
      newUser.password = req.body.password;
      newUser.full_name = req.body.fullName;
      newUser.phoneNumber = req.body.phoneNumber;
      newUser.candidate = true
      User.create(newUser, 
        function(err, user) {
          if(err) {
            console.log(err);
            res.redirect('back');
          } else {
            console.log("User has been created:", user);
          }
        RoleMapping.create({principalId: user.id, roleId: "5a4d4896e6d428805e9aec39"},
        function(err, rolemap) {
          if(err) {
            console.log(err);
            return res.redirect('back')
          } else {
            console.log('RoleMapping created:', rolemap)
            return res.redirect('/')
            }
          })
      }) 
    } else if (req.body.user == "employer") {
      let newUser = {};
      newUser.email = req.body.email.toLowerCase();
      newUser.password = req.body.password;
      newUser.full_name = req.body.fullName;
      newUser.phoneNumber = req.body.phoneNumber;
      newUser.employer = true,
      newUser.approved = true
      User.create(newUser, 
        function(err, user) {
          if(err) {
            console.log(err);
            res.redirect('back');
          } else {
            console.log("User has been created:", user);
          }
        RoleMapping.create({principalId: user.id, roleId: "5a4d4896e6d428805e9aec3a"},
        function(err, rolemap) {
          if(err) {
            console.log(err);
            return res.redirect('back');
          } else {
            console.log('RoleMapping created:', rolemap)
            return res.redirect('/');
          }
        })
      })
    }
})
app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
// boot(app, __dirname, function(err) {
//   if (err) throw err;
  // start the server if `$ node server.js`
if (require.main === module){
    app.start();
}

//ADMIN SECTION ---------------------------------------------------------

app.get('/finduser', (req, res) => {
  let User = app.models.user;
  User.find((err, users) => {
    if (err) {
      return console.log("Error in getting history: ", err);
    } else {
      // console.log("Users: ", users);
      res.send(users);
    }
  })
})

app.get('/approveuser/id/:id', (req, res) => {
  let User = app.models.user;
  User.upsertWithWhere({id: req.params.id}, {approved : true}, (err, user) => {
    if (err) {
      return console.log("Error in approving user: ", err);
    } else {
      console.log("User: ", user);
      res.send(user);
    }
  })
})

app.get('/blockuser/id/:id', (req, res) => {
  let User = app.models.user;
  User.upsertWithWhere({id: req.params.id}, {blocked : true}, (err, user) => {
    if (err) {
      return console.log("Error in blocking user: ", err);
    } else {
      console.log("User: ", user);
      res.send(user);
    }
  })
})

//END OF ADMIN SECTION -------------------------------------------------

app.get(`/userId/:userId/`, (req, res) => {
  let History = app.models.History;
  History.find({
    where: {userId: req.params.userId}
  }, (err, histories) => {
    if (err) {
      console.log("Error in getting history: ", err);
    }
    console.log(11, histories);
    let count = 0;
    let promises = [];
    for(let i = 0; i<histories.length; i++){
      var promise = new Promise((resolve, reject)=>{
        const Job = app.models.Job;
        Job.findById(histories[i].jobId, (err, job)=> {
          if (err) {
            console.log("Error in getting job: ", err);
            reject(err);
          } else {
            // console.log("Able to see job: ", job);
            resolve(job);
          }
        })
      })
      promises.push(promise);
    }
    
    Promise.all(promises).then(jobs => {
      var combined = {};
      combined.history = histories;
      combined.jobs = jobs;
      res.send(combined);
    }); 
  })
})

app.get('/history/:type/userId/:userId/token/:token/jobId/:jobId/date/:date', (req, res) => {
  let History = app.models.History;
  console.log(req.params.jobId,"u", req.params.userId );
  let applied= false; let favorite= false; let viewed= false;
  if(req.params.type == 'favorite') favorite = true;
  if(req.params.type == 'applied') applied = true;
  if(req.params.type == 'viewed') viewed = true;
  History.findOrCreate({
    where: {
       and: [
        { jobId: req.params.jobId },
        { userId: req.params.userId }
      ]
    }},
    {
      jobId: req.params.jobId,
      dateTime: req.params.date,
      userId: req.params.userId,
      applied: applied,
      favorite: favorite,
      viewed: viewed,
    }, (err, history, created) => {
      if (err) {
        console.log("History Failed: ", err);
      } else if(created){
        console.log("History created: ", created);
        console.log("History: ", history);
        res.send(history);
      } else {
        console.log("History created: ", created);
        console.log("History: ", history);
        let change = {dateTime: req.params.date}
        if(req.params.type == 'favorite'){ 
          change.favorite = true;
        }
        if(req.params.type == 'applied'){
          change.applied = true;
        }
        if(req.params.type == 'viewed'){
          change.viewed = true;
        }
        console.log(change);
        History.upsertWithWhere({id: history.id},
         change, (err, model) => {
          if (err) {
            console.log("History Failed: ", err);
          } else{
            console.log("MODEL: ", model);
            res.send(model)
          }
         })
        }
      })
});

app.get(`/history/:history`, (req, res) => {
  let History = app.models.History;
  History.destroyById(req.params.history, err => {
    if(err){return console.log('ERROR: ', err);}
    res.send('Confirmed');
  })
})


app.get('/api/authentic/city/:city/', (req, res) => {
  var cacheCheck = req.params.city + '_job_results';
  redisClient.exists(cacheCheck, (err, reply)=>{
    if (reply === 1){
      console.log('true');
      function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) { 
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }
      redisClient.hgetall(cacheCheck, function(err, object) {
        let Job = app.models.Job
        Job.find({where: {city: toTitleCase(object.authentic_jobs)}}, function(err, jobs) {
          if (err) {
          return  console.log("Error in getting jobs: ", err);
          } else {
            console.log("Success! You got jobs from the server!")
            res.send(jobs);
          }
        })
      })
    } else {
      console.log('false');
      var jobResults = {};
      // let type = 
      // req.params.jobType == 'software' ? '2,3,4' :
      // req.params.jobType == 'full+stack' ? '2,4' :
      // req.params.jobType == 'front+end' ? '3,4' : '2';
      function authentic() {
       return axios.get(`http://authenticjobs.com/api/?api_key=${process.env.AUTHENTIC_API_KEY}&method=aj.jobs.search&location=${(req.params.city)}&category=2,3,4&format=json`)
      }
      function zipRecruiter() {
       return axios.get(`https://api.ziprecruiter.com/jobs/v1?search=web+developer&location=${(req.params.city)}&radius_miles=25&days_ago=30&jobs_per_page=100&api_key=${process.env.ZIP_RECRUITER_API_KEY}`)
      }
      axios.all([authentic(), zipRecruiter()])
        .then(axios.spread((auth, zipRec) => {
          jobResults.authentic = auth.data.listings.listing;
          jobResults.zip = zipRec.data.jobs;
          redisClient.hmset(req.params.city + '_job_results', 'authentic_jobs', req.params.city);
          redisClient.expire(req.params.city + '_job_results', process.env.REDIS_CACHE_TIME);
          function jobsToDatabase(app) {
            var Job = app.models.Job;
            jobResults.zip.map(jobs => {
              Job.create({
                "companyName": jobs.hiring_company.name,
                "salaryMin": jobs.salary_min_annual,
                "salaryMax": jobs.salary_max,
                "description": jobs.snippet,
                "description1": "N/A",
                "datePosted": jobs.posted_time,
                "fullTime": true,
                "sourceInfo": jobs.source,
                "jobTitle": jobs.name,
                "city": jobs.city,
                "state": jobs.state,
                "sourceUrl": jobs.url,
                "apiId": jobs.id
                }, (err, jobs) => {
                  if (err) {
                    return console.log("Zip Recruiter job creation error: ", err);
                  } else {
                    console.log("Zip Recruiter job created successfully");
                  }
                })
            })
            jobResults.authentic.map(jobs => {
              Job.create({
                "companyName": jobs.company.name,
                "salaryMin": "N/A",
                "salaryMax": "N/A",
                "description": "N/A",
                "description1": jobs.description,
                "datePosted": jobs.post_date,
                "fullTime": jobs.type.name === "full-time" ? true : false,
                "sourceInfo": "Authentic Jobs",
                "jobTitle": jobs.title,
                "city": jobs.company.location.city,
                "state": jobs.company.location.state,
                "sourceUrl": jobs.url,
                "apiId": jobs.id
              }, (err, jobs) => {
                if (err) {
                  return console.log("Authentic job creation error: ", err);
                } else {
                  console.log("Authentic job created successfully")
                }
              })
            })
          }
          jobsToDatabase(app);
        }))
      .then((relax) => {
        function toTitleCase(str) {
          return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
        }
        let Job = app.models.Job
        Job.find({where: {city: toTitleCase(req.params.city)}}, function(err, jobs) {
          if (err) {
            return console.log("Error in getting jobs: ", err);
          } else {
            res.send(jobs)
          }
        })
      })
    }
  });
})

app.get('/homezip/:homezip/destinationcity/:destinationcity', (req, res) => {
  axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${req.params.homezip}&destinations=${req.params.destinationcity}&key=${process.env.GOOGLE_DISTANCE_MATRIX}`)
    .then((response) => {
      res.send(response.data.rows[0].elements[0].distance.text)
    })
  }
)


app.get('/fulltime/:fulltime/parttime/:parttime/contract/:contract/jobtitle/:jobtitle/company/:company/jobtype/:jobtype/description/:description/salary/:salary/city/:city/state/:state/url/:url/id/:id', 
(req, res) => {
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  var Job = app.models.Job;
    Job.create({
      "fullTime": req.params.fulltime,
      "partTime": req.params.parttime,
      "contract": req.params.contract,
      "jobTitle": req.params.jobtitle,
      "companyName": req.params.company,
      "jobType": req.params.jobtype,
      "description": req.params.description,
      "salary": req.params.salary,
      "city": toTitleCase(req.params.city),
      "state": req.params.state,
      "url": req.params.url,
      "userId": req.params.id,
      "sourceInfo": "JobLeads",
      "hidden": false,
      "datePosted": new Date().toLocaleDateString()
    }, (err, job) => {
      if (err) console.log("Employer job was UNSUCCESSFUL: ", err)
      else {
        console.log("Employer job created successfully: ", job)
        res.send(job);
      }
    })
  })

app.get('/jobsbyemployerid/:id', (req, res) => {
  var Job = app.models.Job;
  Job.find({
    where: {userId: req.params.id}
  }, (err, employerjobs) => {
    if (err) {
      console.log("Error in getting employer jobs: ", err);
    } else {
      res.send(employerjobs)
    }
  })
})

app.get('/archivejob/:id', (req, res) => {
  var Job = app.models.Job;
  Job.findById(req.params.id, (err, job) => {
    if (err) {
      console.log("Error finding job instance: ", err);
    } else {
      job.updateAttribute("hidden", true, (err, attribute) => {
        if (err) {
          console.log("Error archiving job: ", err)
        } else {
          console.log("Job successfully archived. Job will persist in database but will not show up in employer/candidate views.");
          res.send(attribute);
        }
      })
    }
  })
})

app.get('/editemployerjob/fulltime/:fulltime/parttime/:parttime/contract/:contract/jobtitle/:jobtitle/company/:company/jobtype/:jobtype/description/:description/salary/:salary/city/:city/state/:state/url/:url/id/:id/jobid/:jobid',
(req, res) => {
  var Job = app.models.Job;
  Job.findById(req.params.jobid, (err, job) => {
    if (err) {
      console.log("Error in finding job instance: ", err);
    } else {
      job.updateAttributes(
        {
          fullTime: req.params.fulltime,
          partTime: req.params.parttime,
          contract: req.params.contract,
          jobTitle: req.params.jobtitle,
          jobType: req.params.jobtype,
          description: req.params.description,
          salary: req.params.salary,
          city: req.params.city,
          state: req.params.state,
          url: req.params.url
        }, (err, updated) => {
        if (err) {
          console.log("Error updating job: ", err)
        } else {
          console.log("Job updated successfully: ", updated)
          res.send(updated);
        }
      })
    }
  })
})

// app.use(loopback.token({
//   model: app.models.accessToken
// }));