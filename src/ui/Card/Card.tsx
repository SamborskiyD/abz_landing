import EllipsisText from "../EllipsisText/EllipsisText";
import "./Card.scss";

interface CardProps {
  photo: string;
  name: string;
  position: string;
  phone: string;
  email: string;
}

const Card = ({ phone, photo, position, name, email }: CardProps) => {
  return (
    <div className="card">
      <img
        className="photo"
        src={photo || "/images/photo-cover.svg"}
        alt={name}
      />
      <EllipsisText text={name} />

      <div className="info">
        <EllipsisText text={position} />
        <EllipsisText text={email} />
        <EllipsisText text={phone} />
      </div>
    </div>
  );
};

export default Card;
