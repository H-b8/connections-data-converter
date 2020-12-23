import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import './index.css';

const App = () => {
	const [hasConnections, setHasConnections] = useState(false);
	const [followers, setFollowers] = useState();
	const [following, setFollowing] = useState();
	const [showFollowers, setShowFollowers] = useState(true);
	const [showFollowing, setShowFollowing] = useState(false);
	const [showMutuals, setShowMutuals] = useState(false);

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

	const { register, handleSubmit } = useForm();

	const scrollToRef = (ref) => {
		window.scrollTo(0, ref.current.offsetTop);
	}
	const resultsRef = useRef(null);
	const scrollToResults = () => scrollToRef(resultsRef);

	const onSubmit = jsonPaste => {
		let tempString = Object.values(jsonPaste)[0]
		let connections = JSON.parse(tempString)
		setFollowers(Object.keys(connections.followers));
		setFollowing(Object.keys(connections.following));
		setHasConnections(true);
		scrollToResults();
	};

	let mutuals = [];
	const handleMutual = userHandle => {
		const mutual = followers.find(element => element === userHandle);
		if (mutual) {
			mutuals.push(userHandle)
			return true;
		} else {
			return false;
		}
	}

	if (following) following.map(user => handleMutual(user));


	return (
		<>
			<div id="submission">
				<p id="header-text"><b>STEP 1:</b> Download // <b>STEP 2:</b> Unzip and open the folder with "part_1" at the end // <b>STEP 3:</b> Open the file "connections.json"</p>
				<header>HELLO WORLD!</header>
				<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
					<textarea
						id="paste"
						placeholder="STEP 4: COPY+PASTE THE TEXT FROM YOUR CONNECTIONS.JSON FILE HERE"
						name="jsonPaste"
						ref={register}
					/>
					<button id="white-button" type="submit">VIEW CONNECTIONS</button>

				</form>
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
											<p>{user}</p>
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
												<p>{user}</p>
											</a>
										}
										{showFollowing &&
											<a href={`http://instagram.com/${user}`} target="_blank" rel="noopener noreferrer">
												<p>{user}</p>
											</a>
										}
									</>
								);
							})}
						</div>
					</div>

					<div id="footer-div">
						<a href="http://github.com/h-b8/" id="footer-text" target="_blank" rel="noopener noreferrer">
							<p>MADE BY BAITES</p>
						</a>
					</div>
				</>
			}
		</>
	);
}

export default App;
