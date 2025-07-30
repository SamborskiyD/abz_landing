import Link from "../../ui/Link/Link";
import "./Hero.scss";

const Hero = () => {
  return (
    <section className="hero">
      <img className="image" src="/images/hero-bg.webp" alt="hero background" />
      <div className="content">
        <h1 className="title">Test assignment for front-end developer</h1>
        <p className="description">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <Link href="#sign-up" label="Sign up" />
      </div>
    </section>
  );
};

export default Hero;
