import { Anchor } from './CustomHtml';
import ReactGA from 'react-ga4';

function Footer(): JSX.Element {
  return (
    <>
      <div className="w-full flex mt-4">
        <button
          onClick={() => {
            window.open('https://ubuntu.vivek9patel.com');
            ReactGA.event({
              category: 'Button.Click',
              action: 'Boot Ubuntu',
            });
          }}
          className="btnWithSlider mx-2 sm:mx-10 flex-1 text-center btn--light"
        >
          <span className="sliderWrapper">
            <span className="btnSlider"></span>
            <span className="sliderContent">Boot Ubuntu</span>
          </span>
        </button>
      </div>
      <footer className="flex flex-col items-center justify-center w-full py-6 border-t">
        <div className="flex items-center justify-center">
          made with <span className="text-red-500 mx-1">❤</span> by
          <Anchor className="ml-1" href="https://github.com/vivek9patel">
            vivek9patel
          </Anchor>
        </div>
      </footer>
    </>
  );
}

export default Footer;
