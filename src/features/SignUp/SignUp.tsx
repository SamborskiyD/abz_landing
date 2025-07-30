import FileInput from "../../ui/FileInput/FileInput";
import Input from "../../ui/Input/Input";
import "../../ui/Link/Link.scss";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";
import "./SignUp.scss";
import useSignUp from "./useSignUp";

const SignUp = ({ reload }: { reload: () => void }) => {
  const {
    positions,
    errors,
    isValid,
    isLoading,
    isSubmitted,
    handleChange,
    handleSubmit,
  } = useSignUp({ reload });

  return (
    <section id="sign-up" className="sign-up">
      {!isLoading && !isSubmitted && (
        <>
          <h2 className="title">Working with POST request</h2>

          <form
            noValidate
            id="sign-up-form"
            className="form"
            onSubmit={handleSubmit}
          >
            <div className="inputs">
              <Input
                type="text"
                label="Your name"
                placeholder="Your name"
                name="name"
                id="name"
                onChange={handleChange}
                error={errors.name}
                required
              />
              <Input
                type="email"
                label="Email"
                placeholder="Email"
                name="email"
                id="email"
                error={errors.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Phone"
                placeholder="Phone"
                type="tel"
                name="phone"
                id="phone"
                error={errors.phone}
                onChange={handleChange}
                helperText="+38 (XXX) XXX - XX - XX"
              />
            </div>

            <div className="position">
              <label className="label">Select your position</label>
              <div className="radio-buttons">
                {positions.map((position) => (
                  <div className="radio-button" key={position.id}>
                    <input
                      className="input"
                      type="radio"
                      name="position_id"
                      id={position.id.toString()}
                      value={position.id}
                      onChange={handleChange}
                    />
                    <label htmlFor={position.id.toString()}>
                      {position.name}
                    </label>
                  </div>
                ))}
              </div>
              {errors.position_id && (
                <p className="error">{errors.position_id}</p>
              )}
            </div>

            <FileInput error={errors.photo} onChange={handleChange} />
          </form>
          <button
            disabled={!isValid}
            form="sign-up-form"
            type="submit"
            className={`button button__big ${!isValid && "button__disabled"}`}
          >
            Sign up
          </button>
        </>
      )}

      {isLoading && !isSubmitted && <LoadingSpinner />}
      {!isLoading && isSubmitted && (
        <>
          <h2 className="title">User successfully registered</h2>
          <img src="/images/success-image.svg" alt="success" />
        </>
      )}
    </section>
  );
};

export default SignUp;
