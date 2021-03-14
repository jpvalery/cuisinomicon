const SectionTitle = (props) => {
  const textColor = `text-${props.colorFamily}-500`;
  const borderColor = `border-${props.colorFamily}-500`;

  return (
    <div class="relative">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class={`w-full border-b-2 ${borderColor} border-opacity-60`}></div>
      </div>
      <div class="relative flex justify-start">
        <h1 className={`pr-3 text-4xl font-bold bg-eigengrau-600 ${textColor}`}>
          {props.title}
        </h1>
      </div>
    </div>
  );
};

export default SectionTitle;

// colorFamily={props.colorFamily}
// title={props.title}
