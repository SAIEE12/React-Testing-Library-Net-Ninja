import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FollowersList from '../FollowersList';
import axios from 'axios';

// Mock the axios module at the top level
jest.mock('axios');

const MockFollowersList = () => {
    return (
        <BrowserRouter>
            <FollowersList />
        </BrowserRouter>
    );
};

describe("FollowersList", () => {
    beforeEach(() => {
        // Clear previous mocks before each test
        jest.clearAllMocks();
    });

    it('should fetch and render follower items', async () => {
        // Mock the response from axios
        axios.get.mockResolvedValueOnce({
            data: {
                results: [
                    {
                        login: { uuid: '1', username: 'user1' },
                        name: { first: 'John', last: 'Doe' },
                        picture: { large: 'https://randomuser.me/api/portraits/men/1.jpg' },
                    },
                ],
            },
        });

        render(<MockFollowersList />);

        // Check if the follower item is rendered
        const followerDivElement = await screen.findByTestId('follower-item-0');
        expect(followerDivElement).toBeInTheDocument();
    });

    it('should display an error message when the fetch fails', async () => {
        // Mock the error response
        axios.get.mockRejectedValueOnce(new Error('Failed to fetch followers'));

        render(<MockFollowersList />);

        // Check if the error message is displayed
        const errorMessage = await screen.findByText('Failed to fetch followers.');
        expect(errorMessage).toBeInTheDocument();
    });
});
