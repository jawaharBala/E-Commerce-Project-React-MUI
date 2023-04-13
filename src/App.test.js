import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('App tests', () => {
    it('should contains the heading 1', () => {
    render(<App />);
        const heading = screen.getByText(/Hello world! I am using React/i);
        expect(heading).toBeInTheDocument()
    });
    // it("renders without crashing", () => {
    //   shallow(<App />);
    // });
    
    // it("renders Account header", () => {
    //   const wrapper = shallow(<App />);
    //   const welcome = <h1>Display Active Users Account Details</h1>;
    //   expect(wrapper.contains(welcome)).toEqual(true);
    // });

    
    
});