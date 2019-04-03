import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainFooter.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const mainFooter = props => (
  <footer class="site-footer">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h6>About</h6>
          <p class="text-justify">
            UberSanté.com is an interactive initiative to help clinics with
            scheduling appointments. We focus on providing the most efficient
            code to allow patients to book easily. We will help all clinics
            build up concepts in different scheduling systems that include, but
            aren't limited to HTML, CSS, Bootstrap, JavaScript, PHP, Android,
            SQL and Algorithms.
          </p>
        </div>

        <div class="col-xs-6 col-md-3">
          <h6>Categories</h6>
          <ul class="footer-links">
            <li>
              <a href="http://scanfcode.com/category/c-language/">Book</a>
            </li>
            <li>
              <a href="http://scanfcode.com/category/front-end-development/">
                Search Appointments
              </a>
            </li>
            <li>
              <a href="http://scanfcode.com/category/back-end-development/">
                Doctor Schedule
              </a>
            </li>
            <li>
              <a href="http://scanfcode.com/category/java-programming-language/">
                Nurse Login
              </a>
            </li>
            <li>
              <a href="http://scanfcode.com/category/android/">Android</a>
            </li>
            <li>
              <a href="http://scanfcode.com/category/templates/">Templates</a>
            </li>
          </ul>
        </div>

        <div class="col-xs-6 col-md-3">
          <h6>Quick Links</h6>
          <ul class="footer-links">
            <li>
              <a href="http://scanfcode.com/about/">About Us</a>
            </li>
            <li>
              <a href="http://scanfcode.com/contact/">Contact Us</a>
            </li>
            <li>
              <a href="http://scanfcode.com/contribute-at-scanfcode/">
                Contribute
              </a>
            </li>
            <li>
              <a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a>
            </li>
            <li>
              <a href="http://scanfcode.com/sitemap/">Sitemap</a>
            </li>
            <li>
              <a href="http://scanfcode.com/sitemap/">Administrator</a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-sm-6 col-xs-12">
          <p class="copyright-text">
            Copyright &copy; 2019 All Rights Reserved by
            <a href="#"> UberSanté</a>.
          </p>
        </div>

        <div class="col-md-4 col-sm-6 col-xs-12">
          <ul class="social-icons">
            <li>
              <a class="facebook" href="#">
                <i class="fa fa-facebook" />
              </a>
            </li>
            <li>
              <a class="twitter" href="#">
                <i class="fa fa-twitter" />
              </a>
            </li>
            <li>
              <a class="dribbble" href="#">
                <i class="fa fa-dribbble" />
              </a>
            </li>
            <li>
              <a class="linkedin" href="#">
                <i class="fa fa-linkedin" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default mainFooter;
