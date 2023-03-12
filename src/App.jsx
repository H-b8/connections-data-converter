import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import './index.css';

const App = () => {

  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [mutuals, setMutuals] = useState();
  const [hasConnections, setHasConnections] = useState(false);
  const [showFollowers, setShowFollowers] = useState(true);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showMutuals, setShowMutuals] = useState(false);
  const [showNonMutuals, setShowNonMutuals] = useState(false);
  const [showInvalid, setShowInvalid] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const { register, handleSubmit } = useForm();

  const handleShowFollowers = () => {
    setShowFollowing(false);
    setShowMutuals(false);
    setShowFollowers(true);
  }

  const handleShowFollowing = () => {
    setShowFollowers(false);
    setShowMutuals(false);
    setShowFollowing(true);
  }

  const handleShowMutuals = () => {
    setShowFollowers(false);
    setShowFollowing(false);
    setShowMutuals(true);
  }

  const handleShowNonMutuals = () => {
    setShowFollowers(false);
    setShowFollowing(false);
    setShowMutuals(false);
    setShowNonMutuals(true);
  }

  let nonMutuals = [];
  // username of someone i'm following
  const handleMutual = (followers, following) => {
    let mutualsArr = [];
    // console.log('following =>', username)
    // const mutual = followers.find(element => element.value === username);
    console.log('what', following)

    for (let i = 0; i < following.length; i++) {
      let isMutual = followers.find(obj => obj.value === following[i].value)
      if (isMutual) {
        mutualsArr.push(following[i].value);
      } else {
        nonMutuals.push(following[i].value);
      }
    }

    setMutuals(mutualsArr);
    console.log('mutuals', mutuals)
    console.log('non mutuals', nonMutuals)
  }
  // following.map(element => handleMutual(element.value)); // invoking function

  const scrollToRef = (ref) => {
    window.scrollTo(0, ref.current.offsetTop);
  }
  const resultsRef = useRef(null);
  const scrollToResults = () => scrollToRef(resultsRef);

  // DEPRECATED
  // const onSubmit = jsonPaste => {
  // 	let connections;
  // 	let tempString = Object.values(jsonPaste)[0];

  // 	try {
  // 		connections = JSON.parse(tempString);
  // 	} catch (e) {
  // 		setShowInvalid(true);
  // 		return;
  // 	}

  //   console.log(connections)

  // 	setFollowers(Object.keys(connections.followers));
  // 	setFollowing(Object.keys(connections.following));
  // 	setHasConnections(true);
  // 	scrollToResults();
  // };

  const onSubmit = jsonPaste => {
    let connections;
    let tempString = Object.values(jsonPaste)[0];

    try {
      connections = JSON.parse(tempString);
    } catch (e) {
      setShowInvalid(true);
      return;
    }

    // console.log(connections.followers) 
    setFollowers(connections.followers);
    setFollowing(connections.following);
    handleMutual(followers, following);
    setHasConnections(true);
    scrollToResults();
  }


  return (
    <>
      <section className="submission-container">
        <div className="form-container">
          <div className="header-container">
            <header>HELLO</header>
            <header>WORLD!</header>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              className="border-box"
              placeholder="PASTE YOUR 'CONNECTIONS.JSON' FILE'S TEXT HERE"
              name="jsonPaste"
              ref={register}
            />
            <button className="white-button" type="submit">VIEW CONNECTIONS</button>
          </form>

          <div className="error-msg">
            {showInvalid &&
              <p>INVALID TEXT, PLEASE TRY AGAIN.</p>
            }
          </div>
        </div>

        <div onClick={() => setShowInstructions(!showInstructions)} className="tool-tip">
          ?
        </div>

        {showInstructions &&
          <ol className="instructions">
            <li>If you haven't already downloaded your IG data, go to your profile and open <b>Settings</b> and then <b>Security</b>. Under <b>Data and History</b>, click <b>Download Data</b> and follow the instructions</li>
            <li>When receiving your email confirmation, follow instructions on downloading your data files to your computer</li>
            <li>Unzip your files</li>
            <li>Open the folder that has <b>part_1</b> at the end of its name</li>
            <li>In this folder, open the file named <b>connections.json</b></li>
            <li>CMD/CTRL+A and COPY the text in this file</li>
            <li>PASTE text into text area of application</li>
            <li>Hit <b>VIEW CONNECTIONS</b>, and voila!</li>
          </ol>
        }
      </section>

      {hasConnections &&
        <>
          <div ref={resultsRef} />
          <div id="results">

            <h1>I LOVE YOU, HAVE A NICE DAY!</h1>

            <button onClick={() => handleShowFollowers()} style={{color: showFollowers ? 'red' : ''}}>FOLLOWERS ({followers.length})</button>
            <button onClick={() => handleShowFollowing()} style={{color: showFollowing ? 'red' : ''}}>FOLLOWING ({following.length})</button>
            <button onClick={() => handleShowMutuals()} style={{color: showMutuals ? 'red' : ''}}>MUTUALS ({mutuals.length})</button>
            <button onClick={() => handleShowNonMutuals()} style={{color: showNonMutuals ? 'red' : ''}}>NOT FOLLOWING BACK ({nonMutuals.length})</button>

            {showFollowers &&
              <div className="container">
                {followers.map(user => {
                  return (
                    <a href={`http://instagram.com/${user.value}`} target="_blank" rel="noopener noreferrer">
                      <p className="ellipsis">{user.value}</p><br />
                    </a>
                  );
                })}
              </div>
            }

            {showFollowing &&
              <div className="container">
                {following.map(user => {
                  return (
                    <>

                      <a href={`http://instagram.com/${user.value}`} target="_blank" rel="noopener noreferrer">
                        <p className="ellipsis">{user.value}</p><br />
                      </a>

                    </>
                  );
                })}
              </div>
            }

            {showMutuals &&
              <div className="container">
                {mutuals.map(user => {
                  return (
                    <a href={`http://instagram.com/${user}`} target="_blank" rel="noopener noreferrer">
                      <p className="ellipsis">{user}</p><br />
                    </a>
                  );
                })}
              </div>
            }
          </div>

          <div className="footer-div">
            <a href="http://github.com/h-b8" className="footer-text" target="_blank" rel="noopener noreferrer">
              <p>MADE BY BAITES</p>
            </a>
          </div>
        </>
      }
    </>
  );
}

export default App;