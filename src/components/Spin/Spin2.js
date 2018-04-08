// @flow
import * as React from 'react';
import styled from 'styled-components';

/* colors of monokai: http://www.colourlovers.com/palette/1718713/Monokai
    orchid(pink): #F92672
    bounded rationality (blue): #66D9EF
    henn1nk (green): #A6E22E
    pumpkin spice (orange): #FD971F 
*/

const Spin = () => (
  <Container className="loader-container">
    <div className="group-1">
      <div className="line line1">
        <div className="dash dash-1 exp-40 div" />
        <div className="dash dash-2 exp-70 class-name" />
        <div className="dash dash-3 exp-110 class" />
        <div className="dash dash-4 exp-70 class" />
      </div>
      <div className="line line2">
        <div className="dash dash-1 exp-40 div" />
        <div className="dash dash-2 exp-70 class-name" />
        <div className="dash dash-3 exp-90 class" />
      </div>
      <div className="line line3">
        <div className="dash dash-1 exp-300 par" />
      </div>
      <div className="line line4">
        <div className="dash dash-1 exp-200 par" />
      </div>
      <div className="line line5">
        <div className="dash dash-1 exp-40 div" />
      </div>
      <div className="line line6">
        <div className="dash dash-1 exp-40 div" />
      </div>
    </div>

    <div className="group-2">
      <div className="line line1">
        <div className="dash dash-1 div" />
        <div className="dash dash-2 class-name" />
        <div className="dash dash-3 class" />
        <div className="dash dash-4 class" />
      </div>
      <div className="line line2">
        <div className="dash dash-1 div" />
        <div className="dash dash-2 exp70 class-name" />
        <div className="dash dash-3 exp90 class" />
      </div>
      <div className="line line3">
        <div className="dash dash-1 par" />
      </div>
      <div className="line line4">
        <div className="dash dash-1 par" />
      </div>
      <div className="line line5">
        <div className="dash dash-1 div" />
      </div>
      <div className="line line6">
        <div className="dash dash-1 div" />
      </div>
    </div>
  </Container>
);

const colors = {
  orchid: '#f92672',
  br_blue: '#66d9ef',
  henn1nk: '#a6e22e',
  spice: '#fd971f',
  classColour: '#ffe792',
  parColour: '#f8f8f2',
};

