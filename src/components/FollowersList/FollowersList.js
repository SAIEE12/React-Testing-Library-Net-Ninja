import React, { useEffect, useState } from 'react';
import "./FollowersList.css";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function FollowersList() {
    const [followers, setFollowers] = useState([]);
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await axios.get("https://randomuser.me/api/?results=5");
                const { data } = response; // Get data from the response
                setFollowers(data.results); // Set the followers
            } catch (error) {
                console.error("Error fetching followers:", error);
                setError("Failed to fetch followers."); // Set error message
            }
        };

        fetchFollowers();
    }, []);

    return (
        <div className="followerslist-container">
            {error && <p>{error}</p>} {/* Display error message if exists */}
            <div>
                {followers.map((follower, index) => (
                    <div 
                        key={follower.login.uuid} // Use a unique key for each follower
                        className="follower-item" 
                        data-testid={`follower-item-${index}`}
                    >
                        <img src={follower.picture.large} alt={`${follower.name.first} ${follower.name.last}`} />
                        <div className="followers-details">
                            <div className="follower-item-name">
                                <h4>{follower.name.first}</h4> <h4>{follower.name.last}</h4>
                            </div>
                            <p>{follower.login.username}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="todo-footer">
                <Link to="/">Go Back</Link>
            </div>
        </div>
    );
}
