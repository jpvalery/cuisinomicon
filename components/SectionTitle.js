const SectionTitle = (props) => {
  const textColor = `text-${props.colorFamily}-500`;
  const borderColor = `border-${props.colorFamily}-500`;

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div
          className={`w-full border-b-2 ${borderColor} border-opacity-60`}
        ></div>
      </div>
      <div className="relative flex justify-start">
        <h1 className={`bg-eigengrau-600 pr-3 text-4xl font-bold ${textColor}`}>
          {props.title}
        </h1>
      </div>
    </div>
  );
};

export default SectionTitle;

// colorFamily={props.colorFamily}
// title={props.title}
