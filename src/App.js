import twitterLogo from "./assets/twitter-logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

// Constants
const TWITTER_HANDLE = "thiru_levi";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  //to check if wallet is connected
  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      console.log("phantom wallet is founded");
      const res = await window.solana.connect({ onlyIfTrusted: true });
      console.log(
        "Connect to sol with public key",
        res.publicKey,
        res.publicKey.toString()
      );
      setWalletAddress(res.publicKey.toString());
    } else {
      alert("solana abj not found, install phantom wallet");
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();

      console.log("connected with public key", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const showButton = () => {
    return (
      <button
        className="cta-button connect-wallet-button"
        onClick={connectWallet}
      >
        Connect to wallet
      </button>
    );
  };

  useEffect(() => {
    const onload = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onload);

    return () => window.removeEventListener("load", onload);
  }, []);
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {!walletAddress && showButton()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
