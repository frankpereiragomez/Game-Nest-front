import { FeedBackStructure } from "../../../types";
import UserFeedbackStyled from "./UserFeedbackStyled";

interface UserFeedbackProps {
  feedback: FeedBackStructure;
}

const UserFeedback = ({ feedback }: UserFeedbackProps): React.ReactElement => {
  return (
    <UserFeedbackStyled className="feedback-container">
      <article className="modal" aria-label="feedback modal">
        <div className="modal__feedback-type">
          <h2
            className={`modal__title${
              feedback.isError ? " modal__title--error" : ""
            }`}
          >
            {feedback.isError ? "Error" : "Great"}
          </h2>
          {feedback.isError ? (
            <img
              src="images/feedback/close-error.svg"
              alt="error icon"
              width={48}
              height={48}
              loading="lazy"
            />
          ) : (
            <img
              src="images/feedback/close-great.svg"
              alt="great icon"
              width={48}
              height={48}
              loading="lazy"
            />
          )}
        </div>
        <p className="modal__text"> {feedback.message}</p>
      </article>
    </UserFeedbackStyled>
  );
};

export default UserFeedback;