/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import LoginForm from './login-form';
import RegistrationForm from './registration-form';
import './css/landingpage.css';

const fullpageOptions = {
//   anchors: ['firstPage', 'secondPage', 'thirdPage'],
  sectionsColor: ['#e6e35b', '#43a0e4', '#0798ec'],
  //'#ff5d5d'
//  #5b78e6 #e6e35b
//   callbacks: ['onLeave'],
  licenseKey:'OPEN-SOURCE-GPLV3-LICENSE',
  verticalCentered: true
};

const FullpageWrapper = (fullpageProps) => (
  <ReactFullpage
    {...fullpageProps}
    {...fullpageOptions}
    render={({ state, fullpageApi }) => {
      console.log('render prop change', state); // eslint-disable-line no-console
      let element = document.getElementById("button_container");
      let element2 = document.getElementById("login_container");
      let element3 = document.getElementById("registration_container");
      let titleElem = document.getElementById("homepage-title");
     
     const toggleLoginContainer = ()=>{
        console.log('hide');
        console.log('PROPS',fullpageProps);
        element.classList.toggle('hide');
      
        element2.classList.toggle('show');
      }

     const toggleRegistrationContainer =()=>{
        element.classList.toggle('hide');
       
        element3.classList.toggle('show');

      }
 
    // If we are logged in redirect straight to the user's dashboard
    if (fullpageProps.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

      return (
        <div id="fullpage-wrapper">
          <div className="section section1 ">
          <main id="homepage-title" className="title center-both">
             <header id="home-header" >
             <div id="left_side">
             <div id="bunny2" >
                    <img className="jump2" src="../../assets/bunny2.png"/>
                    <img className="jump" src="../../assets/bunny1.png"/>
            </div>
             <h1>bunny babble  </h1>
             
             </div>


             <div id="right_side">
             
                    <div id="button_container" >
                        {/* <Link to="/register"></Link> */}
                        <button className="button1" onClick={()=>toggleLoginContainer()}>Login</button>
                    <button className="button1" onClick={()=>toggleRegistrationContainer()}>Register</button>
                    
                    
                    </div>

                    <div id="login_container" className="fade-in" >
                        <LoginForm cancelHandler={()=>toggleLoginContainer()}/>
                    </div>

                    <div id="registration_container" className="fade-in" >
                        <RegistrationForm cancelHandler={()=>toggleRegistrationContainer()}/>
                    </div>

             
             </div> 
                      
            
                   
              </header>

                      

            </main>

     
           

          <div className="more_info_container">
                <span className="more_info">
                    <a href="#" onClick={() => fullpageApi.moveSectionDown()}>
                    What is bunny babble?
                    </a>
                </span>
            </div>
         
          </div>
          <div className="section">
            <div className="slide">
              {/* <h3>Slide 2.1</h3> */}
              <div className="info">
               <h2>Learn Lapine.</h2>
               <p>Lapine is a fictional language created by author Richard Adams for his 1972 novel Watership Down, where it is spoken by rabbit characters. 
                   Now with bunny babble you can learn the secret language of the bunnies!
               </p>
             
           </div>
            </div>
            <div className="slide">
                 <div className="info">
                    <h2>Spaced Learning.</h2>
                    <p>Bunny babble uses a unique spaced repetition algorithm so that you can effectively memorize vocabulary.
                      Words that you have trouble with will appear more frequently, while words that you know are shown less.
                      
                    </p>
                </div>
            </div>
            <div className="slide">
            <div className="info">
                    <h2>Keep track of your progress.</h2>
                    <p>Each time you answer a question, your response and accuracy for each word are recorded. 
                      Check out your stats page to see how you are doing - you'll be surprised how quick you improve!
                      
                    </p>
                </div>
            </div>
          </div>
          <div className="section">
          <div className="info">
                    <h2>Created with Care.</h2>
                    <p>Bunny Babble was created by Kaitlin Bunn and Donny Cheng in one week as part of the Thinkful Engineering Immersion program.
                        Feel free to contact us about any questions!

                      
                    </p>
                </div>
          </div>
        </div>
      );
    }}
  />
);

// ReactDOM.render(
//   <FullpageWrapper {...fullpageOptions} />,
//   document.getElementById('root'),
// );

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});


export default connect(mapStateToProps)(FullpageWrapper);