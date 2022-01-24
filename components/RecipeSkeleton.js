export default function RecipeSketon() {
  return (
    <div className="animate-pulse">
      <div className="mb-6 border-b-2 border-gray-500 border-opacity-60 pb-6">
        <div className="mx-auto mb-4 h-8 w-1/4 rounded-sm bg-gray-600"></div>
        <div className="mx-auto h-16 w-3/4 rounded-sm bg-gray-600"></div>
        <div className="mx-auto my-8 h-96 w-full rounded-sm bg-gray-300"></div>
        <div className="mx-auto h-6 w-3/4 rounded-sm bg-gray-600"></div>
      </div>
      <div className="mx-auto grid w-11/12 grid-flow-row gap-4">
        <div className="h-6 rounded-sm bg-gray-600"></div>
        <div className="h-6 rounded-sm bg-gray-600"></div>
        <div className="h-6 rounded-sm bg-gray-600"></div>
        <div className="h-6 rounded-sm bg-gray-600"></div>
        <div className="h-6 rounded-sm bg-gray-600"></div>
        <div className="h-6 w-5/12 rounded-sm bg-gray-600"></div>
      </div>
    </div>
  );
}
