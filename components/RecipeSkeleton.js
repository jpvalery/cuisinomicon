export default function RecipeSketon() {
  return (
    <div className="animate-pulse">
      <div className="pb-6 mb-6 border-b-2 border-gray-500 border-opacity-60">
        <div className="w-1/4 h-8 mx-auto mb-4 bg-gray-600 rounded-sm"></div>
        <div className="w-3/4 h-16 mx-auto bg-gray-600 rounded-sm"></div>
        <div className="w-full mx-auto my-8 bg-gray-300 rounded-sm h-96"></div>
        <div className="w-3/4 h-6 mx-auto bg-gray-600 rounded-sm"></div>
      </div>
      <div className="grid w-11/12 grid-flow-row gap-4 mx-auto">
        <div className="h-6 bg-gray-600 rounded-sm"></div>
        <div className="h-6 bg-gray-600 rounded-sm"></div>
        <div className="h-6 bg-gray-600 rounded-sm"></div>
        <div className="h-6 bg-gray-600 rounded-sm"></div>
        <div className="h-6 bg-gray-600 rounded-sm"></div>
        <div className="w-5/12 h-6 bg-gray-600 rounded-sm"></div>
      </div>
    </div>
  );
}
