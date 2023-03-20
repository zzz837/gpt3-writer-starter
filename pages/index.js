import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';


const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput,setApiOutput] = useState('');
  const [generating,setGenerating] = useState(false);



  const onUserChangedText = (event) => {
    //console.log(event.target.value);
    setUserInput(event.target.value);
  };



  const callGenerate = async () => {
    setGenerating(true);

    console.log("calling ...");
    const response = await fetch('/api/generate',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userInput} ),
    });

    console.log("waiting ...");

    const data = await response.json();
    const {output} = data;
    console.log(" response is " , output.text);

    setApiOutput(`${output.text}`);

    setGenerating(false);


  }


  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Get a Customized Journal with GPT-3 Tech</h1>
          </div>
          <div className="header-subtitle">
            <h2>The app will generate a personalized journaling experience with GPT-3, enabling users to unlock the secrets of their inner voice and make every journal entry more meaningful.</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea placeholder="start typing here" className="prompt-box" value={userInput} onChange={onUserChangedText}/>
          <div className="prompt-buttons">
            <a className= {generating ? "generate-buttion loading" : "generate-button"} onClick={callGenerate}>
              <div className="generate">
                <p>Generate</p>
      </div>
    </a>
  </div>
        </div>


        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}

      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