const Container = styled.div`
  width: 400px;
  height: 175px;
  margin: auto;
  margin-top: 30vh;
  overflow: hidden;
  :root {
  }
  .line {
    margin-top: 5px;
  }
  .dash {
    height: 20px;
    display: inline-block;
    border-radius: 10px;
  }
  .div {
    background: ${colors.orchid};
  }
  .class-name {
    background: ${colors.henn1nk};
  }
  .class {
    background: ${colors.classColour};
  }
  .par {
    background: ${colors.parColour};
  }
  .exp-40 {
    animation: expand-40 0.2s linear forwards;
  }
  .exp-70 {
    animation: expand-70 0.2s linear forwards;
  }
  .exp-90 {
    animation: expand-90 0.2s linear forwards;
  }
  .exp-110 {
    animation: expand-110 0.2s linear forwards;
  }
  .exp-200 {
    animation: expand-200 0.2s linear forwards;
  }
  .exp-300 {
    animation: expand-300 0.2s linear forwards;
  }
  .line1 .dash-1 {
    /*animation-delay: 0.1s;*/
  }
  .line1 .dash-2 {
    animation-delay: 0.1s;
  }
  .line1 .dash-3 {
    animation-delay: 0.2s;
  }
  .line1 .dash-4 {
    animation-delay: 0.3s;
  }
  .line2 {
    margin-left: 10%;
  }
  .line2 .dash-1 {
    animation-delay: 0.4s;
  }
  .line2 .dash-2 {
    animation-delay: 0.5s;
  }
  .line2 .dash-3 {
    animation-delay: 0.6s;
  }
  .line3 {
    margin-left: 20%;
  }
  .line3 .dash-1 {
    animation-delay: 0.7s;
  }
  .line4 {
    margin-left: 20%;
  }
  .line4 .dash-1 {
    animation-delay: 0.8s;
  }
  .line5 {
    margin-left: 10%;
  }
  .line5 .dash-1 {
    animation-delay: 0.85s;
  }
  .line6 .dash-1 {
    animation-delay: 0.925s;
  }
  .group-1 {
    animation: scroll 1s linear infinite;
    animation-delay: 1s;
    position: relative;
  }
  .group-2 {
    animation: scroll 1s linear infinite;
    animation-delay: 1s;
    position: relative;
  }
  .group-2 .line1 .dash-1 {
    animation: line1dash1 1s linear infinite;
  }
  .group-2 .line1 .dash-2 {
    animation: line1dash2 1s linear infinite;
  }
  .group-2 .line1 .dash-3 {
    animation: line1dash3 1s linear infinite;
  }
  .group-2 .line1 .dash-4 {
    animation: line1dash4 1s linear infinite;
  }
  .group-2 .line2 .dash-1 {
    animation: line2dash1 1s linear infinite;
  }
  .group-2 .line2 .dash-2 {
    animation: line2dash2 1s linear infinite;
  }
  .group-2 .line2 .dash-3 {
    animation: line2dash3 1s linear infinite;
  }
  .group-2 .line3 .dash-1 {
    animation: line3dash1 1s linear infinite;
  }
  .group-2 .line4 .dash-1 {
    animation: line4dash1 1s linear infinite;
  }
  .group-2 .line5 .dash-1 {
    animation: line5dash1 1s linear infinite;
  }
  .group-2 .line6 .dash-1 {
    animation: line6dash1 1s linear infinite;
  }

  /*keyframes for group2*/
  @keyframes line1dash1 {
    0% {
      width: 0px;
    }
    20% {
      width: 40px;
    }
    100% {
      width: 40px;
    }
  }
  @keyframes line1dash2 {
    0% {
      width: 0px;
    }
    10% {
      width: 0px;
    }
    30% {
      width: 70px;
    }
    100% {
      width: 70px;
    }
  }
  @keyframes line1dash3 {
    0% {
      width: 0px;
    }
    20% {
      width: 0px;
    }
    40% {
      width: 110px;
    }
    100% {
      width: 110px;
    }
  }
  @keyframes line1dash4 {
    0% {
      width: 0px;
    }
    30% {
      width: 0px;
    }
    50% {
      width: 70px;
    }
    100% {
      width: 70px;
    }
  }
  @keyframes line2dash1 {
    0% {
      width: 0px;
    }
    40% {
      width: 0px;
    }
    60% {
      width: 40px;
    }
    100% {
      width: 40px;
    }
  }
  @keyframes line2dash2 {
    0% {
      width: 0px;
    }
    50% {
      width: 0px;
    }
    70% {
      width: 70px;
    }
    100% {
      width: 70px;
    }
  }
  @keyframes line2dash3 {
    0% {
      width: 0px;
    }
    60% {
      width: 0px;
    }
    80% {
      width: 90px;
    }
    100% {
      width: 90px;
    }
  }
  @keyframes line3dash1 {
    0% {
      width: 0px;
    }
    60% {
      width: 0px;
    }
    80% {
      width: 300px;
    }
    100% {
      width: 300px;
    }
  }
  @keyframes line4dash1 {
    0% {
      width: 0px;
    }
    70% {
      width: 0px;
    }
    90% {
      width: 200px;
    }
    100% {
      width: 200px;
    }
  }
  @keyframes line5dash1 {
    0% {
      width: 0px;
    }
    75% {
      width: 0px;
    }
    85% {
      width: 40px;
    }
    100% {
      width: 40px;
    }
  }
  @keyframes line6dash1 {
    0% {
      width: 0px;
    }
    85% {
      width: 0px;
    }
    100% {
      width: 40px;
    }
  }
  @keyframes expand-40 {
    from {
      width: 0px;
    }
    to {
      width: 40px;
    }
  }
  @keyframes expand-70 {
    from {
      width: 0px;
    }
    to {
      width: 70px;
    }
  }
  @keyframes expand-90 {
    from {
      width: 0px;
    }
    to {
      width: 90px;
    }
  }
  @keyframes expand-110 {
    from {
      width: 0px;
    }
    to {
      width: 110px;
    }
  }
  @keyframes expand-200 {
    from {
      width: 0px;
    }
    to {
      width: 200px;
    }
  }
  @keyframes expand-300 {
    from {
      width: 0px;
    }
    to {
      width: 300px;
    }
  }
  @keyframes scroll {
    from {
      top: 0px;
    }
    to {
      top: -175px;
    }
  }
`;

export default Spin;
