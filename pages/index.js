import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  /**
   * Challenge 1: Using hooks, track the state of the text in the textarea on every keystroke
   * To verify it's working, you could just console.log the state on every change
   */

  const [timeLeft, setTimeLeft] = useState(10);
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);
  const [isTimerRunning, setTimerRunning] = useState(false);

  /**
   * Challenge 2:
   *
   * Create a function to calculate the number of separate words in the `text` state
   * For now, just console.log the word count when the button gets clicked to test it out.
   *
   */

  const CountWords = (event) => {
    setText(event.target.value);
    setCount(text.split(/\s+/).length);
  };

  /**
   *
   * Challenge 3:
   * 1. Using the useEffect hook implement a countown timer
   * 2. Create state to hold the current value of the countdown timer.
   * Display this time in the "Time Remaining" header
   */

  useEffect(() => {
    if (timeLeft > 0 && isTimerRunning) {
      const countdown = setTimeout(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    } else if (timeLeft <= 0) {
      setTimerRunning(false);
      // display result
      alert(`Time's Up: You typed ${count} words in 10 seconds`);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (isTimerRunning) {
      setTimeLeft((timeLeft) => timeLeft - 1);
    } else {
      //reset timer
      setTimeLeft(10);
      setText('');
    }
  }, [isTimerRunning]);

  /**
   * Challenge 4:
   *
   * Make it so clicking the Start button starts the timer instead of it starting on refresh
   * (Hint: use a new state variable to indicate if the game should be running or not)
   */

  /**
   * Challenge 5:
   *
   * When the timer reaches 0, count the number of words the user typed in
   * and display it in the "Word count" section
   */

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>How fast can you type?</h1>
      <textarea
        onChange={CountWords}
        value={text}
        name=""
        id=""
        rows="10"
        className={styles.textarea}
      />

      <h2>Time Remaining: {timeLeft}</h2>
      <button onClick={() => setTimerRunning(true)} className={styles.button}>
        Begin
      </button>
      <h1>Word Count: {count}</h1>
    </div>
  );
}
