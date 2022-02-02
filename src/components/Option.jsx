let Option = ({ question, alpha, selectedOption, setSelectedOption }) => {
  let genImgUrl = (copiedUrl) => {
    copiedUrl = copiedUrl.trim();
    if (copiedUrl) {
      let intermediate = copiedUrl.split("https://drive.google.com/file/d/")[1];
      if (intermediate) {
        let id = intermediate.split("/view")[0];
        return "https://drive.google.com/uc?export=view&id=" + id;
      }
    }
    return "";
  };
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name={"ans" + question._id}
        value={`option${alpha.toUpperCase()}`}
        checked={
          selectedOption === `option${alpha.toUpperCase()}` ? true : false
        }
        onChange={(e) => {
          let userAns = e.currentTarget.value;
          setSelectedOption(userAns);
        }}
        id={question._id + alpha}
      />
      <label className="form-check-label" htmlfor={question._id}>
        {question[`${alpha}Img`] ? (
          <img
            style={{ height: "20vh" }}
            src={genImgUrl(question[`option${alpha.toUpperCase()}`])}
            alt="option"
          />
        ) : (
          question[`option${alpha.toUpperCase()}`]
        )}
      </label>
    </div>
  );
};

export default Option;
