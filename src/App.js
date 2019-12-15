import React from 'react';
import moment from 'moment';

function Header() {
  return (
    <nav className='h1 navbar text-white mx-auto display-3' id='header'>
      Pomodoro Clock
    </nav>
  );
}

function Footer() {
  return (
    <nav className='h1 navbar text-white fixed-bottom my-0 mx-auto' id='footer'>
      Coded by Courtney Davis
    </nav>
  );
}

const Timer = ({ mode, time }) => (
  <div className='timer'>
    <h1 id='timer-label' className='my-3 display-3 lead'>
      {mode === 'session' ? 'Session' : 'Break'}
    </h1>
    <h2 id='time-left' className='my-2 display-3'>
      {time}
    </h2>
  </div>
);

const Controls = ({ active, handleReset, handlePlayPause }) => (
  <div className='Controls'>
    <button
      id='start_stop'
      onClick={handlePlayPause}
      className='btn btn-lg btn-primary mx-2'
    >
      {active ? <span>Stop</span> : <span>Start</span>}
    </button>
    <button id='reset' onClick={handleReset} className='btn btn-lg btn-warning'>
      Reset
    </button>
  </div>
);

function Session({ handleClick, type, sessionValue }) {
  return (
    <div id='time' className='col-sm-6'>
      <h2 id='session-label' className='mt-5'>
        Session Length
      </h2>
      <button
        className='btn btn-outline-light btn-lg m-3'
        id='session-decrement'
        onClick={() => handleClick(false, `${type}Value`)}
      >
        -
      </button>
      <span id='session-length' className='lead'>
        {sessionValue}
      </span>
      <button
        href='#'
        className='btn btn-outline-light btn-lg m-3'
        id='session-increment'
        onClick={() => handleClick(true, `${type}Value`)}
      >
        +
      </button>
    </div>
  );
}

function Break({ handleClick, type, breakValue }) {
  return (
    <div id='break' className='col-sm-6'>
      <h2 id='break-label' className='mt-5'>
        Break Length
      </h2>
      <button
        href='#'
        className='btn btn-outline-light btn-lg m-3'
        id='break-decrement'
        onClick={() => handleClick(false, `${type}Value`)}
      >
        -
      </button>
      <span id='break-length' className='lead'>
        {breakValue}
      </span>
      <button
        href='#'
        className='btn btn-outline-light btn-lg m-3'
        id='break-increment'
        onClick={() => handleClick(true, `${type}Value`)}
      >
        +
      </button>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakValue: 5,
      sessionValue: 25,
      time: 25 * 60 * 1000,
      active: false,
      mode: 'session',
      touched: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.time === 0 && prevState.mode === 'session') {
      this.setState({ time: this.state.breakValue * 60 * 1000, mode: 'break' });
      this.audio.play();
    }
    if (prevState.time === 0 && prevState.mode === 'break') {
      this.setState({
        time: this.state.sessionValue * 60 * 1000,
        mode: 'session'
      });
      this.audio.play();
    }
  }

  handleSetTimers = (inc, type) => {
    if (inc && this.state[type] === 60) return;
    if (!inc && this.state[type] === 1) return;
    this.setState({ [type]: this.state[type] + (inc ? 1 : -1) });
  };

  handlePlayPause = () => {
    if (this.state.active) {
      this.setState({ active: false }, () => clearInterval(this.pomodoro));
    } else {
      if (!this.state.touched) {
        this.setState(
          {
            time: this.state.sessionValue * 60 * 1000,
            active: true,
            touched: true
          },
          () =>
            (this.pomodoro = setInterval(
              () => this.setState({ time: this.state.time - 1000 }),
              1000
            ))
        );
      } else {
        this.setState(
          {
            active: true,
            touched: true
          },
          () =>
            (this.pomodoro = setInterval(
              () => this.setState({ time: this.state.time - 1000 }),
              1000
            ))
        );
      }
    }
  };

  handleReset = () => {
    this.setState({
      breakValue: 5,
      sessionValue: 25,
      time: 25 * 60 * 1000,
      active: false,
      mode: 'session',
      touched: false
    });
    this.audio.pause();
    this.audio.currentTime = 0;
    clearInterval(this.pomodoro);
  };

  render() {
    return (
      <div>
        <Header />
        <div className='container text-center'>
          <div className='row'>
            <Break
              type='break'
              breakValue={this.state.breakValue}
              handleClick={this.handleSetTimers}
            />
            <Session
              type='session'
              sessionValue={this.state.sessionValue}
              handleClick={this.handleSetTimers}
            />
          </div>
          <Timer
            mode={this.state.mode}
            time={moment(this.state.time).format('mm:ss')}
          />
          <Controls
            active={this.state.active}
            handleReset={this.handleReset}
            handlePlayPause={this.handlePlayPause}
          />
          <audio
            id='beep'
            src='https://s3-us-west-1.amazonaws.com/benjaminadk/Data+synth+beep+high+and+sweet.mp3'
            ref={ref => (this.audio = ref)}
          ></audio>
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
