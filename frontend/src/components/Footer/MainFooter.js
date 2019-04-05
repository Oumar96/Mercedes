import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainFooter.css';
import 'font-awesome/css/font-awesome.min.css';
import Grid from '@material-ui/core/Grid';

const mainFooter = props => (
  <footer class="site-footer">
    <div>
      <Grid container spacing={24}>
        <Grid item xs={4}>
          <h6>About</h6>
          <p class="text-justify">
            UberSanté.com is an interactive initiative to help clinics with
            scheduling appointments. We focus on providing the most efficient
            code to allow patients to book easily. We will help all clinics
            build up concepts in different scheduling systems that include, but
            aren't limited to HTML, CSS, Bootstrap, JavaScript, PHP, Android,
            SQL and Algorithms.
          </p>
          <ul class="social-icons">
            <li>
              <a class="facebook" href="https://www.google.ca/">
                <i class="fa fa-facebook" />
              </a>
            </li>
            <li>
              <a class="twitter" href="https://www.google.ca/">
                <i class="fa fa-twitter" />
              </a>
            </li>
            <li>
              <a class="dribbble" href="https://www.google.ca/">
                <i class="fa fa-dribbble" />
              </a>
            </li>
            <li>
              <a class="linkedin" href="https://www.google.ca/">
                <i class="fa fa-linkedin" />
              </a>
            </li>
          </ul>
        </Grid>
        <Grid item xs={4}>
          <h6>Categories</h6>
          <ul class="footer-links">
            <li>
              <a href="https://www.google.ca/">Book</a>
            </li>
            <li>
              <a href="https://www.google.ca/">Search Appointments</a>
            </li>
            <li>
              <a href="https://www.google.ca/">Doctor Schedule</a>
            </li>
            <li>
              <a href="https://www.google.ca/">Nurse Login</a>
            </li>
            <li>
              <a href="https://www.google.ca/">Android</a>
            </li>
            <li>
              <a href="https://www.google.ca/">Templates</a>
            </li>
          </ul>
        </Grid>
        <Grid item xs={4}>
          <h6>Quick Links</h6>
          <ul class="footer-links">
            <li>
              <a href="https://www.google.ca/">About Us</a>
            </li>
            <li>
              <a href="https://www.google.ca/">Contact Us</a>
            </li>
            <li>
              <a href="https://www.google.ca/">Contribute</a>
            </li>
            <li>
              <a href="https://www.google.ca/">Privacy Policy</a>
            </li>
            <li>
              <a href="https://www.google.ca/">Sitemap</a>
            </li>
            <li>
              <NavLink to="/admin">Administrator</NavLink>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12}>
          <p class="copyright-text">
            Copyright &copy; 2019 All Rights Reserved by
            <a href="https://www.google.ca/"> UberSanté</a>.
          </p>
        </Grid>
      </Grid>
    </div>
  </footer>
);

export default mainFooter;
