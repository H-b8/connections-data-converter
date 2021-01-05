import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import './index.css';

const App = () => {

	const [followers, setFollowers] = useState();
	const [following, setFollowing] = useState();
	const [hasConnections, setHasConnections] = useState(false);
	const [showFollowers, setShowFollowers] = useState(true);
	const [showFollowing, setShowFollowing] = useState(false);
	const [showMutuals, setShowMutuals] = useState(false);
	const [showInvalid, setShowInvalid] = useState(false);
	const [showInstructions, setShowInstructions] = useState(false);

	const { register, handleSubmit } = useForm();

	const handleShowInstructions = () => {
		setShowInstructions(true);
	}

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

	let mutuals = [];
	const handleMutual = username => {
		const mutual = followers.find(element => element === username);
		if (mutual) {
			mutuals.push(username)
			return true;
		} else {
			return false;
		}
	}

	if (following) following.map(user => handleMutual(user));

	const scrollToRef = (ref) => {
		window.scrollTo(0, ref.current.offsetTop);
	}
	const resultsRef = useRef(null);
	const scrollToResults = () => scrollToRef(resultsRef);

	const onSubmit = jsonPaste => {
		let connections;
		let tempString = Object.values(jsonPaste)[0];

		try {
			connections = JSON.parse(tempString);
		} catch (e) {
			setShowInvalid(true);
			return;
		}

		setFollowers(Object.keys(connections.followers));
		setFollowing(Object.keys(connections.following));
		setHasConnections(true);
		scrollToResults();
	};


	return (
		<>
			<div id="submission">
				<header>HELLO WORLD!</header>
				<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
					<textarea
						id="paste"
						placeholder="PASTE YOUR 'CONNECTIONS.JSON' FILE'S TEXT HERE"
						name="jsonPaste"
						ref={register}
					/>
					<button id="white-button" type="submit">VIEW CONNECTIONS</button>
				</form>
				<div style={{ height: '1rem', marginTop: '1rem' }}>
					{showInvalid &&
						<p style={{ color: 'red' }}>INVALID TEXT, PLEASE TRY AGAIN.</p>
					}
				</div>
				<div onClick={() => handleShowInstructions()} style={{cursor: 'pointer'}}>
					<div className="help-div">
						?
					</div>
				</div>
				{showInstructions &&
					<div className="instructions">
						1. If you haven't already downloaded your IG data, go to your profile and open <b>Settings</b> and then <b>Security</b>. Under <b>Data and History</b>, click <b>Download Data</b> and follow the instructions<br/><br/>
						2. When receiving your email confirmation, follow instructions on downloading your data files to your computer<br/><br/>
						3. Unzip your files<br/><br/>
						4. Open the folder that has <b>part_1</b> at the end of its name<br/><br/>
						5. In this folder, open the file named <b>connections.json</b><br/><br/>
						6. CMD/CTRL+A and COPY the text in this file<br/><br/>
						7. PASTE text into text area of application<br/><br/>
						8. Hit <b>VIEW CONNECTIONS</b>, and voila!<br/><br/>
					</div>
				}

			</div>

			{hasConnections &&
				<>
					<div ref={resultsRef} />
					<div id="results">

						<h1>I LOVE YOU, HAVE A NICE DAY!</h1>

						<button onClick={() => handleShowFollowers()}>FOLLOWERS ({followers.length})</button>
						<button onClick={() => handleShowFollowing()}>FOLLOWING ({following.length})</button>
						<button onClick={() => handleShowMutuals()}>MUTUALS ({mutuals.length})</button>

						{showFollowers &&
							<div className="container">
								{followers.map(user => {
									return (
										<a href={`http://instagram.com/${user}`} target="_blank" rel="noopener noreferrer">
											<p>{user}</p><br />
										</a>
									);
								})}
							</div>
						}

						<div className="container">
							{following.map(user => {
								return (
									<>
										{showMutuals && handleMutual(user) &&
											<a href={`http://instagram.com/${user}`} target="_blank" rel="noopener noreferrer">
												<p>{user}</p><br />
											</a>
										}
										{showFollowing &&
											<a href={`http://instagram.com/${user}`} target="_blank" rel="noopener noreferrer">
												<p>{user}</p><br />
											</a>
										}
									</>
								);
							})}
						</div>
					</div>

					<div className="footer-div">
						<a href="http://h-b8.github.io/connections-data-converter" className="footer-text" target="_blank" rel="noopener noreferrer">
							<p>MADE BY BAITES</p>
						</a>
					</div>
				</>
			}
		</>
	);
}

export default App;
