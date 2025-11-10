import React from "react";
import { Link } from "react-router-dom";

const Resources = () => {
  return (
    <>
      <main className="resources max padding spacer">
        <h1>LSAT Prep Made Easy: Free Expert Resources</h1>
        <ul className="blog-list spacer">
         
          <li className="resource">
              <img src="assets/redirect-icon.png" alt="redirect icon" className="redirect" />
              <Link to="/sufficient_assumption" className="resource-link">
                A Simple Way to Level up Your Sufficient Assumption Approach
              </Link>
          </li>
          <li className="resource">
          <img src="assets/redirect-icon.png" alt="redirect icon" className="redirect" />
            <Link to="/indicator_words" className="resource-link">
            Indicator Words as Essential Fundamentals
            </Link>
          </li>
          <li className="resource">
          <img src="assets/redirect-icon.png" alt="redirect icon" className="redirect" />
            <Link to="/abc" className="resource-link">
              The ABCs of Applying to Law School
            </Link>
          </li>
          <li className="resource">
          <img src="assets/redirect-icon.png" alt="redirect icon" className="redirect" />
            <Link to="/patterns" className="resource-link">
              Some Patterns That Jump Out After 15 Years of Tutoring
            </Link>
          </li>
          <li className="resource">
          <img src="assets/redirect-icon.png" alt="redirect icon" className="redirect" />
            <Link to="/lsat-quizlet" className="resource-link">
              LSAT Quizlet
            </Link>
          </li>
          <li className="resource">
          <img src="assets/redirect-icon.png" alt="redirect icon" className="redirect" />
            <Link to="/discord" className="resource-link">
              Join our Discord Server
            </Link>
          </li>
          
          
        </ul>
      </main>
    </>
  );
};

export default Resources;
