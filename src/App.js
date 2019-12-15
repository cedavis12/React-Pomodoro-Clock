import React, { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <nav className='h1 navbar text-white mx-auto display-3' id='header'>
        Pomodoro Clock
      </nav>
      <div className='container text-center'>
        <div id='time'>
          <h2 id='session-label' class='mt-5 display-4'>
            Session Length
          </h2>
          <a
            href='#'
            className='btn btn-outline-light btn-lg m-3'
            id='sessionDecrement'
          >
            -
          </a>
          <span id='sessionLength' class='lead'>
            25
          </span>
          <a
            href='#'
            className='btn btn-outline-light btn-lg m-3'
            id='sessionIncrement'
          >
            +5
          </a>
          <br />
          <a href='#' className='btn btn-warning text-white btn-lg' id='reset'>
            Reset Timer
          </a>
        </div>
        <div id='break'>
          <h2 id='break-label' className='mt-5 display-4'>
            Break Length
          </h2>
          <a
            href='#'
            className='btn btn-outline-light btn-lg m-3'
            id='subtractFiveBreak'
          >
            -5
          </a>
          <span id='break-length' className='lead'>
            5
          </span>
          <a
            href='#'
            className='btn btn-outline-light btn-lg m-3'
            id='addFiveBreak'
          >
            +5
          </a>
        </div>
        <a href='#' className='btn btn-success btn-lg' id='start'>
          Start
        </a>
      </div>
      <nav
        className='h1 navbar text-white fixed-bottom my-0 mx-auto'
        id='footer'
      >
        Coded by Courtney Davis
      </nav>
    </Fragment>
  );
}

export default App;
